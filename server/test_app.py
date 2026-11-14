import json
from io import BytesIO
from pathlib import Path

import pytest

from app import create_app

LESSON = json.loads((Path(__file__).resolve().parents[1] / "src" / "content" / "lesson.json").read_text(encoding="utf-8"))


@pytest.fixture(autouse=True)
def clear_keys(monkeypatch):
    monkeypatch.delenv("HASAB_API_KEY", raising=False)
    monkeypatch.delenv("HF_TOKEN", raising=False)
    monkeypatch.delenv("LEARNABLE_GLOSS_LOCAL", raising=False)
    monkeypatch.delenv("HF_GLOSS_REMOTE", raising=False)


@pytest.fixture
def client():
    return create_app().test_client()


def test_health_hides_secrets(client):
    body = client.get("/api/health").get_json()
    assert body["hasab"] is False
    assert body["huggingface"] is False
    assert body["asrModel"] == "waxal-benchmarking/whisper-small-waxal-amh"
    dumped = json.dumps(body).lower()
    assert "bearer" not in dumped
    assert "hf_" not in dumped


def test_known_sentence_uses_the_sample_caption(client):
    segment = LESSON["segments"][0]
    response = client.post("/api/translate", json={"text": segment["en"], "source": "en", "target": "am"})
    body = response.get_json()
    assert response.status_code == 200
    assert body["source"] == "sample"
    assert body["translation"] == segment["am"]


def test_unknown_sentence_is_not_invented(client):
    response = client.post("/api/translate", json={"text": "xyzzy plugh", "source": "en", "target": "am"})
    body = response.get_json()
    assert body["source"] == "unavailable"
    assert body["translation"] is None


def test_upload_without_a_key_is_not_transcribed(client):
    response = client.post(
        "/api/transcribe",
        data={"audio": (BytesIO(b"not-audio"), "clip.wav")},
        content_type="multipart/form-data",
    )
    body = response.get_json()
    assert body["source"] == "unavailable"
    assert body["text"] is None


def test_provider_calls_need_consent(client, monkeypatch):
    monkeypatch.setenv("HASAB_API_KEY", "test-key")
    monkeypatch.setenv("HF_TOKEN", "test-token")

    def refuse(*_args, **_kwargs):
        raise AssertionError("provider was called")

    monkeypatch.setattr("app.requests.post", refuse)
    response = client.post("/api/translate", json={"text": "xyzzy plugh", "source": "en", "target": "am"})
    assert response.status_code == 200
    assert response.get_json()["source"] == "unavailable"
    audio = client.post(
        "/api/transcribe",
        data={"audio": (BytesIO(b"not-audio"), "clip.wav")},
        content_type="multipart/form-data",
    )
    assert audio.status_code == 403
    picture = client.post(
        "/api/describe-image",
        data={"image": (BytesIO(b"not-image"), "clip.jpg")},
        content_type="multipart/form-data",
    )
    assert picture.status_code == 403
    speech = client.post("/api/speak", json={"text": "hello", "language": "en"})
    assert speech.status_code == 403


def test_published_badge_verifies(client):
    badge = json.loads((Path(__file__).resolve().parents[1] / "src" / "content" / "open-badge.json").read_text(encoding="utf-8"))
    response = client.post("/api/certificates/verify", json={"credential": {"jwt": badge["jwt"]}})
    body = response.get_json()
    assert body["valid"] is True
    assert body["learner"] == "Hana Bekele"
    tampered = badge["jwt"][:-4] + "AAAA"
    rejected = client.post("/api/certificates/verify", json={"credential": {"jwt": tampered}})
    assert rejected.get_json()["valid"] is False


def test_tagged_pdf_embeds_amharic_and_alt_text():
    from pypdf import PdfReader
    from tagged_pdf import build_lesson_pdf

    payload = build_lesson_pdf()
    assert b"/StructTreeRoot" in payload
    assert b"/ToUnicode" in payload
    assert b"A navy phone on a paper background" in payload
    text = PdfReader(BytesIO(payload)).pages[0].extract_text()
    assert "ሃና" in text
    assert "Hana opens her lesson" in text


def test_openapi_lists_the_pipeline(client):
    spec = client.get("/api/openapi.yaml").get_data(as_text=True)
    assert "/api/translate" in spec
    assert "/api/gloss" in spec
    assert "/api/transcribe" in spec
    assert "/api/describe-image" in spec
    assert "/api/certificates/verify" in spec
    page = client.get("/api/docs")
    assert page.status_code == 200
    assert b"LearnAble API" in page.data


def test_lesson_gloss_is_precomputed_without_calling_a_provider(client, monkeypatch):
    def refuse(*_args, **_kwargs):
        raise AssertionError("provider was called")

    monkeypatch.setattr("app.requests.post", refuse)
    monkeypatch.setattr("app.run_local_gloss", refuse)
    cue = LESSON["segments"][0]
    response = client.post("/api/gloss", json={"text": cue["en"], "language": "en"})
    body = response.get_json()
    assert response.status_code == 200
    assert body["source"] == "precomputed"
    assert body["precomputed"] is True
    assert body["model"] == "Suyash2205/signbridge-t5-base-asl-gloss"
    assert body["gloss"] == cue["gloss"]
    assert "ADDUS ABRAHAM" in body["gloss"]


def test_amharic_is_not_glossed(client):
    segment = LESSON["segments"][0]
    body = client.post("/api/gloss", json={"text": segment["am"], "language": "am"}).get_json()
    assert body["gloss"] is None
    assert body["source"] == "unavailable"
    assert "Amharic" in body["message"]


def test_unknown_gloss_stays_unavailable_until_opt_in(client, monkeypatch):
    monkeypatch.setattr("app.run_local_gloss", lambda _text: (_ for _ in ()).throw(AssertionError("model loaded")))
    body = client.post("/api/gloss", json={"text": "xyzzy plugh"}).get_json()
    assert body["source"] == "unavailable"
    assert body["gloss"] is None
    monkeypatch.setenv("LEARNABLE_GLOSS_LOCAL", "1")
    monkeypatch.setattr("app.run_local_gloss", lambda text: f"MOCK {text.split()[0].upper()}")
    local = client.post("/api/gloss", json={"text": "xyzzy plugh"}).get_json()
    assert local["source"] == "model"
    assert local["precomputed"] is False
    assert local["gloss"] == "MOCK XYZZY"


def test_remote_gloss_needs_consent(client, monkeypatch):
    monkeypatch.setenv("HF_GLOSS_REMOTE", "1")
    monkeypatch.setenv("HF_TOKEN", "test-token")

    def refuse(*_args, **_kwargs):
        raise AssertionError("provider was called")

    monkeypatch.setattr("app.hf_post", refuse)
    blocked = client.post("/api/gloss", json={"text": "xyzzy plugh"}).get_json()
    assert blocked["source"] == "unavailable"
    assert "not called" in blocked["message"]

    def fake_post(model, json_body=None, **_kwargs):
        assert model == "Suyash2205/signbridge-t5-base-asl-gloss"
        assert json_body["inputs"].startswith("translate English to ASL gloss: ")
        return [{"generated_text": "HELLO WORLD"}]

    monkeypatch.setattr("app.hf_post", fake_post)
    allowed = client.post("/api/gloss", json={"text": "xyzzy plugh"}, headers={"X-LearnAble-Consent": "yes"}).get_json()
    assert allowed["source"] == "huggingface"
    assert allowed["gloss"] == "HELLO WORLD"
    assert allowed["precomputed"] is False


def test_missing_upload_returns_the_demo_transcript(client):
    body = client.post("/api/transcribe").get_json()
    assert body["source"] == "sample"
    assert "Addis Ababa" in body["text"]

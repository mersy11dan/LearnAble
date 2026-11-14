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


def test_openapi_lists_the_pipeline(client):
    spec = client.get("/api/openapi.yaml").get_data(as_text=True)
    assert "/api/translate" in spec
    assert "/api/transcribe" in spec
    assert "/api/describe-image" in spec
    assert "/api/certificates/verify" in spec
    page = client.get("/api/docs")
    assert page.status_code == 200
    assert b"LearnAble API" in page.data


def test_missing_upload_returns_the_demo_transcript(client):
    body = client.post("/api/transcribe").get_json()
    assert body["source"] == "sample"
    assert "Addis Ababa" in body["text"]

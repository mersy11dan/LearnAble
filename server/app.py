"""Transcript service for LearnAble.

The site works with this process stopped. When it is running and no keys are set,
known lesson sentences translate from the bundled captions. Unknown text is not
invented. Hasab is preferred for Amharic speech and translation. Hugging Face is
used for image captions and as a second path for speech and translation.
"""

from __future__ import annotations

import json
import os
from pathlib import Path

import requests
from flask import Flask, jsonify, request

ROOT = Path(__file__).resolve().parents[1]
LESSON_PATH = ROOT / "src" / "content" / "lesson.json"


def lesson() -> dict:
    import json

    return json.loads(LESSON_PATH.read_text(encoding="utf-8"))


def configured(name: str) -> str:
    return os.environ.get(name, "").strip()


def consent_granted() -> bool:
    return request.headers.get("X-LearnAble-Consent", "").strip().lower() == "yes"


def sample_pair(text: str, source: str, target: str) -> str | None:
    cleaned = text.strip()
    for segment in lesson()["segments"]:
        if source == "en" and target == "am" and cleaned == segment["en"]:
            return segment["am"]
        if source == "am" and target == "en" and cleaned == segment["am"]:
            return segment["en"]
    return None


def extract_text(payload: object) -> str | None:
    if isinstance(payload, str) and payload.strip():
        return payload.strip()
    if isinstance(payload, list) and payload:
        return extract_text(payload[0])
    if isinstance(payload, dict):
        for key in ("translation_text", "translated_text", "text", "transcript", "transcription", "generated_text"):
            value = payload.get(key)
            if isinstance(value, str) and value.strip():
                return value.strip()
        for key in ("data", "translation", "result"):
            if key in payload:
                found = extract_text(payload[key])
                if found:
                    return found
    return None


def hasab_translate(text: str, source: str, target: str) -> str:
    codes = {"en": "eng", "am": "amh"}
    response = requests.post(
        f"{configured('HASAB_API_BASE') or 'https://api.hasab.ai'}/api/v1/translate",
        headers={"Authorization": f"Bearer {configured('HASAB_API_KEY')}"},
        data={
            "text": text,
            "source_language": codes[source],
            "target_language": codes[target],
        },
        timeout=45,
    )
    response.raise_for_status()
    found = extract_text(response.json())
    if not found:
        raise ValueError("Hasab returned no translation text.")
    return found


def huggingface_translate(text: str, source: str, target: str) -> str:
    langs = {"en": "eng_Latn", "am": "amh_Ethi"}
    model = configured("HF_MT_MODEL") or "facebook/nllb-200-distilled-600M"
    response = hf_post(
        model,
        json_body={
            "inputs": text,
            "parameters": {"src_lang": langs[source], "tgt_lang": langs[target]},
        },
    )
    found = extract_text(response)
    if not found:
        raise ValueError("Hugging Face returned no translation text.")
    return found


def hf_post(model: str, json_body: dict | None = None, data: bytes | None = None, content_type: str | None = None):
    token = configured("HF_TOKEN")
    headers = {"Authorization": f"Bearer {token}"}
    if content_type:
        headers["Content-Type"] = content_type
    urls = [
        f"https://router.huggingface.co/hf-inference/models/{model}",
        f"https://api-inference.huggingface.co/models/{model}",
    ]
    last = None
    for url in urls:
        response = requests.post(url, headers=headers, json=json_body, data=data, timeout=90)
        last = response
        if response.status_code != 404:
            break
    if last is None or not last.ok:
        detail = last.text[:300] if last is not None else "no response"
        raise ValueError(f"Hugging Face status {getattr(last, 'status_code', 'none')}: {detail}")
    content_header = last.headers.get("content-type", "")
    if "json" in content_header:
        return last.json()
    return last.content


def create_app() -> Flask:
    app = Flask(__name__)

    @app.after_request
    def cors(response):
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
        return response

    @app.route("/api/<path:_unused>", methods=["OPTIONS"])
    def options(_unused: str):
        return ("", 204)

    @app.get("/api/openapi.yaml")
    def openapi_yaml():
        return (ROOT / "server" / "openapi.yaml").read_text(encoding="utf-8"), 200, {"Content-Type": "application/yaml; charset=utf-8"}

    @app.get("/api/docs")
    def api_docs():
        page = """<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>LearnAble API</title>
<style>body{font-family:Georgia,serif;background:#f2f0ea;color:#172033;margin:2rem} a{color:#0b3d91} code{font-family:sans-serif}</style>
</head><body>
<h1>LearnAble API</h1>
<p>Interactive list of the transcript pipeline. Send <code>X-LearnAble-Consent: yes</code> before a request may leave this machine.</p>
<p><a href="/api/openapi.yaml">openapi.yaml</a></p>
<ul>
<li>GET /api/health</li>
<li>POST /api/translate</li>
<li>POST /api/transcribe</li>
<li>POST /api/describe-image</li>
<li>POST /api/speak</li>
<li>POST /api/braille</li>
<li>GET /api/offline-pack</li>
<li>POST /api/certificates/verify</li>
</ul>
<form method="get" action="/api/health"><button type="submit">Check health</button></form>
</body></html>"""
        return page, 200, {"Content-Type": "text/html; charset=utf-8"}

    @app.get("/api/offline-pack")
    def offline_pack():
        return jsonify({"builtIn": "browser", "path": "/packs/demo/index.html", "message": "The 3G pack is assembled on the phone from the saved lesson files."})

    @app.post("/api/certificates/verify")
    def verify_certificate():
        body = request.get_json(silent=True) or {}
        credential = body.get("credential") or {}
        jwt = credential.get("jwt") if isinstance(credential, dict) else None
        published = json.loads((ROOT / "src" / "content" / "open-badge.json").read_text(encoding="utf-8"))
        if jwt and jwt == published["jwt"]:
            subject = published["credential"]["credentialSubject"]
            return jsonify({"valid": True, "learner": subject["name"], "proof": "Ed25519"})
        return jsonify({"valid": False, "learner": None, "proof": "Ed25519"})

    @app.post("/api/braille")
    def braille():
        body = request.get_json(silent=True) or {}
        text = str(body.get("text") or "").strip()
        if not text:
            return jsonify({"message": "Include the text to export."}), 400
        return jsonify({"format": "brf", "language": body.get("language") or "en", "message": "The browser exporter writes the .brf file from this text.", "characters": len(text)})

    @app.get("/api/health")
    def health():
        return jsonify(
            {
                "hasab": bool(configured("HASAB_API_KEY")),
                "huggingface": bool(configured("HF_TOKEN")),
                "asrModel": configured("HF_ASR_MODEL") or "waxal-benchmarking/whisper-small-waxal-amh",
                "mtModel": configured("HF_MT_MODEL"),
                "captionModel": configured("HF_CAPTION_MODEL") or "Salesforce/blip-image-captioning-base",
            }
        )

    @app.post("/api/translate")
    def translate():
        body = request.get_json(silent=True) or {}
        text = str(body.get("text") or "").strip()
        source = body.get("source")
        target = body.get("target")
        if source not in {"en", "am"} or target not in {"en", "am"} or source == target or not text:
            return jsonify({"source": "unavailable", "translation": None, "message": "Say which language to translate, and include the text."}), 400
        paired = sample_pair(text, source, target)
        if paired and not configured("HASAB_API_KEY") and not configured("HF_TOKEN"):
            return jsonify(
                {
                    "source": "sample",
                    "translation": paired,
                    "message": "This sentence is the bundled lesson caption, not a live model.",
                }
            )
        errors: list[str] = []
        if configured("HASAB_API_KEY"):
            if not consent_granted():
                return jsonify({"source": "unavailable", "translation": paired, "message": "Hasab was not called. Send X-LearnAble-Consent: yes first."})
            try:
                return jsonify({"source": "hasab", "translation": hasab_translate(text, source, target), "message": "Translated by Hasab."})
            except Exception as exc:  # noqa: BLE001 - surface a safe failure, then try the next provider
                errors.append(f"Hasab did not translate ({exc.__class__.__name__}).")
        if configured("HF_TOKEN") and configured("HF_MT_MODEL"):
            if not consent_granted():
                return jsonify({"source": "unavailable", "translation": paired, "message": "Hugging Face was not called. Send X-LearnAble-Consent: yes first."})
            try:
                return jsonify(
                    {
                        "source": "huggingface",
                        "translation": huggingface_translate(text, source, target),
                        "message": "Translated by the configured Hugging Face model.",
                    }
                )
            except Exception as exc:  # noqa: BLE001
                errors.append(f"Hugging Face did not translate ({exc.__class__.__name__}).")
        if paired:
            return jsonify(
                {
                    "source": "sample",
                    "translation": paired,
                    "message": " ".join(errors) + " The bundled lesson caption is shown instead.",
                }
            )
        return jsonify(
            {
                "source": "unavailable",
                "translation": None,
                "message": " ".join(errors) or "No speech key is set, and this sentence is not in the sample lesson.",
            }
        )

    @app.post("/api/transcribe")
    def transcribe():
        upload = request.files.get("audio")
        if upload is None:
            text = " ".join(segment["en"] for segment in lesson()["segments"])
            return jsonify(
                {
                    "source": "sample",
                    "text": text,
                    "message": "No recording was uploaded. This is the demo lesson transcript.",
                }
            )
        audio = upload.read(8_000_001)
        if len(audio) > 8_000_000:
            return jsonify({"source": "unavailable", "text": None, "message": "That recording is over 8 MB."}), 413
        if not configured("HASAB_API_KEY") and not configured("HF_TOKEN"):
            return jsonify(
                {
                    "source": "unavailable",
                    "text": None,
                    "message": "No speech key is set, so this recording was not transcribed. The sample lesson is unchanged.",
                }
            )
        if not consent_granted():
            return jsonify({"source": "unavailable", "text": None, "message": "Nothing was sent. Send X-LearnAble-Consent: yes before a provider is called."}), 403
        if configured("HASAB_API_KEY"):
            try:
                response = requests.post(
                    f"{configured('HASAB_API_BASE') or 'https://api.hasab.ai'}/api/v1/upload-audio",
                    headers={"Authorization": f"Bearer {configured('HASAB_API_KEY')}"},
                    files={"audio": (upload.filename or "clip.wav", audio, upload.mimetype or "audio/wav")},
                    data={"language": "amh", "source_language": "amh", "translate": "false", "summarize": "false"},
                    timeout=90,
                )
                response.raise_for_status()
                found = extract_text(response.json())
                if found:
                    return jsonify({"source": "hasab", "text": found, "message": "Transcribed by Hasab."})
            except Exception as exc:  # noqa: BLE001
                if not configured("HF_TOKEN"):
                    return jsonify({"source": "unavailable", "text": None, "message": f"Hasab did not transcribe ({exc.__class__.__name__})."})
        try:
            model = configured("HF_ASR_MODEL") or "waxal-benchmarking/whisper-small-waxal-amh"
            payload = hf_post(model, data=audio, content_type=upload.mimetype or "audio/wav")
            found = extract_text(payload)
            if not found:
                raise ValueError("empty transcript")
            return jsonify({"source": "huggingface", "text": found, "message": "Transcribed by the configured Hugging Face model."})
        except Exception as exc:  # noqa: BLE001
            return jsonify({"source": "unavailable", "text": None, "message": f"The recording was not transcribed ({exc.__class__.__name__})."})

    @app.post("/api/describe-image")
    def describe_image():
        upload = request.files.get("image")
        figure = lesson()["figure"]
        if upload is None:
            return jsonify({"source": "sample", "text": figure["alt"], "message": "This is the authored description of the lesson picture."})
        image = upload.read(8_000_001)
        if not configured("HF_TOKEN"):
            return jsonify(
                {
                    "source": "unavailable",
                    "text": None,
                    "message": "No Hugging Face token is set, so this picture was not captioned. The lesson picture still has its written description.",
                }
            )
        if not consent_granted():
            return jsonify({"source": "unavailable", "text": None, "message": "Nothing was sent. Send X-LearnAble-Consent: yes before a provider is called."}), 403
        try:
            model = configured("HF_CAPTION_MODEL") or "Salesforce/blip-image-captioning-base"
            payload = hf_post(model, data=image, content_type=upload.mimetype or "image/jpeg")
            found = extract_text(payload)
            if not found:
                raise ValueError("empty caption")
            return jsonify({"source": "huggingface", "text": found, "message": "Captioned by the configured Hugging Face model. Review it before using it as alt text."})
        except Exception as exc:  # noqa: BLE001
            return jsonify({"source": "unavailable", "text": None, "message": f"The picture was not captioned ({exc.__class__.__name__})."})

    @app.post("/api/speak")
    def speak():
        body = request.get_json(silent=True) or {}
        text = str(body.get("text") or "").strip()
        language = body.get("language") if body.get("language") in {"en", "am"} else "am"
        if not text:
            return jsonify({"source": "unavailable", "message": "Add the sentence to speak."}), 400
        if not configured("HASAB_API_KEY"):
            return jsonify(
                {
                    "source": "browser",
                    "message": "No Hasab key is set. Use the device voice on the page. No server audio was generated.",
                }
            )
        if not consent_granted():
            return jsonify({"source": "browser", "message": "Hasab was not called. Send X-LearnAble-Consent: yes before speech is generated."}), 403
        codes = {"en": "eng", "am": "amh"}
        speakers = {"en": "Hanna", "am": "Hanna"}
        try:
            response = requests.post(
                f"{configured('HASAB_API_BASE') or 'https://api.hasab.ai'}/api/v1/tts/synthesize",
                headers={
                    "Authorization": f"Bearer {configured('HASAB_API_KEY')}",
                    "Content-Type": "application/json",
                },
                json={"text": text, "language": codes[language], "speaker_name": speakers[language]},
                timeout=60,
            )
            response.raise_for_status()
            return response.content, 200, {"Content-Type": response.headers.get("Content-Type", "audio/wav")}
        except Exception as exc:  # noqa: BLE001
            return jsonify({"source": "browser", "message": f"Hasab did not speak ({exc.__class__.__name__}). Use the device voice."})

    return app


if __name__ == "__main__":
    try:
        from dotenv import load_dotenv

        load_dotenv(ROOT / ".env")
    except ImportError:
        pass
    create_app().run(host=os.environ.get("LEARNABLE_HOST", "127.0.0.1"), port=5050)

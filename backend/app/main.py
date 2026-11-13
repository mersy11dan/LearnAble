from __future__ import annotations

import hashlib
import json
import sqlite3
import time
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, PlainTextResponse
from fastapi.staticfiles import StaticFiles

from .braille import to_brf, to_unicode_braille
from .seed import COURSES, DOCUMENTS, ETHSL, EVENTS, JOBS, LESSONS
from .vision import describe_image_bytes

ROOT = Path(__file__).resolve().parent.parent
DB_PATH = ROOT / "learnable.db"
STATIC = ROOT / "static"
GENERATED = ROOT / "generated"
GENERATED.mkdir(exist_ok=True)
STATIC.mkdir(exist_ok=True)


def utcnow() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def db() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    conn = db()
    conn.executescript(
        """
        CREATE TABLE IF NOT EXISTS learners (
            id TEXT PRIMARY KEY,
            name TEXT,
            language TEXT DEFAULT 'en',
            access_profile TEXT,
            last_seen TEXT,
            created_at TEXT
        );
        CREATE TABLE IF NOT EXISTS attendance (
            id TEXT PRIMARY KEY,
            learner_id TEXT,
            lesson_id TEXT,
            status TEXT,
            note TEXT,
            at TEXT
        );
        CREATE TABLE IF NOT EXISTS progress (
            learner_id TEXT,
            lesson_id TEXT,
            seconds REAL,
            completed INTEGER,
            updated_at TEXT,
            PRIMARY KEY (learner_id, lesson_id)
        );
        CREATE TABLE IF NOT EXISTS sync_queue (
            id TEXT PRIMARY KEY,
            learner_id TEXT,
            payload TEXT,
            created_at TEXT
        );
        CREATE TABLE IF NOT EXISTS certificates (
            id TEXT PRIMARY KEY,
            learner_id TEXT,
            course_id TEXT,
            issued_at TEXT
        );
        """
    )
    if not conn.execute("SELECT 1 FROM learners LIMIT 1").fetchone():
        conn.execute(
            "INSERT INTO learners VALUES (?,?,?,?,?,?)",
            (
                "hirut-01",
                "Hirut Bekele",
                "am",
                "screen-reader,captions,ethsl",
                utcnow(),
                utcnow(),
            ),
        )
    conn.commit()
    conn.close()


app = FastAPI(title="LearnAble", version="0.1.0", description="Offline-first accessible learning for Ethiopia")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
init_db()


@app.get("/api/health")
def health() -> dict[str, Any]:
    return {"ok": True, "service": "learnable", "time": utcnow(), "offline_capable": True}


@app.get("/api/courses")
def courses() -> dict[str, Any]:
    return {"courses": COURSES}


@app.get("/api/courses/{course_id}")
def course_detail(course_id: str) -> dict[str, Any]:
    course = next((c for c in COURSES if c["id"] == course_id), None)
    if not course:
        raise HTTPException(404, "Course not found")
    lesson = LESSONS.get(course_id)
    return {"course": course, "lesson": lesson}


def _vtt(cues: list[tuple[float, float, str]]) -> str:
    def ts(sec: float) -> str:
        h = int(sec // 3600)
        m = int((sec % 3600) // 60)
        s = sec % 60
        return f"{h:02d}:{m:02d}:{s:06.3f}"

    lines = ["WEBVTT", ""]
    for i, (a, b, text) in enumerate(cues, 1):
        lines.append(str(i))
        lines.append(f"{ts(a)} --> {ts(b)}")
        lines.append(text)
        lines.append("")
    return "\n".join(lines)


@app.get("/api/lessons/{course_id}/captions/{lang}.vtt", response_class=PlainTextResponse)
def captions(course_id: str, lang: str) -> str:
    lesson = LESSONS.get(course_id)
    if not lesson:
        raise HTTPException(404, "Lesson not found")
    key = "transcript_am" if lang.startswith("am") else "transcript_en"
    return _vtt(lesson[key])


@app.get("/api/lessons/{course_id}/descriptions.vtt", response_class=PlainTextResponse)
def descriptions(course_id: str) -> str:
    lesson = LESSONS.get(course_id)
    if not lesson:
        raise HTTPException(404, "Lesson not found")
    return _vtt(lesson["audio_description_en"])


@app.get("/api/lessons/{course_id}/transcript")
def transcript(course_id: str) -> dict[str, Any]:
    lesson = LESSONS.get(course_id)
    if not lesson:
        raise HTTPException(404, "Lesson not found")
    return lesson


@app.get("/api/ethsl")
def ethsl() -> dict[str, Any]:
    return {
        "signs": ETHSL,
        "note_en": "Signs vary by community. Verify with a Deaf teacher. CESL dataset (Bahir Dar, 1320 videos) is a research source, not bundled.",
        "note_am": "ምልክቶች በማህበረሰብ ይለያያሉ። ከደፍ መምህር ጋር ያረጋግጡ።",
        "research": [
            {"name": "CESL", "url": "https://ethio-artifical.github.io/"},
            {"name": "EthSL Tutor", "url": "https://abiti23.github.io/ethsl-tutor/"},
        ],
    }


@app.get("/api/jobs")
def jobs() -> dict[str, Any]:
    return {"jobs": JOBS}


@app.get("/api/documents")
def documents() -> dict[str, Any]:
    return {"documents": DOCUMENTS}


@app.get("/api/events")
def events() -> dict[str, Any]:
    return {"events": EVENTS}


@app.post("/api/attendance")
def mark_attendance(payload: dict[str, Any]) -> dict[str, Any]:
    learner_id = payload.get("learner_id", "hirut-01")
    lesson_id = payload.get("lesson_id", "cs-1")
    status = payload.get("status", "present")
    note = payload.get("note", "")
    conn = db()
    conn.execute(
        "INSERT INTO attendance VALUES (?,?,?,?,?,?)",
        (str(uuid.uuid4()), learner_id, lesson_id, status, note, utcnow()),
    )
    conn.execute("UPDATE learners SET last_seen=? WHERE id=?", (utcnow(), learner_id))
    conn.commit()
    conn.close()
    return {"ok": True, "at": utcnow(), "status": status}


@app.get("/api/consistency/{learner_id}")
def consistency(learner_id: str) -> dict[str, Any]:
    """Python consistency checker: are they still coming to class?"""
    conn = db()
    row = conn.execute("SELECT * FROM learners WHERE id=?", (learner_id,)).fetchone()
    if not row:
        conn.close()
        raise HTTPException(404, "Learner not found")
    last = datetime.fromisoformat(row["last_seen"])
    hours = (datetime.now(timezone.utc) - last).total_seconds() / 3600
    recent = conn.execute(
        "SELECT * FROM attendance WHERE learner_id=? ORDER BY at DESC LIMIT 8",
        (learner_id,),
    ).fetchall()
    conn.close()
    present = sum(1 for r in recent if r["status"] == "present")
    if hours > 36:
        tone = "missed"
        en = f"Hirut, we have not seen you for {int(hours)} hours. Tuesday signing class is still saved on your phone."
        am = "ሂሩት፣ ለብዙ ሰዓታት አላየንህም። የማክሰኞ ትምህርት በስልክህ ተቀምጧል።"
        action = "Play the downloaded lesson, then tap I am here."
    elif hours > 12:
        tone = "nudge"
        en = "A short reminder: 12 minutes left in Computer science, spoken slowly."
        am = "አጭር ማስታወሻ፦ 12 ደቂቃ ትምህርት ይቀራል።"
        action = "Open the lesson"
    else:
        tone = "ok"
        en = "You are present. Keep going when you have a quiet ten minutes."
        am = "መጥተሃል። በተረጋጋ አስር ደቂቃ ቀጥል።"
        action = None
    return {
        "learner": dict(row),
        "hours_since_seen": round(hours, 1),
        "recent_present": present,
        "tone": tone,
        "message_en": en,
        "message_am": am,
        "action": action,
        "history": [dict(r) for r in recent],
    }


@app.post("/api/progress")
def save_progress(payload: dict[str, Any]) -> dict[str, Any]:
    learner_id = payload.get("learner_id", "hirut-01")
    lesson_id = payload.get("lesson_id", "cs-1")
    seconds = float(payload.get("seconds", 0))
    completed = 1 if payload.get("completed") else 0
    conn = db()
    conn.execute(
        """INSERT INTO progress VALUES (?,?,?,?,?)
           ON CONFLICT(learner_id, lesson_id) DO UPDATE SET
           seconds=excluded.seconds, completed=excluded.completed, updated_at=excluded.updated_at""",
        (learner_id, lesson_id, seconds, completed, utcnow()),
    )
    conn.commit()
    conn.close()
    return {"ok": True}


@app.post("/api/sync")
def sync_offline(payload: dict[str, Any]) -> dict[str, Any]:
    events = payload.get("events", [])
    learner_id = payload.get("learner_id", "hirut-01")
    conn = db()
    accepted = 0
    for ev in events:
        conn.execute(
            "INSERT INTO sync_queue VALUES (?,?,?,?)",
            (str(uuid.uuid4()), learner_id, json.dumps(ev), utcnow()),
        )
        if ev.get("type") == "attendance":
            conn.execute(
                "INSERT INTO attendance VALUES (?,?,?,?,?,?)",
                (
                    str(uuid.uuid4()),
                    learner_id,
                    ev.get("lesson_id", "cs-1"),
                    ev.get("status", "present"),
                    "offline-sync",
                    ev.get("at", utcnow()),
                ),
            )
        accepted += 1
    conn.commit()
    conn.close()
    return {"ok": True, "accepted": accepted}


@app.post("/api/vision/describe")
async def vision_describe(file: UploadFile = File(...), hint: str = Form(None)) -> dict[str, Any]:
    data = await file.read()
    if len(data) > 4_000_000:
        raise HTTPException(400, "Image too large for a 3G pack. Use a smaller photo.")
    result = describe_image_bytes(data, hint)
    result["bytes"] = len(data)
    return result


@app.get("/api/braille/{course_id}")
def braille_export(course_id: str) -> dict[str, Any]:
    lesson = LESSONS.get(course_id)
    if not lesson:
        raise HTTPException(404, "Lesson not found")
    text = " ".join(t for _, _, t in lesson["transcript_en"])
    brf = to_brf(text)
    path = GENERATED / f"{course_id}.brf"
    path.write_text(brf, encoding="utf-8")
    return {
        "unicode": to_unicode_braille(text[:280]),
        "brf_preview": brf[:400],
        "download": f"/api/braille/{course_id}.brf",
    }


@app.get("/api/braille/{course_id}.brf")
def braille_file(course_id: str) -> FileResponse:
    path = GENERATED / f"{course_id}.brf"
    if not path.exists():
        braille_export(course_id)
    return FileResponse(path, media_type="text/plain", filename=f"{course_id}.brf")


@app.post("/api/certificates")
def issue_certificate(payload: dict[str, Any]) -> dict[str, Any]:
    learner_id = payload.get("learner_id", "hirut-01")
    course_id = payload.get("course_id", "cs-foundations")
    cert_id = hashlib.sha256(f"{learner_id}:{course_id}:{int(time.time())}".encode()).hexdigest()[:12]
    conn = db()
    conn.execute(
        "INSERT INTO certificates VALUES (?,?,?,?)",
        (cert_id, learner_id, course_id, utcnow()),
    )
    conn.commit()
    conn.close()
    return {
        "id": cert_id,
        "verify_url": f"/api/certificates/{cert_id}",
        "share_text": f"LearnAble certificate {cert_id} — Computer science, spoken slowly",
    }


@app.get("/api/certificates/{cert_id}")
def verify_certificate(cert_id: str) -> dict[str, Any]:
    conn = db()
    row = conn.execute("SELECT * FROM certificates WHERE id=?", (cert_id,)).fetchone()
    conn.close()
    if not row:
        return {"valid": False}
    return {"valid": True, "certificate": dict(row)}


@app.get("/api/offline-pack/{course_id}")
def offline_pack(course_id: str) -> dict[str, Any]:
    course = next((c for c in COURSES if c["id"] == course_id), None)
    lesson = LESSONS.get(course_id)
    if not course or not lesson:
        raise HTTPException(404, "No pack")
    return {
        "kind": "3g-light",
        "includes": ["audio-script", "captions-en", "captions-am", "transcript", "html-diagram", "ethsl-window-cues"],
        "bytes_estimate": int(course["offline_mb"] * 1000_000),
        "course": course,
        "lesson": lesson,
        "html": (
            f"<article lang='en'><h1>{course['title_en']}</h1>"
            f"<p>{course['blurb_en']}</p><ol>"
            + "".join(f"<li>{t}</li>" for _, _, t in lesson["transcript_en"])
            + "</ol></article>"
        ),
    }


app.mount("/static", StaticFiles(directory=STATIC), name="static")

"""Open Badges 3.0 credentials signed as VC-JWT with Ed25519.

The private key is created on first use under the server data directory, or read
from LEARNABLE_SIGNING_KEY. It is never written into the repository.
"""

from __future__ import annotations

import base64
import json
import os
import sqlite3
import uuid
from datetime import datetime, timezone
from pathlib import Path

from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey, Ed25519PublicKey

ROOT = Path(__file__).resolve().parents[1]
OB_CONTEXT = "https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json"
VC_CONTEXT = "https://www.w3.org/ns/credentials/v2"

COURSES = {
    "slow-connection": {
        "name": "Accessible media, demo lesson",
        "description": "Completed the LearnAble demo lesson on captions, sign, audio description, and the offline pack. This is a demo credential.",
    },
    "accessible-media-demo": {
        "name": "Accessible media, demo lesson",
        "description": "Completed the LearnAble demo lesson on captions, sign, audio description, and the offline pack. This is a demo credential.",
    },
}


def data_dir() -> Path:
    configured = os.environ.get("LEARNABLE_DATA_DIR", "").strip()
    return Path(configured) if configured else Path(__file__).resolve().parent / "data"


def public_base() -> str:
    configured = os.environ.get("LEARNABLE_PUBLIC_BASE", "").strip() or "http://127.0.0.1:5050"
    return configured.rstrip("/")


def b64url(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode("ascii")


def b64url_decode(value: str) -> bytes:
    padding = "=" * ((4 - len(value) % 4) % 4)
    return base64.urlsafe_b64decode(value + padding)


def key_path() -> Path:
    configured = os.environ.get("LEARNABLE_SIGNING_KEY", "").strip()
    return Path(configured) if configured else data_dir() / "issuer-ed25519.pem"


def load_private_key() -> Ed25519PrivateKey:
    path = key_path()
    if path.exists():
        return serialization.load_pem_private_key(path.read_bytes(), password=None)
    path.parent.mkdir(parents=True, exist_ok=True)
    key = Ed25519PrivateKey.generate()
    pem = key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption(),
    )
    path.write_bytes(pem)
    try:
        path.chmod(0o600)
    except OSError:
        pass
    return key


def public_jwk(public: Ed25519PublicKey | None = None) -> dict:
    key = public or load_private_key().public_key()
    raw = key.public_bytes(serialization.Encoding.Raw, serialization.PublicFormat.Raw)
    return {"kty": "OKP", "crv": "Ed25519", "alg": "EdDSA", "x": b64url(raw), "kid": "learnable-issuer"}


def sign_jwt(payload: dict) -> str:
    header = {"alg": "EdDSA", "typ": "vc+jwt", "kid": "learnable-issuer"}
    signing_input = f"{b64url(json.dumps(header, separators=(',', ':')).encode())}.{b64url(json.dumps(payload, separators=(',', ':'), ensure_ascii=False).encode())}"
    signature = load_private_key().sign(signing_input.encode())
    return f"{signing_input}.{b64url(signature)}"


def connect() -> sqlite3.Connection:
    folder = data_dir()
    folder.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(folder / "credentials.db")
    connection.row_factory = sqlite3.Row
    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS credentials (
          id TEXT PRIMARY KEY,
          course_id TEXT NOT NULL,
          jwt TEXT NOT NULL,
          payload TEXT NOT NULL,
          issued_at TEXT NOT NULL,
          revoked INTEGER NOT NULL DEFAULT 0
        )
        """
    )
    connection.commit()
    return connection


def issuer_profile() -> dict:
    base = public_base()
    issuer_id = f"{base}/api/issuer"
    jwk = public_jwk()
    return {
        "@context": [VC_CONTEXT, OB_CONTEXT],
        "id": issuer_id,
        "type": ["Profile"],
        "name": "LearnAble",
        "url": base,
        "publicKey": {"id": f"{issuer_id}#key", "type": "JsonWebKey", **jwk},
    }


def issue_credential(course_id: str, display_name: str | None, consent: bool) -> dict:
    course = COURSES.get(course_id)
    if course is None:
        raise ValueError("Unknown course.")
    name = display_name.strip() if consent and isinstance(display_name, str) and display_name.strip() else None
    issued_at = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    credential_id = str(uuid.uuid4())
    base = public_base()
    issuer_id = f"{base}/api/issuer"
    subject: dict = {
        "id": f"urn:uuid:{uuid.uuid4()}",
        "type": ["AchievementSubject"],
        "achievement": {
            "id": f"{base}/api/achievements/{course_id}",
            "type": ["Achievement"],
            "name": course["name"],
            "description": course["description"],
        },
    }
    if name:
        subject["name"] = name
    payload = {
        "@context": [VC_CONTEXT, OB_CONTEXT],
        "id": f"{base}/api/credentials/{credential_id}",
        "type": ["VerifiableCredential", "OpenBadgeCredential"],
        "issuer": {"id": issuer_id, "type": ["Profile"], "name": "LearnAble"},
        "validFrom": issued_at,
        "name": course["name"],
        "credentialSubject": subject,
        "iss": issuer_id,
    }
    token = sign_jwt(payload)
    with connect() as connection:
        connection.execute(
            "INSERT INTO credentials (id, course_id, jwt, payload, issued_at, revoked) VALUES (?, ?, ?, ?, ?, 0)",
            (credential_id, course_id, token, json.dumps(payload, ensure_ascii=False), issued_at),
        )
        connection.commit()
    return {"id": credential_id, "verifyUrl": f"/verify/{credential_id}", "jwt": token, "credential": payload}


def fetch_credential(credential_id: str) -> dict | None:
    with connect() as connection:
        row = connection.execute("SELECT jwt, payload, issued_at, revoked FROM credentials WHERE id = ?", (credential_id,)).fetchone()
    if row is None:
        return None
    return {
        "id": credential_id,
        "jwt": row["jwt"],
        "credential": json.loads(row["payload"]),
        "issuedAt": row["issued_at"],
        "revoked": bool(row["revoked"]),
    }


def signature_ok(jwt: str, jwk: dict) -> bool:
    try:
        header, payload, signature = jwt.split(".")
        public = Ed25519PublicKey.from_public_bytes(b64url_decode(jwk["x"]))
        public.verify(b64url_decode(signature), f"{header}.{payload}".encode())
        return True
    except Exception:  # noqa: BLE001 - any bad token is simply not valid
        return False


def verify_credential(credential_id: str) -> dict | None:
    stored = fetch_credential(credential_id)
    if stored is None:
        return None
    signed = signature_ok(stored["jwt"], public_jwk())
    revoked = stored["revoked"]
    issuer = stored["credential"].get("issuer", {}).get("id")
    return {
        "valid": bool(signed) and not revoked,
        "issuedAt": stored["issuedAt"],
        "issuer": issuer,
        "revoked": revoked,
    }


def revoke_credential(credential_id: str) -> bool:
    with connect() as connection:
        cursor = connection.execute("UPDATE credentials SET revoked = 1 WHERE id = ?", (credential_id,))
        connection.commit()
        return cursor.rowcount > 0

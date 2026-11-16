# Experimental backend

This FastAPI app is not part of the LearnAble submission.

- Docker Compose does not start it. The submission API is `server/app.py`.
- It expects third-party services (a hosted database, a hosted chat model, and optional embedding and vector stores). Those are paid or account-gated. They are not configured in the default `.env.example`.
- Do not put keys for those services in the demo site. The browser chat does not call this process.
- Nothing here is verified against WCAG, a screen reader, or a Deaf or blind reviewer.
- The gloss it talks about is American Sign Language, not Ethiopian Sign Language.

Leave this directory unused unless a later review decides to keep a piece of it.

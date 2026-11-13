# LearnAble

Offline-first accessible learning for Ethiopian learners who are Deaf, hard of hearing, blind, or on a slow connection.

Hackathon track: **Accessible learning media**. Scope and stack: [SCOPE.md](SCOPE.md).

## Run locally

Terminal 1 — API

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Terminal 2 — PWA

```powershell
cd frontend
npm install
npm run dev
```

Open http://127.0.0.1:5173

- Larger text / High contrast / Stop motion sit in the left rail (same idea as the ALX brief).
- Lesson player: Space play/pause, arrows skip, `c` switches caption language.
- Save for 3G, then use DevTools → Offline or aeroplane mode.
- Voice command (Chrome): “lesson”, “jobs”, “home”.

## What is real in this prototype

| Feature | How it works without a paid API |
|---|---|
| Captions EN/AM | Authored WebVTT + overlay |
| Sign window | Prerecorded-style staged interpreter (Selam) |
| Audio description | Separate cue list, spoken on demand |
| Offline pack | IndexedDB + service worker |
| Vision helper | On-device canvas stats + optional Pillow on FastAPI |
| Attendance | SQLite last-seen; queues if the network is down |
| Braille | Grade-1 English `.brf` from the transcript |
| Jobs / certificates | Local JSON + hash ids |

Computer vision here describes a **classroom picture**. It is not a cane and must not be demoed as street navigation.

## Starter mapping

[Savanna static pages](https://github.com/alx-africa/Savanna-static-pages/tree/main/pages) freeze three learner screens. LearnAble keeps that shape: rail, continue-learning, concept + navigation, but the media layer is what the track asks for.

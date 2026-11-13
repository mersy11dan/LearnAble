# LearnAble — scope, stack, and roadmap

ALX Inclusive Hackathon · Track 2 Accessible Learning Media  
14–15 November 2026 · Offline-first for Ethiopian learners who are Deaf, hard of hearing, blind, low vision, or on 3G.

This file is the contract for the team. The working prototype lives in `frontend/` and `backend/`.

## Problem we actually ship

Savanna already has courses. The gap is the media: no Ethiopian Sign Language window, weak Amharic captions, no audio description, no 3G pack, no tagged documents, no job card a screen reader can finish at 200% zoom.

LearnAble is not a new LMS. It is an **embeddable accessible player + transcript pipeline + offline pack**, mapped onto the three frozen Savanna pages:

| Savanna starter | LearnAble surface |
|---|---|
| `homepage-v1-paced.html` | Home — continue where you left off, week-style course cards |
| `homepage-v1-self-paced.html` | Progress + “I am here” attendance |
| `concept-with-navigation.html` | Lesson player with curriculum rail and transcript |

Starter: https://github.com/alx-africa/Savanna-static-pages/tree/main/pages

## In scope (must have)

1. Keyboard- and screen-reader-operable player.
2. English and Amharic captions: resize, recolour.
3. Movable, resizable Ethiopian Sign Language window (prerecorded / staged for the prototype).
4. Audio description track.
5. Offline / 3G pack: captions, transcript, light HTML, attendance queued until the network returns.
6. Tagged document with image descriptions.
7. Career gateway job cards with audio summary, readable at large text.
8. Verifiable certificate id.
9. Python consistency checker: last-seen + reminders (“we missed you”).
10. Local computer-vision *classroom* describer (not street navigation).
11. Grade-1 English Braille / `.brf` export of the transcript.

## Out of scope for the two-day demo

- Full Ethiopian Sign Language machine translation.
- Meta Ray-Ban / Be My Eyes glasses as a dependency (Ethiopia is not on the glasses availability list).
- VR classrooms.
- Voyage AI + Pinecone as a requirement to open a downloaded lesson.
- Outdoor obstacle avoidance.

Those sit on the later roadmap. Phone first.

## Tech stack (low bandwidth, no paid API required)

| Layer | Choice | Why |
|---|---|---|
| App shell | React PWA (Vite) | Matches Savanna’s web learner; installable on Android; service worker caches the shell |
| Native later | React Native (not Flutter) | Same player logic can move to Expo after the hackathon |
| CSS | Hand-written tokens | No CDN-heavy UI kit; high-contrast navy from the brief, gold as Braille-dot accent |
| Captions | WebVTT + HTML overlay | Works in the browser without a caption API |
| Offline | Service worker + IndexedDB | 3G: cache on download. Zero net: play the pack |
| Backend | FastAPI + SQLite | One Python process on a laptop or cheap VPS |
| Vision | Pillow on server + canvas on device | Describes a chalkboard; no cloud vision key |
| Speech | Web Speech API | Offline-ish TTS on the phone; no Whisper required for the demo |
| Braille | Local Grade-1 mapper | `.brf` file, no embosser API |
| Optional online | Whisper.cpp, ONNX, Voyage, Pinecone | Only when the network is up; never block playback |

Fonts: Source Serif 4 + Noto Sans Ethiopic. If Google Fonts is blocked, the UI still renders with Georgia / Segoe.

## Ethiopian data (honest)

We do **not** ship scraped faces. Demo content is authored classroom copy (Hirut, Dawit, Selam) in English and Amharic.

Neighbours to cite, not to pretend we trained:

- CESL — 1,320 videos, 22 signers, Bahir Dar ([ethio-artifical.github.io](https://ethio-artifical.github.io/)).
- EthSL Tutor — on-device hand practice ([abiti23.github.io/ethsl-tutor](https://abiti23.github.io/ethsl-tutor/)).
- UNICEF ESA guidance on sign language in accessible digital textbooks.
- Visions Global Empowerment Ethiopia EthSL video library.

Signs in the player are labelled helpers. A Deaf teacher still owns the language.

## Architecture

```
Online:   React PWA  →  FastAPI  →  SQLite
Offline:  React PWA  →  IndexedDB + Cache API  →  queued sync
Wearable (later): glasses still  →  same /api/vision/describe
```

Never call an LLM to open a lesson that is already on the phone.

## Two-day roadmap

**Day 1 morning** — This repo running. Savanna mapping. FastAPI health. Home + rail.

**Day 1 afternoon** — Player, bilingual captions, sign window, transcript, keyboard.

**Day 2 morning** — Offline pack, vision helper, attendance checker, documents.

**Day 2 afternoon** — Job cards, certificate, 3G phone test, aeroplane-mode demo, pitch.

## Team split (five people)

1. React shell + Savanna mapping  
2. Player, captions, sign window  
3. FastAPI, SQLite, sync, certificates  
4. Vision + EthSL research (prerecorded first)  
5. PWA offline, 3G testing, accessibility pass

## Demo script (judges)

1. Play the lesson. Tab through controls. Change caption colour. Drag the sign window.  
2. Download the pack. Turn on aeroplane mode. Play again.  
3. Point the camera at a notebook. Hear a description.  
4. Tap **I am here**. Show the Python reminder.  
5. Open a job card at large text. Play the audio summary. Issue a certificate id.

That is Track 2. Everything else is a sequel.

## Later

- Whisper.cpp for new uploads when a centre has power.  
- Human-verified EthSL clips from a partner school.  
- BRF to a real embosser.  
- Meta glasses stills into the same vision endpoint, if/when Ethiopia is supported.  
- Optional Voyage embeddings for *searching* a transcript library — never for playback.

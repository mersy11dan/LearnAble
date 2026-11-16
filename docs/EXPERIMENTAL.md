# Experimental pieces

These files exist in the repository. They are off by default, they are not part of the judged demo, and none of the claims below have been verified with assistive technology or a co-designer.

## What is actually here

- `src/components/ChatSupport/` is a support panel. The site mounts it only when the build sets `VITE_ENABLE_CHAT=true`. The default build does not mount it.
- With or without that flag, the panel answers from `getFallbackResponse` in the browser. It does not call Google Gemini. It does not read an API key. Text typed into it stays on the machine.
- The ASL button in that panel returns a short offline gloss. That gloss is American Sign Language word order, not Ethiopian Sign Language, and it is not a recording.
- `experimental/ASLInterpreter/` is an unused panel. It is not imported.
- `experimental/backend/` is an unused FastAPI app. Docker Compose does not start it. It is written for hosted database, chat, and embedding services. Those are not configured.

## What is not true

Nothing in this folder is WCAG compliant by itself. Screen reader, Dragon, and switch support were not tested here. There is no Habesha voice model, no real-time sign translation, no analytics, and no Supabase in the running demo.

The sign window in the real player is documented in `docs/SIGN-LANGUAGE.md`.

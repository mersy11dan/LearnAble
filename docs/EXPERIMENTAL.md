# Experimental pieces

These files exist in the repository. They are off by default, they are not part of the judged demo, and none of the claims below have been verified with assistive technology or a co-designer.

## What is actually here

- `src/components/ChatSupport/` is a support panel. The site mounts it unless the build sets `VITE_ENABLE_CHAT=false`.
- With no `GEMINI_API_KEY`, answers come from saved text in the browser. Gemini is used only when that server key is set and the chat consent box is ticked. The key never reaches the page.
- There is no ASL panel in the chat. Sign language for Track 2 is the lesson player sign window.
- `experimental/ASLInterpreter/` is an unused panel. It is not imported.
- `experimental/backend/` is an unused FastAPI app. Docker Compose does not start it. It is written for hosted database, chat, and embedding services. Those are not configured.

## What is not true

Nothing in this folder is WCAG compliant by itself. Screen reader, Dragon, and switch support were not tested here. There is no Habesha voice model, no real-time sign translation, no analytics, and no Supabase in the running demo.

The sign window in the real player is documented in `docs/SIGN-LANGUAGE.md`.

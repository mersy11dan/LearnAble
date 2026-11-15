# Pocket Sign: what stayed and what was removed

Pocket Sign was a layer added on 15 November 2026 with a floating ASL interpreter, a support chat, a second
backend, and a database. This note records what is still in the repository after the AI review and why the rest
was taken out.

## Still here

- **Support chat** (`src/components/ChatSupport/`). Saved answers with no key. Gemini answers through the
  transcript service once `GEMINI_API_KEY` is set and the consent box is ticked. Every answer says which it is.
- **Voice input** in the chat, using the browser's speech recognition. Nothing is uploaded.
- **ASL gloss panel** in the chat (`src/utils/aslTranslation.ts`). It uses the same shipped gloss file as the sign
  window, and asks the transcript service for anything else. The service runs the model only when
  `LEARNABLE_GLOSS_LOCAL` or `HF_GLOSS_REMOTE` is set. The browser never downloads the model.
- **Humanised voice helper** (`src/utils/voiceHumanized.ts`), which picks a device voice. It is not an AI model.

## Removed, and why

- **The floating ASL interpreter** was never imported by any page. It pulled Material UI, Emotion, and
  react-resizable into the bundle for nothing.
- **The FastAPI backend** (`backend/`) duplicated the Flask service with a second `/api/translate` that meant
  something different, called a retired Gemini model id, and returned a word-hash as if it were an embedding when
  no key was set. No page called it.
- **Gemini in the browser.** The key was read from a `VITE_` variable, so it shipped inside the JavaScript. The key
  now lives on the transcript service, behind the same consent header as Hasab and Hugging Face.
- **transformers.js** downloaded the 892 MB gloss model into the browser on first use, which is not usable on the
  3G phone the project is built for.

## What a judge should know

The sign panel is ASL gloss and fingerspelling, labelled as not Ethiopian Sign Language. No Ethiopian Sign Language
text-to-sign model exists. A recorded Deaf signer is the only honest path, and that work is on a separate branch.

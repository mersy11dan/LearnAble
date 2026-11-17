# Chat support

A support assistant for the demo site. It answers questions about the lesson, the player, and the accessibility
controls, and it can take voice input to move around the site. Sign language for Track 2 lives on the lesson
player, not in this chat.

## How an answer is produced

1. Spoken or typed page names (`sessions`, `jobs`, `lesson`, `pack`, `verify`) are handled as navigation.
2. Other questions are matched to notes in `src/utils/courseKnowledge.ts`.
3. The page posts the question, the matched notes, and the last few turns to `POST /api/chat` on the transcript service.
4. The service answers with Gemini when `GEMINI_API_KEY` is set **and** the request carries
   `X-LearnAble-Consent: yes`. Otherwise it says a saved answer should be shown.
5. The page shows either the Gemini reply, labelled with the model name, or a saved answer from
   `src/utils/gemini.ts`, labelled "Saved answer. No model is running."

The consent box sits above the input. It stores `learnable-consent` in `sessionStorage`, the same flag the
pipeline page uses. Nothing leaves the site until it is ticked. The key never reaches the browser.

If the transcript service is not running, the chat still works. Every answer is then saved text, and says so.

The chat is on the page unless the build sets `VITE_ENABLE_CHAT=false`.

## Configuration

On the machine that runs `server/app.py`:

```bash
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.5-flash
```

Keys at https://aistudio.google.com/app/apikey. Leave the key blank for the no-model demo.

## Voice and text

The microphone is spoken input for people who cannot see the page. Tap it and say a page name such as `sessions` or
`jobs`. The reply is spoken. The text field stays available for people who are Deaf or hard of hearing, or who
prefer to type. There is no grid of command buttons.

Spoken answers still match local notes first. Gemini is only the optional online extra, behind the consent box.

## Track 2 sign language

The sign window, captions, audio description, offline pack, and tagged documents are on the lesson player
(`/lesson/slow-connection`). Press `S` for the sign window. That is ASL gloss, not Ethiopian Sign Language.

## Files

```
src/components/ChatSupport/
├── index.tsx              # Container, consent box
├── ChatMessage.tsx        # One message, with its source label
├── ChatInput.tsx          # Text field and send
├── VoiceControl.tsx       # Microphone button
├── useChatSupport.ts      # State, navigation, and the call to the service
└── styles.css

src/utils/
├── gemini.ts              # Calls /api/chat, holds the saved answers
├── courseKnowledge.ts     # Notes matched to a question
├── voiceNavigation.ts     # Page names
├── speechRecognition.ts   # Spoken input
└── speechSynthesis.ts     # Spoken replies

src/lib/api.ts             # chat(), glossText(), consentHeaders()
server/app.py              # POST /api/chat, POST /api/gloss
```

## Accessibility

The chat is a non-modal dialog, so a screen reader can still reach the page behind it. Escape closes it. Messages
are in a live `log` region. Every control has a name. The composer controls are 44px. Focus rings follow the site
tokens. High contrast and reduced motion follow the site toggles.

## Tests

`npm test` runs `src/test/chat-support.test.tsx` and `src/test/speech-recognition.test.ts`. `pytest` covers
`/api/chat` with no key, with a key but no consent, and with a mocked Gemini reply.

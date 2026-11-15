# Chat support

A support assistant for the demo site. It answers questions about the lesson, the player, and the accessibility
controls, takes voice input, and shows ASL gloss.

## How an answer is produced

1. The page matches the question to notes in `src/utils/courseKnowledge.ts`.
2. It posts the question, the matched notes, and the last few turns to `POST /api/chat` on the transcript service.
3. The service answers with Gemini when `GEMINI_API_KEY` is set **and** the request carries
   `X-LearnAble-Consent: yes`. Otherwise it says a saved answer should be shown.
4. The page shows either the Gemini reply, labelled with the model name, or a saved answer from
   `src/utils/gemini.ts`, labelled "Saved answer. No model is running."

The consent box sits above the input. It stores `learnable-consent` in `sessionStorage`, the same flag the
pipeline page uses. Nothing leaves the site until it is ticked. The key never reaches the browser.

If the transcript service is not running, the chat still works. Every answer is then saved text, and says so.

## Configuration

On the machine that runs `server/app.py`:

```bash
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.5-flash
```

Keys at https://aistudio.google.com/app/apikey. Leave the key blank for the no-model demo.

## Voice input

The microphone button uses the browser's Web Speech API. Audio is handled by the browser, not uploaded by
LearnAble. Chrome and Edge support it. Firefox needs `media.webspeech.recognition.enable`. Safari needs iOS 14.5
or later.

## ASL gloss

The ASL button opens a panel that turns English into ASL gloss. It is ASL, not Ethiopian Sign Language, and not a
recorded signer. The six lesson captions come from `src/content/asl-gloss.json`, corrected by hand. Other text is
sent to `POST /api/gloss`, which runs `Suyash2205/signbridge-t5-base-asl-gloss` only when
`LEARNABLE_GLOSS_LOCAL` or `HF_GLOSS_REMOTE` is set. Without that the panel shows the English words in capitals
and says that no model is running. The browser never downloads the model.

## Files

```
src/components/ChatSupport/
├── index.tsx              # Container, consent box
├── ChatMessage.tsx        # One message, with its source label
├── ChatInput.tsx          # Text input
├── VoiceControl.tsx       # Microphone button
├── ASLTranslator.tsx      # ASL gloss panel
├── useChatSupport.ts      # State and the call to the service
└── styles.css

src/utils/
├── gemini.ts              # Calls /api/chat, holds the saved answers
├── courseKnowledge.ts     # Notes matched to a question
├── aslTranslation.ts      # Shipped gloss, then /api/gloss
├── speechRecognition.ts   # Web Speech API wrapper
└── speechSynthesis.ts     # Text-to-speech wrapper

src/lib/api.ts             # chat(), glossText(), consentHeaders()
server/app.py              # POST /api/chat, POST /api/gloss
```

## Accessibility

The chat is a non-modal dialog, so a screen reader can still reach the page behind it. Messages are in a live
`log` region. Every control has a name. Focus rings follow the site tokens. High contrast and reduced motion follow
the site toggles.

## Tests

`npm test` runs `src/test/chat-support.test.tsx`: opening, sending, the source label, the consent box, the ASL
label, and the dialog roles. `pytest` covers `/api/chat` with no key, with a key but no consent, and with a mocked
Gemini reply.

# Quick start

One process runs the whole demo. No key is needed.

```bash
git clone https://github.com/mersy11dan/LearnAble.git
cd LearnAble
npm install
npm run dev
```

Open http://127.0.0.1:5173. The lesson, the 3G pack, the session viewer, the job cards, the certificate check, and
the support chat all work here. Chat answers are saved text until a key is set, and each answer says so.

## Transcript service (optional)

The Flask service adds translation, transcription, image descriptions, the gloss model, and Gemini chat. It also
works with no keys: known lesson sentences return their shipped captions, and everything else says it was not run.

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r server/requirements.txt
cp .env.example .env
python server/app.py
```

The dev server proxies `/api` to http://127.0.0.1:5050. Notes are at http://127.0.0.1:5050/api/docs.

## Keys

Fill in `.env` on the machine that runs the service. Never put a key in a `VITE_` variable.

| Variable | Turns on |
| --- | --- |
| `HASAB_API_KEY` | Amharic speech-to-text, translation, and text-to-speech |
| `HF_TOKEN` | Hugging Face speech recognition and image captions |
| `GEMINI_API_KEY` | Google Gemini answers in the support chat |

Every provider call needs the consent box on the page. The request then carries `X-LearnAble-Consent: yes`.

## Checks

```bash
npm test
npm run lint
npm run build
pytest
```

See `README.md` for the embed, the keyboard map, and the licences.

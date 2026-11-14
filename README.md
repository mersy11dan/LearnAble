# LearnAble

LearnAble is a plug-in educational sites embed. One script tag adds an accessible player and a floating display toolbar. The host page keeps its own layout. The player draws inside a shadow tree, so the host stylesheet does not restyle it.

English and Amharic captions, a sign window, audio description, and optional 3G pack, braille, and tagged PDF controls ship in the same file. It runs with no API keys. Sample captions and the browser voice are the fallback.

## Embed

```html
<script src="https://your-host/learnable.js" defer></script>
<learnable-player
  src="/media/lesson-en.mp4"
  captions-en="/media/captions-en.vtt"
  captions-am="/media/captions-am.vtt"
  sign="/media/esl-placeholder.mp4"
  describe="/media/descriptions.vtt"
  offline
  braille
  docs>
</learnable-player>
```

The script also mounts `<learnable-toolbar>` when the page does not include one. Call `LearnAble.init` to choose the language and which features start on.

| Option | Default | What it does |
| --- | --- | --- |
| `lang` | `"en"` | `"en"` or `"am"` caption language |
| `theme` | `"paper"` | `"paper"` or `"navy"` |
| `features.toolbar` | on | Floating larger text, high contrast, stop motion, caption size and colour |
| `features.signWindow` | on | Sign window. Turn off with `sign="false"` |
| `features.audioDescription` | on | Spoken description. Turn off with `describe="false"` |
| `features.offlinePack` | off | 3G zip. Also on when the element has `offline` |
| `features.braille` | off | `.brf` download. Also on when the element has `braille` |
| `features.taggedDocs` | off | Tagged PDF. Also on when the element has `docs` |

`LearnAble.getSettings()`, `LearnAble.setSettings({ largeText: true })`, and `LearnAble.reset()` read and write the same choices. They are stored in `localStorage` under `learnable-widget`. Larger text, contrast, and reduced motion are applied with one removable style tag, `learnable-host-adjust`.

Events, on the element and on `window`: `learnable-ready`, `learnable-play`, `learnable-captions`, `learnable-settings`.

Build both the site and the bundle with `npm run build`. The plug-in files are `dist/learnable.js` (IIFE, for the script tag) and `dist/learnable.es.js`, each with a sourcemap. The IIFE is about 41 KB, about 15 KB gzipped.

Copy-paste snippets for HTML, React, WordPress, and an iframe fallback are on `/integrate`.

## Demo script

About two and a half minutes. Start on Savanna as it shipped.

1. Open **Before / with** and leave it on Before. Say this is the learner page, unchanged, with no captions and no display controls.
2. Switch to **With LearnAble**. Say the only addition is a script tag and a `learnable-player` element.
3. Press Play. Press the captions control so the line switches to Amharic. Open the toolbar and choose yellow on black, then a larger caption size.
4. Point at the sign window. Say it tells the host where a recorded Ethiopian Sign Language clip goes, and the gloss follows the captions until then.
5. Turn on audio description. Then press **Larger text**, **High contrast**, and **Stop motion** on the toolbar. Say those settings stick on this browser and can be reset.
6. If the player was given `offline`, `braille`, and `docs`, download the 3G pack, the braille file, and the tagged PDF. Say those three are off until the host opts in.
7. Open **Embed** and show the HTML snippet. Mention the React wrapper and the WordPress shortcode on the same page.

## Run it

```bash
npm install
npm test
npm run lint
npm run build
npm run dev
```

Open http://127.0.0.1:5173. The lesson, the pack, and the job card work in that one process.

The transcript service is optional. In a second terminal:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r server/requirements.txt
cp .env.example .env
python server/app.py
```

The dev server proxies `/api` to http://127.0.0.1:5050. With `.env` empty, known lesson sentences return the bundled caption and are marked `sample`. Other text is not invented.

`npm run preview` serves the production build on http://127.0.0.1:4173. The service worker is registered only in that build, so the app shell can be reopened after one online visit.

Rebuild the demo media (needs `espeak-ng` and `ffmpeg`) with `npm run media`.

## Design system

Tokens live in `src/styles/tokens.css`. Components use those names. Do not add a one-off color or shadow in a page.

The identity is a caption bar. The wordmark is a drawn frame (the picture) with a yellow bar under it (the caption), then the name: **Learn** in Literata, **Able** in Atkinson Hyperlegible. The same yellow bar marks the current nav item and a pressed display toggle. The sign window is the only thing that floats, and it floats with a hard offset, not a blur.

| Token group | Names | Why |
| --- | --- | --- |
| Color | `--color-paper` `#f2f0ea`, `--color-ink` `#172033`, `--color-navy` `#1b3048`, `--color-navy-ink` `#f7f4ee`, `--color-line`, `--color-moss` `#0e5a42`, `--color-focus` `#0b3d91`, `--color-muted`, `--color-caption` `#ffee00`, `--color-stage` `#111111` | Solid only. No gradients. Ink on paper is 14.3:1. Navy ink on navy is 12.2:1. Caption yellow on the stage is 17.2:1. Moss is reserved for the sign window. |
| Type | `--font-display` Literata, `--font-text` Atkinson Hyperlegible, Ethiopic falls through to Noto | Literata for titles, a reading serif. Atkinson for UI and body, drawn for low vision. `--text-xs` through `--text-2xl`. |
| Space | `--space-1` to `--space-7`, `--measure` 68ch, `--page` 76rem | Rems, so larger text and 200% zoom reflow instead of clipping. |
| Radius | `--radius-none` | Square corners. The product is a frame and a bar, not a card kit. |
| Elevation | `--elevation-flat`, `--elevation-float` (`4px 4px 0`) | The sign window is the only raised surface. The offset is solid navy. |
| Motion | `--motion-fast`, `--motion-ease` | Stop motion, and `prefers-reduced-motion`, set the duration to 0 and kill animation. |
| Focus | `--focus-width` 3px, `--focus-offset`, `--focus-color` | Visible on paper (blue) and on the navy bar (yellow). |
| Target | `--size-target` 2.75rem | Controls meet a 44px minimum. |
| Caption bar | `--bar-height`, `--bar-width`, `--elevation-press` | Yellow bar on navy only: the logo, the current page, a pressed display toggle, and the bottom edge of a button. Page titles use a short navy rule, which turns yellow in high contrast. Spacing adds `--space-0` and `--space-8`. Type adds `--leading-ui`. Motion adds `--motion-press`. Radius for controls is `--radius-control` (square). |

`html[data-text="large"]`, `html[data-contrast="high"]`, and `html[data-motion="reduce"]` retarget the same tokens. High contrast is black, white, and yellow. The header buttons are Larger text, High contrast, and Stop motion, stored in `localStorage` under `learnable-display`.

Navigation: the wordmark is home. Lesson, Pack, Session, and Jobs are the primary bar, with the current item underlined by the caption bar. A skip link is first. Inner pages have a breadcrumb. The lesson page has Skip to player. Text, certificate check, pipeline, tracks, Savanna, and accessibility are in the footer.

## What is in the demo

- `/` the opening frame and the first caption
- `/lesson/slow-connection` the player
- `/lesson/slow-connection/read` the text page, tagged PDF, and `.brf`
- `/offline` the 3G pack
- `/sessions/studio` the same lesson as a recorded session with a chat log
- `/careers` the job card
- `/verify` and `/verify/:code` the certificate check
- `/pipeline` the transcript service, or a clear offline message
- `/savanna` links into the frozen Savanna pages
- `/reference/savanna/` those pages themselves

Keyboard, once the picture frame is selected: Space or K play, C cycles captions, D audio description, S the sign window, arrows seek and change volume, M mute, F full screen, question mark lists them. Arrow keys move the sign window. Smaller and Larger resize it.

## Savanna

`public/reference/savanna/` is an unmodified copy of [alx-africa/Savanna-static-pages](https://github.com/alx-africa/Savanna-static-pages). That repo has no license file. The pages are included so the three learner screens are routes here. LearnAble does not relicense them. See `NOTICE.md`.

The capture is a static snapshot of Savanna (ALX’s learning platform): a paced homepage, a self-paced homepage, and a concept page. Week strips, modals, and the curriculum panel still work. Most links are inert on purpose. Nothing in that repo, or in the public hackathon note, says an accessible app may not call an API. The requirement is that a learner can keep studying when the network is poor. LearnAble is offline-first: a service worker, a downloadable pack of audio, text, and light HTML, and APIs only while online and keyed.

## Keys

Copy `.env.example` to `.env`. Leave the secrets blank to use the fallbacks.

| Variable | Purpose | Where |
| --- | --- | --- |
| `HASAB_API_KEY` | Hasab speech-to-text, translation, and text-to-speech | https://www.hasab.ai/register then the developer dashboard. Docs: https://developer.hasab.ai/ |
| `HASAB_API_BASE` | Defaults to `https://api.hasab.ai` | Only change if Hasab gives you another host |
| `HF_TOKEN` | Hugging Face inference | https://huggingface.co/settings/tokens |
| `HF_ASR_MODEL` | Default `waxal-benchmarking/whisper-small-waxal-amh` | Amharic speech recognition, CC-BY-4.0 |
| `HF_MT_MODEL` | Default `facebook/nllb-200-distilled-600M` | Translation. NLLB weights are CC-BY-NC-4.0, so not for a commercial product |
| `HF_CAPTION_MODEL` | Default `Salesforce/blip-image-captioning-base` | English image captions to review before they become alt text. BSD-3-Clause |
| `VITE_API_BASE` | Public URL of the transcript service | Empty in dev, because Vite proxies `/api`. Never put a key in a `VITE_` variable |

Leyu is datasets and a Hugging Face model (`gheero-Leyu/amharic-omnivoice-tts`), not an inference API, so it is not called.

## Tests

`npm test` runs Vitest (parsers, braille, the tagged PDF, axe on the home, lesson, and job card). `pytest` runs the transcript service with keys removed. `npm run lint` and `npm run build` should pass before a pull request.

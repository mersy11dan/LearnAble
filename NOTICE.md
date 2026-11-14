# Notices

LearnAble’s own application code was written for the ALX Accessibility Hackathon.
The pieces below are someone else’s work and keep their own terms.

## Savanna static pages

`public/reference/savanna/` is an unmodified copy of
https://github.com/alx-africa/Savanna-static-pages (the `pages/` tree, `assets/`,
`index.html`, and `README.md`).

That repository does not publish a license file. LearnAble does not claim
copyright in those files and does not relicense them. They are included so the
three frozen learner pages are routes in this app. Bootstrap in that tree is
MIT. The Google font files shipped with it are under the SIL Open Font License.

## Ethiopic braille table

`vendor/liblouis/ethio-g1.ctb` is from liblouis, LGPL-2.1.
Copyright 2012, 2018 Dr. Tamru E. Belay and 2012, 2015 Mesar Hameed.
LearnAble reads the table at runtime. It does not ship the liblouis C library.
https://liblouis.io/

The Braille ASCII character order used to write `.brf` files is the North
American Braille ASCII code, a published 64-character encoding.

## Fonts

Atkinson Hyperlegible (Braille Institute) and Literata are SIL Open Font
License, loaded from the Fontsource packages.

Noto Sans Ethiopic and Noto Serif Ethiopic are SIL Open Font License.
Copyright Google. See `public/fonts/Noto-copyright.txt`.

## ASL fingerspelling drawings

`public/signs/fingerspell/A.svg` through `Z.svg` are the Wikimedia Commons files
`Sign language A.svg` through `Sign language Z.svg`.

The Commons licence field for each file is public domain. The file metadata
names WPClipart as the publisher and Paul Sherman as the editor, dated
11 November 2013, with rights marked PD.
https://commons.wikimedia.org/wiki/Category:ASL_letters

They are handshape drawings for the manual alphabet. They are not video of a
signer, and they are not Ethiopian Sign Language.

ASL-LEX (https://asl-lex.org/) is CC BY-NC 4.0. It is not downloaded or shipped.
Lifeprint (https://www.lifeprint.com/) and Handspeak (https://www.handspeak.com/)
are not open licences. They are not used. No pose or avatar set was bundled,
because this panel only needed still handshapes and those projects do not
publish an openly licensed still for the demo gloss words.

## Sign language models that were not used

Hugging Face sign models found for this project are sign-to-text or still-image classifiers, or they are not Ethiopian Sign Language. `ihsanahakiim/videomae-base-finetuned-signlanguage` and `fhswf/sign-language-avatar-gloss-dgs` are non-commercial. None of them are downloaded or called. See `docs/SIGN-LANGUAGE.md`.

## Optional models

NLLB-200 (`facebook/nllb-200-distilled-600M`) is CC-BY-NC-4.0. It is not downloaded, not called, and not named as the default. Translation uses it only when `HF_MT_MODEL` is set to that id and the person has given consent.

### ASL gloss model

`Suyash2205/signbridge-t5-base-asl-gloss` is a T5-base model that turns an English sentence into ASL gloss. The prompt is `translate English to ASL gloss: ` plus the sentence. The base model is `google-t5/t5-base`.

The model card and the Hub tag say **Apache-2.0**. The repository files do not include a separate `LICENSE` file. The stated licence is the card front matter and the `license:apache-2.0` tag.

The training set named on the card, `achrafothman/aslg_pc12`, is **CC-BY-NC-4.0**. That is non-commercial. Because the weights were trained on non-commercial data, LearnAble treats the model as opt-in, the same way it treats `HF_MT_MODEL`. The weights are not in this repository. Nothing downloads or calls them unless you set one of:

- `LEARNABLE_GLOSS_LOCAL=1`, which loads the model with transformers on the machine running Flask. No request leaves the machine. No paid API.
- `HF_GLOSS_REMOTE=1` together with `HF_TOKEN` and the header `X-LearnAble-Consent: yes`, which calls the Hugging Face Inference API.

The published weights are one `model.safetensors` file of 891,644,712 bytes (about 892 MB, fp32). The repo has no ONNX file and no quantized file. An int8 copy would still be on the order of 220 MB. That is too large to ship inside the browser plug-in, so the model does not run in the page.

The six English captions of the sample lesson were run once on a 4-thread Intel Xeon with no GPU. Those gloss lines are shipped in `src/content/asl-gloss.json` and copied onto `src/content/lesson.json`. They are marked precomputed by this model. The demo sign panel reads that file and does not need the backend. The lines are ASLG-PC12 gloss: English word order, `X-` and `DESC-` prefixes, and drift on names (`Addis Ababa` came back as `ADDUS ABRAHAM`). They are not Ethiopian Sign Language.

`waxal-benchmarking/whisper-small-waxal-amh` is CC-BY-4.0. `Salesforce/blip-image-captioning-base` is BSD-3-Clause. Both stay on Hugging Face and run only with a token and consent.

## Optional eSpeak NG voice

eSpeak NG is GPL-3.0-or-later. Copyright the eSpeak NG authors.
https://github.com/espeak-ng/espeak-ng

LearnAble does not copy, compile, or ship eSpeak NG. Putting that code in this MIT tree would make the combined program GPL-3.0. The plug-in only tries, at run time, to load a separate file the host may add at `/learnable/espeak/speak.js`. That file is not in this repository. If it is missing, or it does not export `speak(text, lang, rate)`, LearnAble keeps going and says so in the status text. A host who serves that file keeps it under GPL-3.0. It is not relicensed by this NOTICE.

The Web Speech API is the voice that actually runs here. An Amharic voice is used when the browser already has one.

## Patterns, not copied code

The player’s keyboard and caption behaviour follows ideas from Able Player
(MIT) and the controls described by VidPly (GPL-2.0-or-later). Neither
codebase is copied into this repository. VidPly was not vendored because its
license would cover the whole app.

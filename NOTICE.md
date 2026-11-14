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

## Sign language models that were not used

Hugging Face sign models found for this project are sign-to-text or still-image classifiers, or they are not Ethiopian Sign Language. `ihsanahakiim/videomae-base-finetuned-signlanguage` and `fhswf/sign-language-avatar-gloss-dgs` are non-commercial. None of them are downloaded or called. See `docs/SIGN-LANGUAGE.md`.

## Optional models

NLLB-200 (`facebook/nllb-200-distilled-600M`) is CC-BY-NC-4.0. It is not downloaded, not called, and not named as the default. Translation uses it only when `HF_MT_MODEL` is set to that id and the person has given consent.

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

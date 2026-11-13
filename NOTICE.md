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

## Patterns, not copied code

The player’s keyboard and caption behaviour follows ideas from Able Player
(MIT) and the controls described by VidPly (GPL-2.0-or-later). Neither
codebase is copied into this repository. VidPly was not vendored because its
license would cover the whole app.

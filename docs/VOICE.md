# Spoken navigation

LearnAble voice speaks the focused control as you move with the keyboard. It says the role, the accessible name, and the state: pressed, checked, expanded, disabled, or current. A heading includes its level and text. A paragraph includes its text. An image uses its text alternative, a description from the plug-in map, or the words "Description not yet provided".

The voice follows the element's language, or the page language. English and Amharic are the two used here. The Web Speech API picks a matching voice when the browser has one.

## On, unless you say otherwise

Spoken navigation is on by default. The first visit opens a dialog: "Keep LearnAble voice" or "I use my own screen reader (turn LearnAble voice off)". The choice is stored in this browser and wins over the host default. Escape on that dialog turns the voice off, so a screen reader is not joined by a second voice.

A host sets the default, not the saved choice:

```html
<script src="/learnable/learnable.js" defer data-learnable-voice="off"></script>
```

```js
LearnAble.init({ voice: "off" });
```

`voice: "on"` is the same as leaving it unset. The LearnAble voice button, and Alt+Shift+S, change the saved choice. The button uses `aria-pressed`. The change is also written to a polite live region.

Alt+Shift+S is not a command in NVDA, JAWS, Orca, VoiceOver, Chrome, Firefox, or Edge. On some Mac keyboard layouts Option+Shift+S types a character while a text field is focused, so the shortcut does not run in a field. The LearnAble voice button is the alternative. The shortcut can be rewritten in the keyboard help dialog.

## First gesture

Chrome and Safari often stay silent until a click or a key. The choice buttons are that gesture. If the choice was already saved, the next key or click unlocks speech. Until then a line waits and is spoken once, or it is replaced by the next line.

## Audio description

Audio description is on when spoken navigation is on, and it has its own button. The choice is saved separately after the first dialog. A lesson video gets a descriptions track (`kind="descriptions"`) from `describe` or `/media/descriptions.vtt`. Cues play in the pauses they mark. If the words would take longer than that gap, the video pauses and resumes when the line ends (WCAG 1.2.7). A key cancels the current line. If that line had paused the video, the video continues.

Focus speech and description speech share one voice, so they do not play at the same time.

## Pictures

A decorative image (`alt=""`, presentation, or hidden) is not a tab stop and is not spoken. A picture with a description that is not already inside a link or button becomes a tab stop. A picture inside a link is spoken with that link.

## eSpeak NG

If the browser has voices and none match the language, LearnAble tries to load `/learnable/espeak/speak.js`. That file is optional and is not in this repository. eSpeak NG is GPL-3.0, which conflicts with shipping it inside the MIT bundle. See NOTICE.md. If the file is absent, the line is left to the Web Speech API and a short note is shown. Nothing fails closed.

`speak.js` should export `speak(text, lang, rate)` and may use eSpeak NG's Amharic voice (`am`). Serve it as its own files. Do not merge those files into `learnable.js`.

## Shortcuts

| Key | Action |
| --- | --- |
| Tab, Shift+Tab | Move through the page. The skip link is first. |
| H, Shift+H | Next or previous heading. |
| L, Shift+L | Next or previous landmark. Inside the picture frame, L seeks instead. |
| ? | Keyboard help. Escape closes it and returns focus. |
| Alt+Shift+S | LearnAble voice. |
| Escape | Close help, or turn the first-run voice off. Also closes an open Savanna panel. |

Single letters do nothing in a text field, a list, or an editable region. The Keyboard shortcuts button turns those letters off. The help dialog can change the letters. NVDA and JAWS browse mode take H and L before the page sees them. That is expected.

The picture frame, while focused, still uses Space or K, C, D, S, and the arrow keys.

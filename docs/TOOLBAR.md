# Floating toolbar notes

Checked 15 November 2026 against public notes on [skills.sh](https://www.skills.sh/).

- [Global toolbar controls](https://www.skills.sh/dembrandt/dembrandt-skills/global-toolbar-controls) treats accessibility preferences as occasional, not the main task. They should not compete with the page. A row of preferences stays shorter than a stack.
- [Sticky and fixed elements](https://www.skills.sh/dembrandt/dembrandt-skills/sticky-and-fixed-elements) keeps `position: fixed` for something that is truly global, and asks for a thin bar so the page keeps its space.
- [Icon buttons](https://www.skills.sh/vectorlabau/skills/icon-buttons) requires a real accessible name. A `title` tooltip is not that name.
- A pocket bar, such as the one described by [tosi pocket bar](https://ui.tosijs.net/pocket-bar/), is a small handle that opens into the controls and then tucks away.

LearnAble follows the handle idea and not the glass look. The launcher is a solid navy button, collapsed until Alt+Shift+L or a click. It starts at the bottom right so it does not cover the sidebar. The open panel is the same navy, with paper controls, and it moves off the thing that has focus. There is no gradient and no translucent blur. The word “On” is added to a pressed control so the state is not colour alone. Opening the tools focuses Larger text in See. Position stays closed until it is opened.

## Hearing LearnAble speak while you record

Headless Chromium usually has an empty `speechSynthesis.getVoices()` list. LearnAble then says, in the polite live region: “This browser has no speech voices, so LearnAble cannot speak aloud. The words stay on screen.”

To hear it:

1. Use headed Google Chrome or Chromium, not a headless run. Open the lesson, choose “Keep LearnAble voice”, then focus a heading or press Play reading.
2. On Linux, install `speech-dispatcher` and `espeak-ng`, then launch Chromium with `--enable-speech-dispatcher`. Example: `google-chrome --enable-speech-dispatcher`.
3. Capture the desktop audio with the system recorder, or with `ffmpeg -f pulse -i default walkthrough.wav`, while the headed window is the one speaking. A headless axe run will not contain that audio.

# LearnAble WCAG 2.2 AA conformance

Product: LearnAble embeddable player and toolbar, plus the LearnAble demo site.
Standard: WCAG 2.2 Level A and AA.
Date: 14 November 2026.
Method: code review, keyboard walkthrough, axe-core (critical and serious), and a 320 CSS-pixel reflow check.

This report covers the LearnAble module. The frozen Savanna pages in `public/reference/savanna/` are the host sample. They are unchanged and are not claimed as conformant.

| Criterion | Level | Result | Remarks |
| --- | --- | --- | --- |
| 1.1.1 Non-text Content | A | Supports | Lesson images have text alternatives. The decorative mark is hidden from assistive tech. Captions are text. The sign window states that it is not a recording. |
| 1.2.1 Audio-only and Video-only | A | Supports | The lesson has a transcript. The 3G pack includes the narration as audio and as text. |
| 1.2.2 Captions (Prerecorded) | A | Supports | English and Amharic captions are on by default. |
| 1.2.3 Audio Description or Media Alternative | A | Supports | Audio description can be spoken, and the description text is in the transcript panel. |
| 1.2.4 Captions (Live) | AA | Not Applicable | No live broadcast. The session viewer plays a recording. |
| 1.2.5 Audio Description (Prerecorded) | AA | Supports | A description track is included and can be turned on. |
| 1.3.1 Info and Relationships | A | Supports | Headings, lists, fieldsets, and buttons are used. The plug-in exposes a labelled region. |
| 1.3.2 Meaningful Sequence | A | Supports | DOM order matches the visual order on the demo site. The sign window can move; its controls stay in the window. |
| 1.3.3 Sensory Characteristics | A | Supports | Instructions name the control, not only its colour or position. |
| 1.3.4 Orientation | AA | Supports | No orientation lock. |
| 1.3.5 Identify Input Purpose | AA | Not Applicable | The module does not collect personal data fields. |
| 1.4.1 Use of Color | A | Supports | Pressed and current states use a bar plus `aria-pressed` or `aria-current`. |
| 1.4.2 Audio Control | A | Supports | Audio does not autoplay. Play and pause are buttons. |
| 1.4.3 Contrast (Minimum) | AA | Partially Supports | LearnAble colours were checked: ink on paper 14.3:1, navy ink on navy 12.2:1, yellow captions on the stage 17.2:1. The unchanged Savanna host pages are not part of this claim. |
| 1.4.4 Resize Text | AA | Supports | Text uses rem. Larger text sets the root to 125 percent. Browser zoom to 200 percent reflows. |
| 1.4.5 Images of Text | AA | Supports | Captions and the gloss are text, not pictures of text. |
| 1.4.10 Reflow | AA | Supports | At 320 CSS pixels the LearnAble pages are intended to scroll vertically only. Wide code samples wrap. |
| 1.4.11 Non-text Contrast | AA | Supports | Focus rings are 3px. Borders and the caption bar meet 3:1 against adjacent colours. |
| 1.4.12 Text Spacing | AA | Supports | No fixed height clips the text when spacing is increased. |
| 1.4.13 Content on Hover or Focus | AA | Not Applicable | No extra content appears only on hover. |
| 2.1.1 Keyboard | A | Supports | The player, toolbar, sign window, and pages are operable by keyboard. |
| 2.1.2 No Keyboard Trap | A | Supports | The shortcut dialog uses the native dialog element and can be closed. No other trap. |
| 2.1.4 Character Key Shortcuts | A | Supports | Single-letter shortcuts run only when the picture frame is selected, not in fields. |
| 2.2.1 Timing Adjustable | A | Not Applicable | No time limit. |
| 2.2.2 Pause, Stop, Hide | A | Supports | Stop motion and `prefers-reduced-motion` stop animation. The sign placeholder does not autoplay a moving clip. |
| 2.3.1 Three Flashes | A | Supports | No flashing content. |
| 2.4.1 Bypass Blocks | A | Supports | A skip link is the first control on LearnAble pages. |
| 2.4.2 Page Titled | A | Supports | The demo site sets a title. A host page keeps its own title. |
| 2.4.3 Focus Order | A | Supports | Focus follows the DOM order. |
| 2.4.4 Link Purpose | A | Supports | Links name their destination. |
| 2.4.5 Multiple Ways | AA | Supports | Header, footer, breadcrumbs, and in-page next links. |
| 2.4.6 Headings and Labels | AA | Supports | Pages have a heading. Controls have visible labels. |
| 2.4.7 Focus Visible | AA | Supports | `:focus-visible` draws a 3px ring. |
| 2.4.11 Focus Not Obscured (Minimum) | AA | Supports | Focused items use scroll margin. The toolbar sits in the top corner and does not cover the focused control. The sign window moves with buttons so it can be moved off a control. |
| 2.5.1 Pointer Gestures | A | Not Applicable | No multipoint or path gesture is required. |
| 2.5.2 Pointer Cancellation | A | Supports | Actions run on click, which fires on release. |
| 2.5.3 Label in Name | A | Supports | Accessible names include the visible text. |
| 2.5.4 Motion Actuation | A | Not Applicable | No motion-only input. |
| 2.5.7 Dragging Movements | AA | Supports | The sign window can be dragged, and also moved and resized with buttons and arrow keys. |
| 2.5.8 Target Size (Minimum) | AA | Supports | Buttons are at least 2.75rem. Text links have a minimum block size of 1.75rem (28px). |
| 3.1.1 Language of Page | A | Supports | The demo site is `lang="en"`. Amharic passages are `lang="am"`. |
| 3.1.2 Language of Parts | AA | Supports | Amharic captions and paragraphs set `lang="am"`. |
| 3.2.1 On Focus | A | Supports | Focus does not change context. |
| 3.2.2 On Input | A | Supports | Changing a select does not load a new page. |
| 3.2.3 Consistent Navigation | AA | Supports | The header and footer stay in the same order. |
| 3.2.4 Consistent Identification | AA | Supports | The same action keeps the same name. |
| 3.2.6 Consistent Help | A | Supports | The accessibility page and embed docs stay in the footer. |
| 3.3.1 Error Identification | A | Supports | A failed pack or a missing service is described in text. |
| 3.3.2 Labels or Instructions | A | Supports | Fields have labels. |
| 3.3.3 Error Suggestion | AA | Supports | The pipeline message says the sample captions are still available. |
| 3.3.4 Error Prevention | AA | Not Applicable | No legal or financial transaction. |
| 3.3.7 Redundant Entry | A | Supports | The module does not ask for the same information twice. Caption choices are stored. |
| 3.3.8 Accessible Authentication | AA | Not Applicable | LearnAble does not ask the learner to log in or solve a puzzle. |
| 4.1.2 Name, Role, Value | A | Supports | Buttons, the dialog, the slider, and pressed states expose name, role, and value. |
| 4.1.3 Status Messages | AA | Supports | Player status and pipeline results use a live region. |

## How to reproduce the gate

Sound off: captions start in English, the sign window is open, and the transcript is on the page.
Keyboard: Tab to the picture, Space plays, C cycles captions, S toggles the sign window, question mark lists the other keys. Move and resize the sign window with its buttons.
Zoom: set the browser to 200 percent, or use a 320 CSS-pixel wide window. The main path is Open the lesson, Play, read the caption, read the transcript.
Screen readers: the controls are buttons with names. Captions are also in the transcript so they are not only painted on the video.
axe: `npm test` includes every demo route. `npm run axe` checks the built site in Chrome, including high contrast, and fails on critical or serious issues.

# Response to the Overlay Fact Sheet

The [Overlay Fact Sheet](https://overlayfactsheet.com) says an overlay that claims to repair a website from the outside often fails the people who needed the repair, and can get in the way of the tools they already use. LearnAble is a plug-in. This note says what we refuse to do, and where the product is still in tension with that criticism.

## What we do not do

We do not replace a screen reader. NVDA, JAWS, VoiceOver, TalkBack, and Orca keep their own keys. H and L on this page do nothing while a text field is focused, and browse mode still takes those letters before the page sees them. The first visit asks whether to keep LearnAble voice or turn it off because the person already has a screen reader. Escape on that dialog turns the voice off. The LearnAble voice button and Alt+Shift+S stay on the page, and the choice is stored in this browser. A host can set the default with `LearnAble.init({ voice: "off" })` or `data-learnable-voice="off"`. A saved choice wins over the host.

That default of "on" is the tension. The fact sheet is right that a second voice is harmful when someone already has one. The prompt, the persistent off switch, and the host config are the mitigation. They are not the same as leaving the voice off until someone asks. The prompt is there so the person can refuse it before the second voice starts. Speech does not start until that choice, and some browsers stay silent until the first click or key anyway.

We do not override the operating system. `prefers-reduced-motion: reduce` starts with motion stopped. `forced-colors: active` skips the contrast paint and the widget uses Canvas and CanvasText. `prefers-contrast` is left to the person. We do not turn high contrast on because the system asked for more contrast. The slider is a separate choice.

We do not lock the repairs in. Each change is marked `data-learnable-repair`. `LearnAble.clearRepairs()` removes those attributes, the skip link this script added, and the lesson gateway. The toolbar and player live in shadow DOM, so their colours do not restyle the host.

The toolbar can be dragged, but the corner buttons and the arrow keys on the Move control do the same job without a drag. That is [WCAG 2.5.7](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html). If focus would sit under the toolbar, the toolbar moves to another corner, or the focused element is scrolled clear ([2.4.11](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)). It collapses to a LearnAble button. After the first visit it starts collapsed. The place and the collapsed state are remembered.

## Patterns we followed

The toolbar uses the [WAI-ARIA toolbar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/): one tab stop, arrow keys, Home, and End. The help and the first-visit question use the [modal dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/): a name, a focus move, a trap, Escape, and focus returned. Collapse uses the [disclosure pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/): a button, `aria-expanded`, and `aria-controls`.

Keyboard behaviour also follows the `keyboard-interface` skill from rebuildup/design-skills, published at [skills.sh](https://www.skills.sh/rebuildup/design-skills/keyboard-interface): native buttons, no positive tabindex, a visible focus ring, and no action that exists only on hover.

## What an overlay still cannot promise

Repairing names, lists, and contrast in the browser does not fix the source. A site with a strict content-security policy can block the bookmarklet. The extension avoids that because the script is inside the package and it runs only after a click, with `activeTab` and `scripting`, and with no permission to every website. Neither one is a conformance certificate.

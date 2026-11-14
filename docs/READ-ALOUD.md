# Read aloud, and what we do not do

Blind people often bring their own screen reader. NVDA, JAWS, VoiceOver, and TalkBack already speak headings, landmarks, links, and form controls. A second voice on top of that is a failure. LearnAble does not read on hover. It does speak keyboard focus by default, and the first visit asks the person to keep that voice or turn it off because they use their own screen reader. That choice is remembered. See docs/VOICE.md.

[Khan Academy](https://support.khanacademy.org/hc/en-us/articles/360015349472-Can-Khan-Academy-be-used-with-a-screen-reader-or-read-aloud-tools) separates the two jobs: a screen reader is the interface for people with little or no sight, and read-aloud is a choice for people who can see the words and want to hear them. [GOV.UK](https://www.gov.uk/service-manual/technology/testing-with-assistive-technologies) tests with JAWS, NVDA, VoiceOver, and TalkBack as the person's own tools. [BBC GEL](https://www.bbc.co.uk/gel/features/how-to-design-for-accessibility) says to give people control, including a visible focus and a choice to play or not.

Continuous read-aloud is still a button. Play reading starts only after a click. It reads one sentence, heading, or link at a time, highlights that piece, and offers pause, stop, speed, pitch, and verbosity. Spoken focus is separate, and it is on until the person turns it off. [ReadSpeaker](https://www.readspeaker.com/blog/readspeaker-fits-assistive-technology-landscape/) describes the same pattern: pace, highlighting, and playback that a person starts. [Microsoft Immersive Reader](https://learn.microsoft.com/en-us/azure/ai-services/immersive-reader/reference) is the same idea in another product: the person opens it, then chooses how the text is spoken and shown.

## Shortcuts

Page keys (H, L, and question mark) work across the host page, and they can be turned off or changed. That is the [WCAG 2.2 character-key shortcut](https://www.w3.org/WAI/WCAG22/Understanding/character-key-shortcuts.html) rule: a letter shortcut must be limited to a focused component, or it must be possible to turn it off or remap it. They do not run while a text field is focused. The picture frame keeps its own keys only while it is focused. Screen reader browse keys are left alone: NVDA and JAWS take H and L before the page sees them.

The focus ring is a 3px outline with a 2px offset, so it meets the size and change-of-contrast idea in [Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html) and stays clear of the control, which is the point of [Focus Not Obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html).

## What was not tested here

Orca is not installed on this machine, and NVDA cannot run here. The checks are keyboard, axe, and the speech-synthesis calls in the browser. A person should still try NVDA or Orca on the Savanna page before the deadline.

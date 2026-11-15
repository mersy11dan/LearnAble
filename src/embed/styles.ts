export const widgetCss = `
:host {
  --color-paper: #f2f0ea;
  --color-ink: #172033;
  --color-navy: #1b3048;
  --color-navy-ink: #f7f4ee;
  --color-line: #d5d0c6;
  --color-moss: #0e5a42;
  --color-focus: #0b3d91;
  --color-caption: #ffee00;
  --color-stage: #111111;
  --color-muted: #3d4d63;
  --color-surface: #ffffff;
  --font-text: "Atkinson Hyperlegible", "Noto Sans Ethiopic", sans-serif;
  --font-display: Literata, "Noto Serif Ethiopic", Georgia, serif;
  --bar-height: 0.28rem;
  --focus-width: 3px;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --radius-sm: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --elevation-sm: 0 2px 4px rgba(23, 32, 51, 0.08), 0 1px 2px rgba(23, 32, 51, 0.04);
  --elevation-md: 0 4px 12px rgba(23, 32, 51, 0.1), 0 2px 4px rgba(23, 32, 51, 0.06);
  --elevation-lg: 0 8px 24px rgba(23, 32, 51, 0.12), 0 4px 8px rgba(23, 32, 51, 0.06);
  --motion-fast: 120ms;
  --motion-ease: ease-out;
  color: var(--color-ink);
  font-family: var(--font-text);
  font-size: 1rem;
  line-height: 1.45;
  display: block;
  position: fixed;
  z-index: 2147483000;
  max-width: min(22rem, calc(100vw - 1rem));
  max-height: calc(100vh - 1rem);
}
:host([data-corner="bl"]) { left: 0.5rem; bottom: 0.5rem; top: auto; right: auto; }
:host([data-corner="br"]) { right: 0.5rem; bottom: 0.5rem; left: auto; top: auto; }
:host([data-corner="tl"]) { left: 0.5rem; top: 0.5rem; right: auto; bottom: auto; }
:host([data-corner="tr"]) { right: 0.5rem; top: 0.5rem; left: auto; bottom: auto; }
:host([theme="navy"]) {
  --color-paper: #1b3048;
  --color-ink: #f7f4ee;
  --color-surface: #1b3048;
}
:host([contrast="high"]),
:host-context(html[data-learnable-contrast="on"]) {
  --color-paper: var(--la-hc-bg, #121212);
  --color-ink: var(--la-hc-fg, #f2f2f2);
  --color-navy: var(--la-hc-bg, #121212);
  --color-navy-ink: var(--la-hc-fg, #f2f2f2);
  --color-line: var(--la-hc-fg, #f2f2f2);
  --color-moss: var(--la-hc-fg, #f2f2f2);
  --color-focus: var(--la-hc-focus, #ffe14a);
  --color-caption: var(--la-hc-focus, #ffe14a);
  --color-stage: var(--la-hc-bg, #121212);
  --color-muted: var(--la-hc-fg, #f2f2f2);
  --color-surface: var(--la-hc-bg, #121212);
  --elevation-sm: none;
  --elevation-md: none;
  --elevation-lg: 0 0 0 2px var(--la-hc-fg, #f2f2f2);
}
* { box-sizing: border-box; }
:focus-visible { outline: var(--focus-width) solid var(--color-focus); outline-offset: 3px; }
button {
  font: inherit;
  font-weight: 500;
  min-height: 2.75rem;
  padding: 0.5rem 1rem;
  background: var(--color-navy);
  color: var(--color-navy-ink);
  border: 2px solid var(--color-navy);
  border-radius: var(--radius-sm);
  box-shadow: var(--elevation-sm);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color var(--motion-fast) var(--motion-ease),
              border-color var(--motion-fast) var(--motion-ease),
              box-shadow var(--motion-fast) var(--motion-ease),
              transform 80ms var(--motion-ease);
}
button:hover {
  background: var(--color-ink);
  border-color: var(--color-ink);
  box-shadow: var(--elevation-md);
}
button:active { transform: translateY(1px); box-shadow: none; }
button[aria-pressed="true"] {
  background: var(--color-ink);
  color: var(--color-paper);
  box-shadow: inset 0 -3px 0 var(--color-caption);
}
.media-row { display: grid; grid-template-columns: minmax(0, 1fr) 0.5rem minmax(0, var(--sign-col, 16rem)); gap: 0.5rem; align-items: start; min-width: 0; }
.sign-grip {
  position: relative;
  z-index: 6;
  cursor: col-resize;
  background: var(--color-moss);
  color: var(--color-paper);
  min-height: 2.75rem;
  min-width: max-content;
  white-space: nowrap;
  overflow-wrap: normal;
  word-break: keep-all;
  border-radius: var(--radius-sm);
  transition: background-color var(--motion-fast) var(--motion-ease);
}
.sign-grip:hover { background: color-mix(in srgb, var(--color-moss) 85%, black); }
@media (max-width: 52rem) {
  .media-row { grid-template-columns: 1fr; }
  .sign-grip { display: none; }
}
.stage {
  position: relative;
  background: var(--color-stage);
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-lg);
  box-shadow: var(--elevation-lg);
  overflow: hidden;
}
video { width: 100%; height: 100%; display: block; background: var(--color-stage); object-fit: contain; }
.caption {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: var(--space-4);
  max-width: 90%;
  margin: 0;
  padding: 0.5em 1em;
  text-align: center;
  line-height: 1.4;
  border-radius: var(--radius-md);
  backdrop-filter: blur(4px);
}
.row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  align-items: center;
  padding: var(--space-3) var(--space-4);
  margin-top: var(--space-3);
  background: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--elevation-sm);
}
.row.extras { background: transparent; box-shadow: none; padding: var(--space-3) 0; }
.status {
  color: var(--color-muted);
  margin: var(--space-2) 0;
  padding: var(--space-2) var(--space-3);
  background: var(--color-paper);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-variant-numeric: tabular-nums lining-nums;
}
.sign {
  max-width: 100%;
  margin-top: var(--space-3);
  border: 2px solid var(--color-moss);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  color: var(--color-ink);
  overflow: hidden;
}
.sign h2 {
  font-family: var(--font-display);
  font-size: 1rem;
  line-height: 1.35;
  font-weight: 500;
  margin: 0;
  padding: var(--space-3) var(--space-4);
  background: var(--color-navy);
  color: var(--color-navy-ink);
  overflow-wrap: anywhere;
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.sign h2::before {
  content: "";
  display: block;
  width: 6px;
  height: 20px;
  background: var(--color-navy-ink);
  opacity: 0.6;
  flex-shrink: 0;
}
.sign video {
  width: 100%;
  max-height: 9rem;
  background: var(--color-stage);
  object-fit: contain;
  border-radius: var(--radius-sm);
  margin: var(--space-2);
  width: calc(100% - var(--space-4));
}
video[data-fallback][hidden] { display: none; }
.chat { margin: 0.5rem 0; padding-left: 1.2rem; }
.bar .status, .bar .consent, .bar label { color: var(--color-navy-ink); }
.bar select, .bar a { min-height: 2.75rem; color: var(--color-ink); background: var(--color-paper); border-radius: var(--radius-sm); }
.bar a { display: inline-flex; align-items: center; padding: 0 0.75rem; text-decoration: underline; }
.sign p { margin: var(--space-3) var(--space-4); }
.gloss { font-family: var(--font-display); font-size: 1.15rem; line-height: 1.35; overflow-wrap: anywhere; }
.mark { display: block; width: 2.5rem; height: 1.1rem; border: 2px solid var(--color-navy); box-shadow: 0 var(--bar-height) 0 var(--color-caption); margin-bottom: 0.4rem; }
label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 8rem;
  font-size: 0.875rem;
  color: var(--color-muted);
}
select, input, textarea {
  color: var(--color-ink);
  background-color: var(--color-surface);
  border: 2px solid var(--color-line);
  border-radius: var(--radius-sm);
  padding: var(--space-2);
  transition: border-color var(--motion-fast) var(--motion-ease);
}
select:hover, input:hover, textarea:hover { border-color: var(--color-navy); }
input[type="range"] {
  width: 100%;
  min-height: 2.75rem;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  padding: 0;
  border: none;
}
input[type="range"]::-webkit-slider-runnable-track {
  height: 6px;
  background: var(--color-line);
  border-radius: 9999px;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 24px;
  height: 24px;
  background: var(--color-navy);
  border-radius: 50%;
  border: 2px solid var(--color-surface);
  margin-top: -9px;
  box-shadow: var(--elevation-sm);
  transition: transform var(--motion-fast) var(--motion-ease);
}
input[type="range"]:hover::-webkit-slider-thumb { transform: scale(1.1); }
input[type="range"]::-moz-range-track {
  height: 6px;
  background: var(--color-line);
  border-radius: 9999px;
}
input[type="range"]::-moz-range-thumb {
  width: 24px;
  height: 24px;
  background: var(--color-navy);
  border-radius: 50%;
  border: 2px solid var(--color-surface);
  box-shadow: var(--elevation-sm);
}
input[type="range"]::-moz-range-progress {
  height: 6px;
  background: var(--color-navy);
  border-radius: 9999px;
}
section {
  background: var(--color-paper);
  color: var(--color-ink);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}
.launcher, .handle { min-width: 2.75rem; }
.dock { display: flex; flex-direction: column; gap: 0.35rem; align-items: flex-start; }
.bar {
  position: static;
  background: var(--color-navy);
  color: var(--color-navy-ink);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  max-width: min(22rem, calc(100vw - 1rem));
  max-height: min(70vh, calc(100vh - 4rem));
  overflow: auto;
}
@media (forced-colors: active) {
  :host, .bar, .launcher, .handle, button, a, select, input {
    background: Canvas !important; color: CanvasText !important; border-color: CanvasText !important;
  }
}
.transcript { list-style: none; margin: 0.5rem 0; padding: 0; max-height: 16rem; overflow: auto; }
.transcript button {
  background: transparent;
  color: var(--color-ink);
  border: 0;
  box-shadow: none;
  text-align: left;
  width: 100%;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  transition: background-color var(--motion-fast) var(--motion-ease);
}
.transcript button:hover { background: rgba(27, 48, 72, 0.06); }
.sign .row {
  background: var(--color-paper);
  border-top: 1px solid var(--color-line);
  border-radius: 0;
  margin-top: 0;
  padding: var(--space-3);
}
.sign .row button {
  background: var(--color-surface);
  color: var(--color-ink);
  border-color: var(--color-line);
  box-shadow: none;
  font-size: 0.875rem;
  padding: var(--space-2) var(--space-3);
}
.sign .row button:hover {
  background: var(--color-navy);
  color: var(--color-navy-ink);
  border-color: var(--color-navy);
}
.gloss-lines { margin: 0.5rem 0.75rem; min-width: 0; max-width: 100%; }
.gloss-lines dt { font-weight: 700; margin: 0.45rem 0 0.15rem; overflow-wrap: anywhere; }
.gloss-lines dd { margin: 0 0 0.35rem; min-width: 0; }
.sign, .sign h2, .sign p, .spell { min-width: 0; max-width: 100%; overflow-wrap: anywhere; }
.bar button {
  background: transparent;
  color: inherit;
  border-color: transparent;
  box-shadow: none;
  border-radius: var(--radius-sm);
  transition: background-color var(--motion-fast) var(--motion-ease), box-shadow var(--motion-fast) var(--motion-ease);
}
.bar button:hover { background: rgba(255, 255, 255, 0.1); box-shadow: none; }
.bar button[aria-pressed="true"] {
  box-shadow: inset 0 -3px 0 var(--color-caption);
  background: rgba(255, 238, 0, 0.15);
}
.bar button[aria-pressed="true"]::after { content: " On"; }
[hidden] { display: none !important; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
`;

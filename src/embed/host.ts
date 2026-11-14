import { themePair } from "../lib/contrast";
import { resolveUrl } from "./assets";
import { clearContrastPaints, repairContrast } from "./repair";
import type { WidgetSettings } from "./settings";

const STYLE_ID = "learnable-host-adjust";

function hostCss(settings: WidgetSettings): string {
  const theme = settings.contrastMode === "off" ? null : themePair(settings.contrastMode, settings.contrastLevel);
  const paint = theme
    ? `
html[data-learnable-contrast="on"] { --la-hc-bg: ${theme.bg}; --la-hc-fg: ${theme.fg}; --la-hc-focus: ${theme.focus}; }
html[data-learnable-contrast="on"] body,
html[data-learnable-contrast="on"] body *:not(img):not(video):not(svg):not(canvas):not(iframe):not(learnable-player):not(learnable-player *):not(learnable-toolbar):not(learnable-toolbar *) {
  background-color: var(--la-hc-bg) !important;
  color: var(--la-hc-fg) !important;
  border-color: var(--la-hc-fg) !important;
  text-shadow: none !important;
}
html[data-learnable-contrast="on"] :focus-visible { outline: 3px solid var(--la-hc-focus) !important; outline-offset: 3px !important; }
`
    : "";
  return `
html { scroll-padding-top: 5rem; scroll-padding-bottom: 7rem; }
:focus { scroll-margin-top: 5rem; scroll-margin-bottom: 7rem; }
:focus-visible { outline: 3px solid #0b3d91; outline-offset: 2px; }
.learnable-skip {
  position: absolute; left: 0.5rem; top: 0.5rem; transform: translateY(-150%);
  background: #1b3048; color: #f7f4ee; padding: 0.6rem 1rem; z-index: 2147483001;
}
.learnable-skip:focus { transform: none; }
.learnable-alt-note { display: inline-block; margin-left: 0.35rem; color: #172033; background: #ffee00; padding: 0.15rem 0.4rem; }
.learnable-gateway {
  margin: 2rem 1rem; padding: 1rem; max-width: 40rem;
  background: #f2f0ea; color: #172033; border-top: 0.28rem solid #1b3048;
  font-family: "Atkinson Hyperlegible", "Noto Sans Ethiopic", sans-serif;
}
.learnable-gateway h2 { font-family: Literata, Georgia, serif; }
.learnable-gateway a, .learnable-gateway button {
  min-height: 2.75rem; color: #f7f4ee; background: #1b3048; border: 2px solid #1b3048;
  padding: 0.4rem 0.8rem;
}
.learnable-row { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.learnable-gateway input { min-height: 2.75rem; max-width: 100%; }
.learnable-sentence.is-current, .is-current {
  outline: 3px solid #0b3d91; outline-offset: 2px; background: #ffee00; color: #172033;
}
#learnable-reader-live { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
html[data-learnable-text="large"] { font-size: 112.5%; }
${paint}
html[data-learnable-motion="reduce"] *,
html[data-learnable-motion="reduce"] *::before,
html[data-learnable-motion="reduce"] *::after {
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.01ms !important;
  scroll-behavior: auto !important;
}
@font-face {
  font-family: "Atkinson Hyperlegible";
  src: url("${resolveUrl("/fonts/atkinson-latin-400.woff2")}") format("woff2");
  font-display: swap;
}
@font-face {
  font-family: Literata;
  src: url("${resolveUrl("/fonts/literata-latin-600.woff2")}") format("woff2");
  font-display: swap;
}
@font-face {
  font-family: "Noto Sans Ethiopic";
  src: url("${resolveUrl("/fonts/NotoSansEthiopic-Regular.ttf")}") format("truetype");
  font-display: swap;
}
`;
}

export function applyHost(settings: WidgetSettings): void {
  const root = document.documentElement;
  root.dataset.learnableText = settings.largeText ? "large" : "default";
  root.dataset.learnableMotion = settings.stopMotion ? "reduce" : "allow";
  let style = document.getElementById(STYLE_ID);
  if (!style) {
    style = document.createElement("style");
    style.id = STYLE_ID;
    document.head.append(style);
  }
  style.textContent = hostCss(settings);
  root.dataset.learnableContrast = settings.contrastMode === "off" ? "off" : "on";
  if (settings.contrastMode === "off") repairContrast();
  else clearContrastPaints();
}

export function clearHost(): void {
  document.getElementById(STYLE_ID)?.remove();
  const root = document.documentElement;
  delete root.dataset.learnableText;
  delete root.dataset.learnableContrast;
  delete root.dataset.learnableMotion;
}

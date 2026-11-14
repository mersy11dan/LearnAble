import { resolveUrl } from "./assets";
import type { WidgetSettings } from "./settings";

const STYLE_ID = "learnable-host-adjust";

function hostCss(): string {
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
html[data-learnable-text="large"] { font-size: 112.5%; }
html[data-learnable-contrast="high"] :focus-visible { outline: 3px solid #ffee00; outline-offset: 3px; }
html[data-learnable-contrast="high"] a { text-decoration: underline; }
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
  root.dataset.learnableContrast = settings.highContrast ? "high" : "default";
  root.dataset.learnableMotion = settings.stopMotion ? "reduce" : "allow";
  let style = document.getElementById(STYLE_ID);
  if (!style) {
    style = document.createElement("style");
    style.id = STYLE_ID;
    document.head.append(style);
  }
  style.textContent = hostCss();
}

export function clearHost(): void {
  document.getElementById(STYLE_ID)?.remove();
  const root = document.documentElement;
  delete root.dataset.learnableText;
  delete root.dataset.learnableContrast;
  delete root.dataset.learnableMotion;
}

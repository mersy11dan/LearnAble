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

import type { WidgetSettings } from "./settings";

const STYLE_ID = "learnable-host-adjust";

const HOST_CSS = `
html[data-learnable-text="large"] { font-size: 125%; }
html[data-learnable-contrast="high"] { background: #000 !important; color: #fff !important; }
html[data-learnable-contrast="high"] body { background: #000 !important; color: #fff !important; }
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
  src: url("/fonts/atkinson-latin-400.woff2") format("woff2");
  font-display: swap;
}
@font-face {
  font-family: Literata;
  src: url("/fonts/literata-latin-600.woff2") format("woff2");
  font-display: swap;
}
@font-face {
  font-family: "Noto Sans Ethiopic";
  src: url("/fonts/NotoSansEthiopic-Regular.ttf") format("truetype");
  font-display: swap;
}
`;

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
  style.textContent = HOST_CSS;
}

export function clearHost(): void {
  document.getElementById(STYLE_ID)?.remove();
  const root = document.documentElement;
  delete root.dataset.learnableText;
  delete root.dataset.learnableContrast;
  delete root.dataset.learnableMotion;
}

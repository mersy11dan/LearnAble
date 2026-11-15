import { resolveUrl } from "./assets";
import { getSettings } from "./settings";
import type { SignVisual } from "./signs";

export function motionReduced(): boolean {
  if (getSettings().stopMotion) return true;
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

function contrastOn(): boolean {
  const settings = getSettings();
  return settings.contrastMode !== "off" || settings.highContrast;
}

const SIGNER_STYLE = `
.signer { margin: 0.5rem 0.75rem; color: var(--color-ink, #172033); }
.signer-label { margin: 0 0 0.35rem; font-weight: 700; }
.signer-stage {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 360 / 420;
  background: #f7f4ee;
  border: 2px solid var(--color-line, #172033);
  overflow: hidden;
}
.signer-skin { fill: #e4cbb8; }
.signer-cloth { fill: var(--color-navy, #1b3048); }
.signer-limb { fill: #e4cbb8; }
.signer-shoulder, .signer-elbow, .signer-wrist { transition: transform 320ms ease-in-out; }
.signer-arm .signer-shoulder { transform-origin: 156px 148px; }
.signer-arm .signer-elbow { transform-origin: 100px 224px; }
.signer-arm .signer-wrist { transform-origin: 82px 152px; }
.signer-rest .signer-shoulder { transform-origin: 272px 150px; }
.signer-rest .signer-elbow { transform-origin: 308px 220px; }
.signer-arm[data-pose="0"] .signer-shoulder { transform: rotate(-6deg); }
.signer-arm[data-pose="0"] .signer-elbow { transform: rotate(4deg); }
.signer-arm[data-pose="1"] .signer-shoulder { transform: rotate(12deg); }
.signer-arm[data-pose="1"] .signer-elbow { transform: rotate(-14deg); }
.signer-arm[data-pose="1"] .signer-wrist { transform: rotate(8deg); }
.signer-arm[data-pose="2"] .signer-shoulder { transform: rotate(-14deg); }
.signer-arm[data-pose="2"] .signer-elbow { transform: rotate(16deg); }
.signer-arm[data-pose="2"] .signer-wrist { transform: rotate(-10deg); }
.signer-now { margin: 0.35rem 0 0; }
.signer-steps { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.4rem; }
.signer-steps button { white-space: nowrap; }
:host([contrast="high"]) .signer-stage,
.signer[data-contrast="on"] .signer-stage { background: #f7f4ee; border-color: #121212; }
:host([contrast="high"]) .signer-skin,
.signer[data-contrast="on"] .signer-skin { fill: #f7f4ee; stroke: #121212; stroke-width: 2; }
:host([contrast="high"]) .signer-cloth,
.signer[data-contrast="on"] .signer-cloth { fill: #121212; }
:host([contrast="high"]) .signer-limb,
.signer[data-contrast="on"] .signer-limb { fill: #121212; }
@media (prefers-reduced-motion: no-preference) {
  .signer:not([data-motion="reduced"]) .signer-arm { animation: signer-idle 2.8s ease-in-out infinite; }
  .signer:not([data-motion="reduced"]) .signer-rest { animation: signer-idle 3.6s ease-in-out infinite reverse; }
}
@keyframes signer-idle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
@media (prefers-reduced-motion: reduce) {
  .signer-arm, .signer-rest, .signer-shoulder, .signer-elbow, .signer-wrist { animation: none; transition: none; }
}
.signer[data-motion="reduced"] .signer-arm,
.signer[data-motion="reduced"] .signer-rest,
.signer[data-motion="reduced"] .signer-shoulder,
.signer[data-motion="reduced"] .signer-elbow,
.signer[data-motion="reduced"] .signer-wrist { animation: none; transition: none; }
`;

export function ensureSigner(host: HTMLElement): void {
  if (host.querySelector("[data-signer]")) return;
  host.replaceChildren();
  const root = document.createElement("div");
  root.className = "signer";
  root.dataset.signer = "true";
  const style = document.createElement("style");
  style.textContent = SIGNER_STYLE;
  const label = document.createElement("p");
  label.className = "signer-label";
  label.textContent = "Computer-generated signing. ASL fingerspelling.";
  const stage = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  stage.setAttribute("viewBox", "0 0 360 420");
  stage.setAttribute("class", "signer-stage");
  stage.setAttribute("role", "img");
  stage.setAttribute("aria-hidden", "true");
  stage.innerHTML = `
    <g class="signer-rest" data-rest>
      <g class="signer-shoulder">
        <path class="signer-limb" d="M262 142 L282 158 L318 224 L298 214 Z"/>
        <g class="signer-elbow">
          <path class="signer-limb" d="M298 214 L318 224 L292 312 L274 300 Z"/>
          <g class="signer-wrist">
            <ellipse class="signer-skin" cx="284" cy="322" rx="14" ry="16"/>
          </g>
        </g>
      </g>
    </g>
    <g class="signer-body">
      <ellipse class="signer-skin" cx="214" cy="62" rx="32" ry="36"/>
      <rect class="signer-skin" x="200" y="94" width="28" height="22" rx="8"/>
      <path class="signer-cloth" d="M136 152 C172 116 260 116 292 152 L270 304 Q214 328 158 304 Z"/>
    </g>
    <g class="signer-arm" data-arm>
      <g class="signer-shoulder">
        <path class="signer-limb" d="M148 140 L170 156 L112 232 L90 216 Z"/>
        <g class="signer-elbow">
          <path class="signer-limb" d="M90 216 L112 232 L92 156 L74 148 Z"/>
          <g class="signer-wrist" data-wrist></g>
        </g>
      </g>
    </g>
  `;
  const hand = document.createElementNS("http://www.w3.org/2000/svg", "image");
  hand.setAttribute("data-hand", "true");
  hand.setAttribute("x", "28");
  hand.setAttribute("y", "86");
  hand.setAttribute("width", "96");
  hand.setAttribute("height", "120");
  hand.setAttribute("preserveAspectRatio", "xMidYMid meet");
  stage.querySelector("[data-wrist]")?.append(hand);
  const now = document.createElement("p");
  now.className = "signer-now";
  now.dataset.signerNow = "true";
  const steps = document.createElement("div");
  steps.className = "signer-steps";
  steps.dataset.signerSteps = "true";
  const previous = document.createElement("button");
  previous.type = "button";
  previous.dataset.act = "sign-prev";
  previous.textContent = "Previous handshape";
  const next = document.createElement("button");
  next.type = "button";
  next.dataset.act = "sign-next";
  next.textContent = "Next handshape";
  steps.append(previous, next);
  root.append(style, label, stage, now, steps);
  host.append(root);
}

export function showSignerFrame(host: HTMLElement, frames: SignVisual[], index: number): void {
  ensureSigner(host);
  const reduced = motionReduced();
  const root = host.querySelector<HTMLElement>("[data-signer]");
  if (root) {
    root.dataset.motion = reduced ? "reduced" : "eased";
    root.dataset.contrast = contrastOn() ? "on" : "off";
  }
  const steps = host.querySelector<HTMLElement>("[data-signer-steps]");
  if (steps) steps.hidden = !reduced || frames.length < 2;
  const arm = host.querySelector<SVGGElement>("[data-arm]");
  const hand = host.querySelector<SVGImageElement>("[data-hand]");
  const now = host.querySelector("[data-signer-now]");
  if (!frames.length) {
    if (hand) {
      hand.removeAttribute("href");
      hand.setAttribute("hidden", "");
    }
    if (now) now.textContent = "";
    return;
  }
  const frame = frames[Math.max(0, Math.min(frames.length - 1, index))];
  if (arm) arm.dataset.pose = String(index % 3);
  if (hand) {
    if (frame.src) {
      const url = resolveUrl(frame.src);
      hand.setAttribute("href", url);
      hand.setAttributeNS("http://www.w3.org/1999/xlink", "href", url);
      hand.removeAttribute("hidden");
      hand.setAttribute("aria-label", frame.alt);
    } else {
      hand.removeAttribute("href");
      hand.setAttribute("hidden", "");
    }
  }
  if (now) now.textContent = frame.kind === "point" ? `Point. ${frame.caption}` : `Fingerspelling ${frame.caption}`;
}

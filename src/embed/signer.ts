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
.signer-limb { fill: none; stroke: #e4cbb8; stroke-width: 18; stroke-linecap: round; }
.signer-joint { fill: var(--color-navy, #1b3048); }
.signer-shoulder, .signer-elbow, .signer-wrist { transition: transform 320ms ease-in-out; }
.signer-arm .signer-shoulder { transform-origin: 156px 150px; }
.signer-arm .signer-elbow { transform-origin: 92px 228px; }
.signer-arm .signer-wrist { transform-origin: 78px 156px; }
.signer-rest .signer-shoulder { transform-origin: 268px 150px; }
.signer-rest .signer-elbow { transform-origin: 312px 228px; }
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
.signer[data-contrast="on"] .signer-limb { stroke: #121212; }
:host([contrast="high"]) .signer-joint,
.signer[data-contrast="on"] .signer-joint { fill: #121212; }
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
        <path class="signer-limb" d="M268 150 L312 228"/>
        <circle class="signer-joint" cx="268" cy="150" r="7"/>
        <g class="signer-elbow">
          <path class="signer-limb" d="M312 228 L286 308"/>
          <circle class="signer-joint" cx="312" cy="228" r="7"/>
          <g class="signer-wrist">
            <ellipse class="signer-skin" cx="286" cy="324" rx="13" ry="15"/>
            <circle class="signer-joint" cx="286" cy="308" r="6"/>
          </g>
        </g>
      </g>
    </g>
    <g class="signer-body">
      <ellipse class="signer-skin" cx="210" cy="64" rx="32" ry="36"/>
      <rect class="signer-skin" x="196" y="96" width="28" height="20" rx="8"/>
      <path class="signer-cloth" d="M150 146 C178 122 246 122 274 146 L258 300 Q212 322 166 300 Z"/>
    </g>
    <g class="signer-arm" data-arm>
      <g class="signer-shoulder">
        <path class="signer-limb" d="M156 150 L92 228"/>
        <circle class="signer-joint" cx="156" cy="150" r="7"/>
        <g class="signer-elbow">
          <path class="signer-limb" d="M92 228 L78 156"/>
          <circle class="signer-joint" cx="92" cy="228" r="7"/>
          <g class="signer-wrist" data-wrist>
            <circle class="signer-joint" cx="78" cy="156" r="6"/>
          </g>
        </g>
      </g>
    </g>
  `;
  const hand = document.createElementNS("http://www.w3.org/2000/svg", "image");
  hand.setAttribute("data-hand", "true");
  hand.setAttribute("x", "18");
  hand.setAttribute("y", "48");
  hand.setAttribute("width", "118");
  hand.setAttribute("height", "148");
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

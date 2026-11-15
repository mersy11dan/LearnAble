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

export function ensureSigner(host: HTMLElement): void {
  if (host.querySelector("[data-signer]")) return;
  host.replaceChildren();
  const root = document.createElement("div");
  root.className = "signer";
  root.dataset.signer = "true";
  const label = document.createElement("p");
  label.className = "signer-label";
  label.textContent = "Computer-generated signing. ASL fingerspelling.";
  const stage = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  stage.setAttribute("viewBox", "0 0 240 280");
  stage.setAttribute("class", "signer-stage");
  stage.setAttribute("aria-hidden", "true");
  stage.innerHTML = `
    <ellipse cx="120" cy="42" rx="24" ry="28" fill="#e4cbb8"/>
    <rect x="88" y="72" width="64" height="92" rx="18" fill="#1b3048"/>
    <g class="signer-arm" data-arm>
      <path d="M150 86 C196 98 206 150 176 176" fill="none" stroke="#e4cbb8" stroke-width="16" stroke-linecap="round"/>
    </g>
  `;
  const hand = document.createElementNS("http://www.w3.org/2000/svg", "image");
  hand.setAttribute("data-hand", "true");
  hand.setAttribute("x", "138");
  hand.setAttribute("y", "150");
  hand.setAttribute("width", "78");
  hand.setAttribute("height", "96");
  stage.querySelector("[data-arm]")?.append(hand);
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
  root.append(label, stage, now, steps);
  host.append(root);
}

export function showSignerFrame(host: HTMLElement, frames: SignVisual[], index: number): void {
  ensureSigner(host);
  const reduced = motionReduced();
  const steps = host.querySelector<HTMLElement>("[data-signer-steps]");
  if (steps) steps.hidden = !reduced || frames.length < 2;
  const arm = host.querySelector<SVGGElement>("[data-arm]");
  const hand = host.querySelector<SVGImageElement>("[data-hand]");
  const now = host.querySelector("[data-signer-now]");
  if (!frames.length) {
    if (hand) hand.removeAttribute("href");
    if (now) now.textContent = "";
    return;
  }
  const frame = frames[Math.max(0, Math.min(frames.length - 1, index))];
  if (arm) arm.dataset.pose = String(index % 3);
  if (hand) {
    if (frame.src) {
      hand.setAttribute("href", resolveUrl(frame.src));
      hand.setAttribute("aria-label", frame.alt);
    } else {
      hand.removeAttribute("href");
    }
  }
  if (now) now.textContent = frame.kind === "point" ? `Point. ${frame.caption}` : `Fingerspelling ${frame.caption}`;
}

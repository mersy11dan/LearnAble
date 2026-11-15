import { resolveUrl } from "./assets";
import { getSettings } from "./settings";
import type { SignVisual } from "./signs";

type HandArt = { viewBox: string; d: string; stroke: string };
const cache = new Map<string, HandArt>();

export function motionReduced(): boolean {
  if (getSettings().stopMotion) return true;
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

type HandsOptions = {
  word?: string;
  note?: string;
  anchor?: HTMLElement | null;
  returnFocus?: HTMLElement | null;
  source?: "lesson" | "selection";
};

let frames: SignVisual[] = [];
let index = 0;
let timer = 0;
let paused = false;
let speed = 1;
let source: "lesson" | "selection" = "lesson";
let returnFocus: HTMLElement | null = null;
let word = "";
let userPlaced = false;

function windowNode(): HTMLElement | null {
  return document.getElementById("learnable-sign-window");
}

function ensureWindow(): HTMLElement {
  const existing = windowNode();
  if (existing) return existing;
  const node = document.createElement("section");
  node.id = "learnable-sign-window";
  node.tabIndex = -1;
  node.setAttribute("role", "dialog");
  node.setAttribute("aria-label", "Computer-generated. ASL fingerspelling, not Ethiopian Sign Language.");
  node.innerHTML = `
    <style>
      #learnable-sign-window {
        position: fixed; z-index: 2147483002; width: 232px; height: 232px; max-width: calc(100vw - 1rem);
        display: flex; flex-direction: column; overflow: hidden;
        background: #f2f0ea; color: #172033; border: 2px solid #1b3048; border-radius: 0.5rem;
        box-shadow: none; font: 16px/1.2 "Atkinson Hyperlegible", "Noto Sans Ethiopic", sans-serif;
      }
      #learnable-sign-window * { box-sizing: border-box; }
      #learnable-sign-window [hidden] { display: none !important; }
      #learnable-sign-window .head { display: flex; gap: 0.25rem; padding: 0.25rem; }
      #learnable-sign-window button {
        font: inherit; min-height: 1.5rem; padding: 0 0.4rem; font-size: 0.75rem;
        background: #f2f0ea; color: #172033; border: 2px solid #1b3048; border-radius: 0.3rem; cursor: pointer;
      }
      #learnable-sign-window .signer-label {
        margin: 0 0.4rem; font-size: 0.62rem; line-height: 1.15; font-weight: 700;
      }
      #learnable-sign-window .stage {
        flex: 1 1 auto; min-height: 0; margin: 0.15rem 0.4rem; padding: 0.35rem; overflow: hidden;
        background: #f7f4ee; color: #172033; border: 2px solid #172033;
        display: grid; place-items: center;
      }
      #learnable-sign-window .stage svg { width: 100%; height: 100%; display: block; }
      #learnable-sign-window .stage { transition: opacity 180ms ease-in-out; }
      @media (prefers-reduced-motion: reduce) { #learnable-sign-window .stage { transition: none; } }
      #learnable-sign-window .signer-letter {
        margin: 0; text-align: center; font-size: 1.35rem; font-weight: 700; line-height: 1;
      }
      #learnable-sign-window .signer-note {
        flex: 0 0 auto; margin: 0 0.4rem; font-size: 0.62rem; line-height: 1.15;
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }
      #learnable-sign-window .controls {
        display: flex; flex-wrap: nowrap; gap: 0.2rem; align-items: center; padding: 0.2rem 0.3rem 0.3rem;
      }
      #learnable-sign-window label { display: flex; align-items: center; gap: 0.15rem; font-size: 0.7rem; }
      #learnable-sign-window input[type="range"] { width: 2.8rem; min-height: 0; margin: 0; }
      html[data-learnable-contrast="on"] #learnable-sign-window .stage { background: var(--la-hc-bg, #121212); color: var(--la-hc-fg, #f2f2f2); }
    </style>
    <div class="head">
      <button type="button" data-act="move" aria-label="Move the sign window. Arrow keys move it.">Move</button>
      <button type="button" data-act="close" aria-label="Close sign window">Close</button>
    </div>
    <p class="signer-label">Computer-generated. ASL fingerspelling, not Ethiopian Sign Language.</p>
    <div class="stage" data-hand-stage></div>
    <p class="signer-letter" data-signer-now></p>
    <p class="signer-note" data-signer-note hidden></p>
    <div class="controls">
      <button type="button" data-act="pause">Pause</button>
      <button type="button" data-act="replay">Replay</button>
      <label>Speed <input data-act="speed" type="range" min="0.5" max="2" step="0.25" value="1" aria-valuemin="0.5" aria-valuemax="2" aria-valuenow="1" /></label>
      <button type="button" data-act="sign-prev" hidden aria-label="Previous handshape">Previous</button>
      <button type="button" data-act="sign-next" hidden aria-label="Next handshape">Next</button>
    </div>
    <p class="sr" data-sign-live aria-live="polite" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)"></p>
  `;
  node.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const act = target.dataset.act;
    if (act === "close") closeHands(true);
    if (act === "pause") togglePause();
    if (act === "replay") replay();
    if (act === "sign-prev") step(-1);
    if (act === "sign-next") step(1);
  });
  const move = node.querySelector<HTMLButtonElement>("[data-act=move]");
  move?.addEventListener("pointerdown", (event) => drag(event));
  move?.addEventListener("keydown", (event) => moveByKey(event));
  node.querySelector<HTMLInputElement>("[data-act=speed]")?.addEventListener("input", (event) => {
    const input = event.target as HTMLInputElement;
    speed = Number(input.value) || 1;
    input.setAttribute("aria-valuenow", String(speed));
    if (!paused) schedule();
  });
  node.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    event.preventDefault();
    closeHands(true);
  });
  document.body.append(node);
  if (typeof ResizeObserver !== "undefined") {
    new ResizeObserver(() => {
      if (!userPlaced) place(node);
    }).observe(node);
  }
  return node;
}

async function loadHand(src: string): Promise<HandArt> {
  const url = resolveUrl(src);
  const cached = cache.get(url);
  if (cached) return cached;
  const response = await fetch(url);
  if (!response.ok) throw new Error(String(response.status));
  const text = await response.text();
  const viewBox = text.match(/viewBox="([^"]+)"/)?.[1] || "0 0 100 100";
  const d = text.match(/<path\b[^>]*\sd="([^"]+)"/)?.[1] || "";
  const stroke = text.match(/stroke-width="([^"]+)"/)?.[1] || "8";
  const art = { viewBox, d, stroke };
  cache.set(url, art);
  return art;
}

function drawHand(stage: HTMLElement, art: HandArt, alt: string): void {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", art.viewBox);
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", alt);
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", art.d);
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", "currentColor");
  path.setAttribute("stroke-width", art.stroke);
  path.setAttribute("stroke-linejoin", "round");
  path.setAttribute("stroke-linecap", "round");
  svg.append(path);
  stage.replaceChildren(svg);
}

async function paint(): Promise<void> {
  const node = windowNode();
  if (!node) return;
  const frame = frames[index];
  const stage = node.querySelector<HTMLElement>("[data-hand-stage]");
  const now = node.querySelector("[data-signer-now]");
  const reduced = motionReduced();
  node.querySelectorAll<HTMLButtonElement>("[data-act=sign-prev], [data-act=sign-next]").forEach((button) => {
    button.hidden = !reduced;
  });
  const speedLabel = node.querySelector<HTMLElement>(".controls label");
  if (speedLabel) speedLabel.hidden = reduced;
  if (!frame) {
    if (now) now.textContent = "";
    stage?.replaceChildren();
    return;
  }
  if (now) {
    now.textContent = frame.caption;
    now.setAttribute("title", word ? `${frame.caption}. ${word}` : frame.caption);
  }
  if (!stage) return;
  if (!frame.src) {
    stage.replaceChildren();
    return;
  }
  if (!reduced) stage.style.opacity = "0.35";
  try {
    drawHand(stage, await loadHand(frame.src), frame.alt);
  } catch {
    stage.replaceChildren();
  }
  stage.style.opacity = "1";
}

function schedule(): void {
  window.clearInterval(timer);
  timer = 0;
  if (paused || motionReduced() || frames.length < 2) return;
  timer = window.setInterval(() => {
    index = (index + 1) % frames.length;
    void paint();
  }, Math.round(700 / speed));
}

function togglePause(): void {
  paused = !paused;
  const button = windowNode()?.querySelector("[data-act=pause]");
  if (button) button.textContent = paused ? "Play" : "Pause";
  if (paused) window.clearInterval(timer);
  else schedule();
}

function replay(): void {
  index = 0;
  paused = false;
  const button = windowNode()?.querySelector("[data-act=pause]");
  if (button) button.textContent = "Pause";
  void paint();
  schedule();
}

function step(delta: number): void {
  if (!frames.length) return;
  index = (index + delta + frames.length) % frames.length;
  void paint();
}

function clamp(left: number, top: number, node: HTMLElement): { left: number; top: number } {
  const width = node.offsetWidth || 220;
  const height = node.offsetHeight || 280;
  return {
    left: Math.min(window.innerWidth - width - 8, Math.max(8, left)),
    top: Math.min(window.innerHeight - height - 8, Math.max(8, top)),
  };
}

function rects(nodes: Array<Element | null | undefined>): DOMRect[] {
  const found: DOMRect[] = [];
  nodes.forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    const rect = node.getBoundingClientRect();
    if (rect.width > 8 && rect.height > 8) found.push(rect);
  });
  return found;
}

function mediaRects(): DOMRect[] {
  const nodes: Array<Element | null> = [];
  document.querySelectorAll("learnable-player").forEach((player) => {
    nodes.push(player.shadowRoot?.querySelector(".stage") || null);
    nodes.push(player.shadowRoot?.querySelector(".caption") || null);
    nodes.push(player.shadowRoot?.querySelector("video") || null);
    player.shadowRoot?.querySelectorAll("[data-act=play], [data-act=captions], [data-act=ad], [data-act=sign]").forEach((control) => nodes.push(control));
  });
  return rects(nodes);
}

function launcherRect(): DOMRect | null {
  const launcher = document.querySelector("learnable-toolbar")?.shadowRoot?.querySelector("[data-act=launcher]");
  return launcher instanceof HTMLElement ? rects([launcher])[0] || null : null;
}

function navRects(): DOMRect[] {
  return rects([...document.querySelectorAll("nav a, aside a, [class*=sidebar] a")]);
}

function overlap(left: number, top: number, width: number, height: number, rect: DOMRect): number {
  const x = Math.max(0, Math.min(left + width, rect.right) - Math.max(left, rect.left));
  const y = Math.max(0, Math.min(top + height, rect.bottom) - Math.max(top, rect.top));
  return x * y;
}

function cover(left: number, top: number, width: number, height: number, list: DOMRect[]): number {
  return list.reduce((sum, rect) => sum + overlap(left, top, width, height, rect), 0);
}

function dockBelowPlayer(node: HTMLElement): boolean {
  if (window.innerWidth >= 520) {
    node.style.position = "fixed";
    node.style.margin = "0";
    return false;
  }
  const player = document.querySelector("learnable-player");
  node.style.position = "relative";
  node.style.left = "auto";
  node.style.top = "auto";
  node.style.margin = "0.5rem auto";
  if (player && player.nextElementSibling !== node) player.insertAdjacentElement("afterend", node);
  return true;
}

function playerRect(): DOMRect | null {
  const player = document.querySelector("learnable-player");
  return player instanceof HTMLElement ? rects([player])[0] || null : null;
}

function place(node: HTMLElement): void {
  if (userPlaced) return;
  if (dockBelowPlayer(node)) return;
  const width = node.offsetWidth || 232;
  const height = node.offsetHeight || 232;
  const launcher = launcherRect();
  const media = mediaRects();
  const nav = navRects();
  const player = playerRect();
  const spots = [
    clamp(window.innerWidth - width - 12, 12, node),
    clamp(12, 12, node),
    clamp(window.innerWidth - width - 12, window.innerHeight - height - 12, node),
    clamp(12, window.innerHeight - height - 12, node),
  ];
  if (player) {
    spots.push(clamp(player.left - width - 8, Math.max(12, player.top), node));
    spots.push(clamp(player.right + 8, Math.max(12, player.top), node));
  }
  let best = spots[0];
  let bestScore = Number.POSITIVE_INFINITY;
  spots.forEach((spot) => {
    const onLauncher = launcher ? overlap(spot.left, spot.top, width, height, launcher) : 0;
    const onMedia = cover(spot.left, spot.top, width, height, media);
    const onPlayer = player ? overlap(spot.left, spot.top, width, height, player) : 0;
    const onNav = cover(spot.left, spot.top, width, height, nav);
    const score = (onLauncher > 0 ? 1e15 : 0) + (onMedia > 0 ? 1e12 : 0) + (onPlayer > 0 ? 1e9 : 0) + (onNav > 0 ? 1e6 : 0) + onLauncher + onMedia + onPlayer + onNav;
    if (score < bestScore) {
      bestScore = score;
      best = spot;
    }
  });
  let placed = best;
  if (launcher && overlap(placed.left, placed.top, width, height, launcher) > 0) {
    placed = clamp(placed.left, launcher.top - height - 8, node);
  }
  node.style.left = `${placed.left}px`;
  node.style.top = `${placed.top}px`;
}

if (typeof window !== "undefined") {
  window.addEventListener("resize", () => {
    const node = windowNode();
    if (node) place(node);
  });
}

function drag(event: PointerEvent): void {
  if (event.button !== 0) return;
  const node = windowNode();
  const handle = event.currentTarget;
  if (!node || !(handle instanceof HTMLElement)) return;
  const origin = node.getBoundingClientRect();
  userPlaced = true;
  node.style.position = "fixed";
  node.style.margin = "0";
  node.style.left = `${origin.left}px`;
  node.style.top = `${origin.top}px`;
  const startX = event.clientX;
  const startY = event.clientY;
  const move = (next: PointerEvent) => {
    const placed = clamp(origin.left + next.clientX - startX, origin.top + next.clientY - startY, node);
    node.style.left = `${placed.left}px`;
    node.style.top = `${placed.top}px`;
  };
  const up = () => {
    handle.removeEventListener("pointermove", move);
    handle.removeEventListener("pointerup", up);
  };
  handle.setPointerCapture(event.pointerId);
  handle.addEventListener("pointermove", move);
  handle.addEventListener("pointerup", up);
}

function moveByKey(event: KeyboardEvent): void {
  if (!event.key.startsWith("Arrow")) return;
  const node = windowNode();
  if (!node) return;
  event.preventDefault();
  event.stopPropagation();
  const rect = node.getBoundingClientRect();
  const stepPx = event.shiftKey ? 40 : 16;
  const dx = event.key === "ArrowLeft" ? -stepPx : event.key === "ArrowRight" ? stepPx : 0;
  const dy = event.key === "ArrowUp" ? -stepPx : event.key === "ArrowDown" ? stepPx : 0;
  userPlaced = true;
  node.style.position = "fixed";
  node.style.margin = "0";
  const placed = clamp(rect.left + dx, rect.top + dy, node);
  node.style.left = `${placed.left}px`;
  node.style.top = `${placed.top}px`;
  const live = node.querySelector("[data-sign-live]");
  if (live) live.textContent = `Moved. ${Math.round(placed.left)} pixels from the left, ${Math.round(placed.top)} pixels from the top.`;
}

export function closeHands(restore = false): void {
  if (typeof window === "undefined") return;
  window.clearInterval(timer);
  timer = 0;
  frames = [];
  const node = windowNode();
  node?.remove();
  if (restore && returnFocus && document.contains(returnFocus)) returnFocus.focus();
  returnFocus = null;
}

export function closeSelectionHands(): void {
  if (source === "selection") closeHands(false);
}

export function presentHands(next: SignVisual[], options: HandsOptions = {}): void {
  if (typeof document === "undefined") return;
  if (!next.length) {
    if (options.source !== "selection") closeHands(false);
    return;
  }
  frames = next;
  index = 0;
  paused = false;
  source = options.source || "lesson";
  word = options.word || "";
  if (options.returnFocus) returnFocus = options.returnFocus;
  const node = ensureWindow();
  const note = node.querySelector<HTMLElement>("[data-signer-note]");
  if (note) {
    note.hidden = !options.note;
    note.textContent = options.note || "";
  }
  place(node);
  void paint().then(() => {
    if (!userPlaced) place(node);
  });
  schedule();
}

export function showSignerFrame(host: HTMLElement | null, next: SignVisual[], frameIndex: number): void {
  if (typeof document === "undefined") return;
  if (!next.length) {
    closeHands(false);
    return;
  }
  frames = next;
  index = Math.max(0, Math.min(next.length - 1, frameIndex));
  void host;
  const node = ensureWindow();
  place(node);
  void paint();
}

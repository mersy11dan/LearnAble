import { resolveUrl } from "./assets";
import { getSettings } from "./settings";
import type { SignVisual } from "./signs";

const cache = new Map<string, string>();

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
        position: fixed; z-index: 2147483002; width: 232px; max-width: calc(100vw - 1rem);
        background: #f2f0ea; color: #172033; border: 2px solid #1b3048; border-radius: 0.5rem;
        box-shadow: none; font: 16px/1.35 "Atkinson Hyperlegible", "Noto Sans Ethiopic", sans-serif;
      }
      #learnable-sign-window * { box-sizing: border-box; }
      #learnable-sign-window .head { display: flex; gap: 0.35rem; padding: 0.35rem; }
      #learnable-sign-window button, #learnable-sign-window input { font: inherit; min-height: 2.25rem; }
      #learnable-sign-window button {
        background: #f2f0ea; color: #172033; border: 2px solid #1b3048; border-radius: 0.35rem; cursor: pointer;
      }
      #learnable-sign-window .signer-label, #learnable-sign-window .signer-now, #learnable-sign-window .signer-note {
        margin: 0 0.5rem 0.3rem; font-size: 0.75rem; line-height: 1.25; overflow-wrap: anywhere;
      }
      #learnable-sign-window .signer-now { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      #learnable-sign-window .signer-label { font-weight: 700; }
      #learnable-sign-window .stage {
        width: calc(100% - 1rem); height: 132px; margin: 0 0.5rem 0.3rem; background: #f7f4ee;
        border: 2px solid #172033; display: grid; place-items: center; overflow: hidden;
      }
      #learnable-sign-window img { width: 100%; height: 100%; object-fit: contain; }
      #learnable-sign-window img.fade { transition: opacity 180ms ease-in-out; }
      #learnable-sign-window .controls { display: flex; flex-wrap: wrap; gap: 0.35rem; padding: 0.35rem 0.5rem 0.5rem; align-items: center; }
      #learnable-sign-window label { display: flex; align-items: center; gap: 0.35rem; font-size: 0.85rem; }
      @media (prefers-reduced-motion: reduce) { #learnable-sign-window img.fade { transition: none; } }
    </style>
    <div class="head">
      <button type="button" data-act="move" aria-label="Move the sign window. Arrow keys move it.">Move</button>
      <button type="button" data-act="close" aria-label="Close sign window">Close</button>
    </div>
    <p class="signer-label">Computer-generated. ASL fingerspelling, not Ethiopian Sign Language.</p>
    <div class="stage"><img alt="" data-hand /></div>
    <p class="signer-now" data-signer-now></p>
    <p class="signer-note" data-signer-note hidden></p>
    <div class="controls">
      <button type="button" data-act="pause">Pause</button>
      <button type="button" data-act="replay">Replay</button>
      <label>Speed <input data-act="speed" type="range" min="0.5" max="2" step="0.25" value="1" aria-valuemin="0.5" aria-valuemax="2" aria-valuenow="1" /></label>
      <button type="button" data-act="sign-prev" hidden>Previous handshape</button>
      <button type="button" data-act="sign-next" hidden>Next handshape</button>
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
  return node;
}

async function loadHand(src: string): Promise<string> {
  const url = resolveUrl(src);
  const cached = cache.get(url);
  if (cached) return cached;
  const response = await fetch(url);
  if (!response.ok) throw new Error(String(response.status));
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  cache.set(url, objectUrl);
  return objectUrl;
}

async function paint(): Promise<void> {
  const node = windowNode();
  if (!node) return;
  const frame = frames[index];
  const img = node.querySelector<HTMLImageElement>("[data-hand]");
  const now = node.querySelector("[data-signer-now]");
  const reduced = motionReduced();
  node.querySelectorAll<HTMLButtonElement>("[data-act=sign-prev], [data-act=sign-next]").forEach((button) => {
    button.hidden = !reduced;
  });
  if (!frame) {
    if (now) now.textContent = "";
    return;
  }
  if (img) {
    img.classList.toggle("fade", !reduced);
    img.style.opacity = "0.2";
    if (frame.src) {
      try {
        img.src = await loadHand(frame.src);
      } catch {
        img.removeAttribute("src");
      }
      img.alt = frame.alt;
    } else {
      img.removeAttribute("src");
      img.alt = frame.alt;
    }
    img.style.opacity = "1";
  }
  if (now) {
    const line = `${frame.caption}${word ? ` · ${word}` : ""}`;
    now.textContent = line;
    now.setAttribute("title", line);
  }
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

function blocks(): DOMRect[] {
  const found: DOMRect[] = [];
  const add = (node: Element | null | undefined) => {
    if (!(node instanceof HTMLElement)) return;
    const rect = node.getBoundingClientRect();
    if (rect.width > 8 && rect.height > 8) found.push(rect);
  };
  document.querySelectorAll("learnable-player").forEach((player) => {
    add(player.shadowRoot?.querySelector(".stage"));
    add(player.shadowRoot?.querySelector(".caption"));
    add(player.shadowRoot?.querySelector("video"));
  });
  document.querySelectorAll("nav a, aside a, [class*=sidebar] a, [class*=nav] a").forEach((link) => add(link));
  return found;
}

function overlap(left: number, top: number, width: number, height: number, rect: DOMRect): number {
  const x = Math.max(0, Math.min(left + width, rect.right) - Math.max(left, rect.left));
  const y = Math.max(0, Math.min(top + height, rect.bottom) - Math.max(top, rect.top));
  return x * y;
}

function place(node: HTMLElement): void {
  if (userPlaced) return;
  const width = node.offsetWidth || 232;
  const height = node.offsetHeight || 280;
  const spots = [
    { left: window.innerWidth - width - 12, top: 12 },
    { left: 12, top: 12 },
    { left: window.innerWidth - width - 12, top: window.innerHeight - height - 12 },
    { left: 12, top: window.innerHeight - height - 12 },
  ];
  const obstacles = blocks();
  let best = spots[2];
  let bestScore = Number.POSITIVE_INFINITY;
  spots.forEach((spot) => {
    const score = obstacles.reduce((sum, rect) => sum + overlap(spot.left, spot.top, width, height, rect), 0);
    if (score < bestScore) {
      bestScore = score;
      best = spot;
    }
  });
  const placed = clamp(best.left, best.top, node);
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
  userPlaced = true;
  const origin = node.getBoundingClientRect();
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
  void paint();
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

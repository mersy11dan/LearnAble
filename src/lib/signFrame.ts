export const NUDGE_PX = 20;
export const NUDGE_SHIFT_PX = 80;
export const RESIZE_STEP_PX = 40;
export const MIN_SIGN_WIDTH = 12 * 16;
export const MIN_SIGN_HEIGHT = 10 * 16;

export type Frame = { x: number; y: number; width: number; height: number };
export type Bounds = { left: number; top: number; width: number; height: number };

export const DEFAULT_FRAME: Frame = { x: 16, y: 16, width: 320, height: 240 };

export const REACT_SIGN_FRAME_KEY = "learnable-sign-frame";
export const EMBED_SIGN_FRAME_KEY = "learnable-embed-sign-frame";

function clamp(value: number, min: number, max: number): number {
  if (max < min) return min;
  return Math.min(max, Math.max(min, value));
}

export function clampFrame(frame: Frame, bounds: Bounds): Frame {
  const maxWidth = Math.max(MIN_SIGN_WIDTH, bounds.width * 0.8);
  const maxHeight = Math.max(MIN_SIGN_HEIGHT, bounds.height * 0.8);
  const width = clamp(frame.width, Math.min(MIN_SIGN_WIDTH, Math.max(1, bounds.width)), maxWidth);
  const height = clamp(frame.height, Math.min(MIN_SIGN_HEIGHT, Math.max(1, bounds.height)), maxHeight);
  const x = clamp(frame.x, bounds.left, bounds.left + Math.max(0, bounds.width - width));
  const y = clamp(frame.y, bounds.top, bounds.top + Math.max(0, bounds.height - height));
  return { x, y, width, height };
}

export function nudgeFrame(frame: Frame, dx: number, dy: number, bounds: Bounds): Frame {
  return clampFrame({ ...frame, x: frame.x + dx, y: frame.y + dy }, bounds);
}

export function resizeFrame(frame: Frame, dw: number, dh: number, bounds: Bounds): Frame {
  return clampFrame({ ...frame, width: frame.width + dw, height: frame.height + dh }, bounds);
}

export function movedAnnouncement(frame: Frame): string {
  const left = Math.round(frame.x);
  const top = Math.round(frame.y);
  return `Moved. ${left} pixels from the left, ${top} pixels from the top.`;
}

export function boundsFromRect(rect: Pick<DOMRect, "left" | "top" | "width" | "height"> | null, viewport: { width: number; height: number }): Bounds {
  if (rect && rect.width >= 32 && rect.height >= 32) {
    return { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
  }
  if (viewport.width >= 32 && viewport.height >= 32) {
    return { left: 0, top: 0, width: viewport.width, height: viewport.height };
  }
  return { left: 0, top: 0, width: 1280, height: 800 };
}

export function readStoredFrame(storage: Pick<Storage, "getItem"> | null, key: string): Frame | null {
  if (!storage) return null;
  try {
    const raw = storage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Frame>;
    const values = [parsed?.x, parsed?.y, parsed?.width, parsed?.height];
    if (!values.every((value) => typeof value === "number" && Number.isFinite(value))) return null;
    return { x: parsed.x as number, y: parsed.y as number, width: parsed.width as number, height: parsed.height as number };
  } catch {
    return null;
  }
}

export function writeStoredFrame(storage: Pick<Storage, "setItem"> | null, key: string, frame: Frame): void {
  if (!storage) return;
  try {
    storage.setItem(key, JSON.stringify(frame));
  } catch {
    /* Private mode and blocked storage still leave the window movable. */
  }
}

export function mediaMatches(query: string): boolean {
  try {
    return window.matchMedia(query).matches;
  } catch {
    return false;
  }
}

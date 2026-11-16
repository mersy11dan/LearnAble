import { describe, expect, it } from "vitest";
import {
  DEFAULT_FRAME,
  MIN_SIGN_WIDTH,
  NUDGE_PX,
  NUDGE_SHIFT_PX,
  clampFrame,
  movedAnnouncement,
  nudgeFrame,
  readStoredFrame,
  resizeFrame,
  writeStoredFrame,
} from "./signFrame";

const bounds = { left: 0, top: 0, width: 1000, height: 800 };

describe("sign window frame", () => {
  it("nudges by 20 pixels and by 80 with shift, and stays inside the player", () => {
    const once = nudgeFrame(DEFAULT_FRAME, NUDGE_PX, 0, bounds);
    expect(once.x).toBe(DEFAULT_FRAME.x + 20);
    const shifted = nudgeFrame(DEFAULT_FRAME, NUDGE_SHIFT_PX, -NUDGE_SHIFT_PX, bounds);
    expect(shifted.x).toBe(DEFAULT_FRAME.x + 80);
    expect(shifted.y).toBe(0);
    const edge = nudgeFrame({ ...DEFAULT_FRAME, x: 990, y: 790 }, NUDGE_PX, NUDGE_PX, bounds);
    expect(edge.x).toBeLessThanOrEqual(bounds.width - edge.width);
    expect(edge.y).toBeLessThanOrEqual(bounds.height - edge.height);
  });

  it("keeps a minimum width and a maximum of 80 percent of the player", () => {
    const small = resizeFrame(DEFAULT_FRAME, -400, -400, bounds);
    expect(small.width).toBe(MIN_SIGN_WIDTH);
    const huge = resizeFrame(DEFAULT_FRAME, 5000, 5000, bounds);
    expect(huge.width).toBe(800);
    expect(huge.height).toBe(640);
    expect(clampFrame({ x: -20, y: -10, width: 10, height: 10 }, bounds).x).toBe(0);
  });

  it("stores the frame and survives storage that throws", () => {
    const memory = new Map<string, string>();
    const storage = {
      getItem: (key: string) => memory.get(key) ?? null,
      setItem: (key: string, value: string) => {
        memory.set(key, value);
      },
    };
    writeStoredFrame(storage, "frame", DEFAULT_FRAME);
    expect(readStoredFrame(storage, "frame")).toEqual(DEFAULT_FRAME);
    expect(readStoredFrame(storage, "missing")).toBeNull();
    expect(readStoredFrame({ getItem: () => "not-json" }, "frame")).toBeNull();
    const broken = {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {
        throw new Error("blocked");
      },
    };
    expect(readStoredFrame(broken, "frame")).toBeNull();
    expect(() => writeStoredFrame(broken, "frame", DEFAULT_FRAME)).not.toThrow();
    expect(movedAnnouncement({ x: 36.2, y: 16, width: 320, height: 240 })).toBe("Moved. 36 pixels from the left, 16 pixels from the top.");
  });
});

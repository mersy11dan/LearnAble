import { describe, expect, it } from "vitest";
import { contrastRatio, themePair } from "../lib/contrast";

describe("high contrast pairs", () => {
  it("stays at 7:1 or better and never uses pure white on pure black", () => {
    for (const mode of ["bw", "yb"] as const) {
      for (let level = 1; level <= 10; level += 1) {
        const pair = themePair(mode, level);
        expect(contrastRatio(pair.fg, pair.bg)).toBeGreaterThanOrEqual(7);
        expect(pair.fg.toLowerCase()).not.toBe("#ffffff");
        expect(pair.bg.toLowerCase()).not.toBe("#000000");
      }
    }
  });
});

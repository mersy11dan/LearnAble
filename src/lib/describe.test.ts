import { describe, expect, it } from "vitest";
import { cueToDeliver, needsExtendedDescription, scheduleDescriptions, spokenSeconds } from "./describe";

describe("description timing", () => {
  it("pauses only when the words outlast the gap", () => {
    const long = "This extended description is intentionally much longer than the short pause in the picture, so the lesson pauses until the description finishes and then continues.";
    expect(needsExtendedDescription(long, 0.2, 1)).toBe(true);
    expect(needsExtendedDescription("A phone.", 5, 1)).toBe(false);
  });

  it("keeps cues from overlapping and holds a long cue until it would finish", () => {
    const planned = scheduleDescriptions(
      [
        { start: 0.2, end: 1, text: "second" },
        { start: 0, end: 0.4, text: "one two three four five six seven eight nine ten" },
      ],
      1,
    );
    expect(planned.map((cue) => cue.text)).toEqual(["one two three four five six seven eight nine ten", "second"]);
    expect(planned[0].start).toBe(0);
    expect(planned[1].start).toBe(planned[0].holdUntil);
    expect(planned[0].holdUntil - planned[0].start).toBeCloseTo(spokenSeconds(planned[0].text), 5);
    expect(planned[0].holdUntil).toBeGreaterThan(planned[0].end);
    const first = cueToDeliver(planned, 0.1, null);
    expect(first?.text).toBe(planned[0].text);
    const lock = { text: first!.text, start: first!.start, holdUntil: first!.holdUntil };
    expect(cueToDeliver(planned, first!.holdUntil - 0.05, lock)).toBeNull();
    expect(cueToDeliver(planned, planned[1].start, lock)?.text).toBe("second");
  });
});

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { demoLesson } from "../content/lesson";
import { ethiopicCellCount, toBrf } from "../lib/braille";
import { verifyOpenBadge } from "../lib/badge";
import { gregorianToEthiopian } from "../lib/calendar";
import { certificateCode } from "../lib/certificate";
import { commandForKey } from "../lib/commands";
import { buildTaggedPdf } from "../lib/taggedPdf";
import { cueAt, parseVtt } from "../lib/vtt";
import { certificates } from "../content/certificates";

const root = resolve(process.cwd());

describe("captions", () => {
  it("parses the English WebVTT in step with the lesson", () => {
    const source = readFileSync(resolve(root, "public/media/captions-en.vtt"), "utf8");
    const cues = parseVtt(source);
    expect(cues).toHaveLength(demoLesson.segments.length);
    cues.forEach((cue, index) => {
      expect(cue.text).toBe(demoLesson.segments[index].en);
      expect(cue.start).toBeCloseTo(demoLesson.segments[index].start, 2);
    });
  });

  it("keeps the last cue when the playhead reaches the end", () => {
    const last = demoLesson.segments.at(-1);
    expect(last).toBeDefined();
    expect(cueAt(demoLesson.segments, last!.end)?.en).toBe(last?.en);
  });
});

describe("open badge and calendar", () => {
  it("verifies the published Ed25519 badge", async () => {
    expect(await verifyOpenBadge()).toBe(true);
    expect(await verifyOpenBadge("a.b.c")).toBe(false);
  });

  it("converts 15 November 2026 to the Ethiopian calendar", () => {
    expect(gregorianToEthiopian(2026, 11, 15)).toEqual({ year: 2019, month: 3, day: 6, monthName: "Hidar" });
    expect(gregorianToEthiopian(2026, 9, 11)).toEqual({ year: 2019, month: 1, day: 1, monthName: "Meskerem" });
  });
});

describe("braille", () => {
  it("writes uncontracted English Braille ASCII", () => {
    expect(toBrf("hello")).toBe("HELLO\n");
    expect(toBrf("Hello")).toBe(",HELLO\n");
    expect(toBrf("hi 2")).toBe("HI #B\n");
  });

  it("maps ሰላም with the Ethiopic table and no missing cells", () => {
    expect(ethiopicCellCount()).toBeGreaterThan(200);
    const brf = toBrf("ሰላም");
    expect(brf).not.toContain("?");
    expect(brf.trim()).toHaveLength(5);
  });
});

describe("certificates", () => {
  it("builds a stable check code and changes it when the name changes", async () => {
    const record = certificates[0];
    const code = await certificateCode(record);
    expect(code).toMatch(/^[0-9a-f]{12}$/);
    expect(await certificateCode(record)).toBe(code);
    expect(await certificateCode({ ...record, learner: "Someone Else" })).not.toBe(code);
  });
});

describe("tagged pdf", () => {
  it("marks the document and stores the figure alternative", () => {
    const bytes = buildTaggedPdf({
      title: "Lesson",
      paragraphs: ["A short paragraph."],
      figureAlt: "A phone with captions.",
    });
    const text = new TextDecoder().decode(bytes);
    expect(text.startsWith("%PDF-1.7")).toBe(true);
    expect(text).toContain("/MarkInfo << /Marked true >>");
    expect(text).toContain("/StructTreeRoot");
    expect(text).toContain("/Alt (A phone with captions.)");
    expect(text).toContain("(Lesson)");
    expect(text).toContain("startxref");
  });
});

describe("player shortcuts", () => {
  it("maps the lesson keys and ignores modified keys", () => {
    expect(commandForKey({ key: "c" })).toEqual({ type: "cycle-captions" });
    expect(commandForKey({ key: " ", metaKey: true })).toBeNull();
    expect(commandForKey({ key: "ArrowLeft" })).toEqual({ type: "seek", by: -5 });
    expect(commandForKey({ key: "?" })).toEqual({ type: "help" });
  });
});

describe("light pack", () => {
  it("ships audio, alt text, and both languages without the video", () => {
    const html = readFileSync(resolve(root, "public/packs/demo/index.html"), "utf8");
    expect(html).toContain('src="lesson-en.wav"');
    expect(html).toContain('src="lesson-am.wav"');
    expect(html).toContain(demoLesson.figure.alt);
    expect(html).toContain("lang=\"am\"");
    expect(html).not.toContain(".mp4");
  });
});

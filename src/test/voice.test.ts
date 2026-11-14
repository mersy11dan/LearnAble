import { afterEach, describe, expect, it } from "vitest";
import { needsExtendedDescription } from "../lib/describe";
import { imageDescription } from "../embed/images";
import { utteranceFor } from "../embed/focus-speech";
import { matchesChord, typingTarget } from "../embed/shortcuts";
import { configure, getSettings, resetSettings, updateSettings } from "../embed/settings";

describe("spoken focus", () => {
  it("names a pressed button and an Amharic paragraph", () => {
    document.body.innerHTML = `<button aria-pressed="true">LearnAble voice</button><p lang="am">የንዑስ ጽሑፍ አጋር</p>`;
    const button = utteranceFor(document.querySelector("button")!);
    expect(button?.lang).toBe("en");
    expect(button?.text).toContain("Button");
    expect(button?.text).toContain("LearnAble voice");
    expect(button?.text).toContain("pressed");
    const paragraph = utteranceFor(document.querySelector("p")!);
    expect(paragraph?.lang).toBe("am");
    expect(paragraph?.text).toContain("አንቀጽ");
    expect(paragraph?.text).toContain("የንዑስ ጽሑፍ አጋር");
  });

  it("does not describe a decorative image", () => {
    const image = document.createElement("img");
    image.alt = "";
    expect(imageDescription(image)).toBeNull();
    image.removeAttribute("alt");
    image.setAttribute("role", "presentation");
    expect(imageDescription(image)).toBeNull();
  });
});

describe("extended description", () => {
  it("pauses only when the words outlast the gap", () => {
    const long = "This extended description is intentionally much longer than the short pause in the picture, so the lesson pauses until the description finishes and then continues.";
    expect(needsExtendedDescription(long, 0.2, 1)).toBe(true);
    expect(needsExtendedDescription("A phone.", 5, 1)).toBe(false);
  });
});

describe("shortcuts", () => {
  it("matches Alt+Shift+S and ignores a letter in a field", () => {
    const chord = new KeyboardEvent("keydown", { key: "s", altKey: true, shiftKey: true });
    expect(matchesChord(chord, "Alt+Shift+S")).toBe(true);
    expect(matchesChord(new KeyboardEvent("keydown", { key: "s" }), "Alt+Shift+S")).toBe(false);
    const input = document.createElement("input");
    document.body.append(input);
    let typing = false;
    input.addEventListener("keydown", (event) => {
      typing = typingTarget(event);
    });
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "h", bubbles: true }));
    expect(typing).toBe(true);
  });
});

describe("voice default", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("lets the host default lose to a saved choice", () => {
    resetSettings();
    configure({ voice: "off" });
    expect(getSettings().voice).toBe(false);
    expect(getSettings().audioDescription).toBe(false);
    updateSettings({ voice: true, voiceChosen: true, audioDescription: true });
    configure({ voice: "off" });
    expect(getSettings().voice).toBe(true);
    expect(getSettings().voiceChosen).toBe(true);
  });
});

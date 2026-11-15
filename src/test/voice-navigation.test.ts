import { describe, expect, it } from "vitest";
import { HELP_REPLY, interpretGuideCommand } from "../utils/voiceNavigation";

describe("voice navigation", () => {
  it("opens sessions from a spoken page name", () => {
    const result = interpretGuideCommand("go to sessions", "/");
    expect(result.kind).toBe("navigate");
    if (result.kind === "navigate") {
      expect(result.path).toBe("/sessions/studio");
      expect(result.reply).toMatch(/Recorded session/);
    }
  });

  it("opens jobs", () => {
    const result = interpretGuideCommand("jobs", "/");
    expect(result.kind).toBe("navigate");
    if (result.kind === "navigate") {
      expect(result.path).toBe("/careers");
    }
  });

  it("does not repeat the intro on hello", () => {
    const result = interpretGuideCommand("hello", "/");
    expect(result.kind).toBe("stay");
    if (result.kind === "stay") {
      expect(result.reply).not.toMatch(/You can ask me about/);
      expect(result.reply).toMatch(/Home/);
    }
  });

  it("leaves how-questions to chat", () => {
    expect(interpretGuideCommand("how do I use captions?", "/").kind).toBe("chat");
  });

  it("answers help", () => {
    expect(interpretGuideCommand("what can I say", "/")).toEqual({ kind: "stay", reply: HELP_REPLY });
  });
});

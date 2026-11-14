import { afterEach, describe, expect, it, vi } from "vitest";
import { LearnAblePlayer } from "./player";
import { ASL_GLOSS_LABEL, AMHARIC_GLOSS_NOTE, lookupToken, normalizeToken, resetSignDictionary, setSignDictionary, signPanel } from "./signs";

if (!customElements.get("learnable-player")) customElements.define("learnable-player", LearnAblePlayer);

afterEach(() => {
  resetSignDictionary();
  document.body.innerHTML = "";
  vi.unstubAllGlobals();
});

describe("ASL gloss panel", () => {
  it("uses the hand-corrected line for lookup and keeps the model line", () => {
    const panel = signPanel("Hana opens her lesson on a phone in Addis Ababa.", "en");
    expect(panel.source).toBe("precomputed");
    expect(panel.gloss).toBe("fs-ADDIS fs-ABABA, HANA IX-3 PHONE LESSON OPEN");
    expect(panel.model).toContain("ADDUS ABRAHAM");
    expect(panel.note).toContain("Corrected by hand");
    expect(panel.spell).toContain("A D D I S");
    expect(panel.spell).toContain("H A N A");
    expect(panel.spell).toContain("O P E N");
    expect(panel.spell).not.toContain("A B R A H A M");
  });

  it("strips X- and DESC- before the dictionary lookup", () => {
    expect(normalizeToken("DESC-OPEN")).toBe("OPEN");
    expect(normalizeToken("X-SHE")).toBe("SHE");
    setSignDictionary([{ gloss: "OPEN", clip: "/media/signs/open.mp4" }]);
    expect(lookupToken("DESC-OPEN").clip).toBe("/media/signs/open.mp4");
    expect(lookupToken("fs-ADDIS").letters).toEqual(["A", "D", "D", "I", "S"]);
    expect(lookupToken("IX-3").letters).toEqual([]);
    const panel = signPanel("Hana opens her lesson on a phone in Addis Ababa.", "en");
    expect(panel.clip).toBe("/media/signs/open.mp4");
    expect(panel.spell).not.toContain("O P E N");
    expect(panel.spell).toContain("A D D I S");
  });

  it("does not gloss Amharic", () => {
    const panel = signPanel("ሃና ትምህርቷን በአዲስ አበባ በስልኳ ትከፍታለች።", "am");
    expect(panel.gloss).toBe("");
    expect(panel.note).toBe(AMHARIC_GLOSS_NOTE);
    expect(panel.source).toBe("amharic");
  });

  it("shows the gloss and the ASL label in the sign panel", async () => {
    const english = "WEBVTT\n\n00:00:00.000 --> 00:00:05.000\nHana opens her lesson on a phone in Addis Ababa.\n";
    const amharic = "WEBVTT\n\n00:00:00.000 --> 00:00:05.000\nሃና ትምህርቷን በአዲስ አበባ በስልኳ ትከፍታለች።\n";
    vi.stubGlobal("fetch", async (url: string) => new Response(String(url).includes("am") ? amharic : english, { status: 200 }));
    const player = document.createElement("learnable-player");
    player.setAttribute("src", "/media/lesson-en.mp4");
    player.setAttribute("captions-en", "/media/captions-en.vtt");
    player.setAttribute("captions-am", "/media/captions-am.vtt");
    document.body.append(player);
    await vi.waitFor(() => {
      expect(player.shadowRoot?.querySelector("[data-gloss-corrected]")?.textContent).toContain("fs-ADDIS");
    });
    expect(player.shadowRoot?.querySelector("[data-corrected-term]")?.textContent).toBe("Corrected by hand");
    expect(player.shadowRoot?.querySelector("[data-model-term]")?.textContent).toBe("Model output (Suyash2205/signbridge-t5-base-asl-gloss)");
    expect(player.shadowRoot?.querySelector("[data-gloss-model]")?.textContent).toContain("ADDUS ABRAHAM");
    expect(player.shadowRoot?.querySelector("h2")?.textContent).toBe(ASL_GLOSS_LABEL);
    player.shadowRoot?.querySelector<HTMLButtonElement>("[data-act=captions]")?.click();
    expect(player.shadowRoot?.querySelector("[data-gloss-corrected]")?.textContent).toBe("");
    expect(player.shadowRoot?.querySelector("[data-gloss-lines]")?.hasAttribute("hidden")).toBe(true);
    expect(player.shadowRoot?.querySelector("[data-sign-note]")?.textContent).toBe(AMHARIC_GLOSS_NOTE);
  });
});

import { afterEach, describe, expect, it } from "vitest";
import { LearnAblePlayer } from "./player";

if (!customElements.get("learnable-player")) customElements.define("learnable-player", LearnAblePlayer);

afterEach(() => {
  document.body.innerHTML = "";
});

describe("sign window keyboard controls", () => {
  it("moves and resizes from the keyboard and announces the position once", () => {
    const player = document.createElement("learnable-player") as LearnAblePlayer;
    player.setAttribute("src", "/media/lesson-en.mp4");
    player.setAttribute("sign", "/media/esl-placeholder.mp4");
    document.body.append(player);
    const root = player.shadowRoot;
    const move = root?.querySelector<HTMLButtonElement>("[data-act=move]");
    const sign = root?.querySelector<HTMLElement>(".sign");
    expect(move).toBeTruthy();
    expect(root?.querySelector("[data-sign-notice]")?.textContent).toContain("No Ethiopian Sign Language recording");
    expect(root?.querySelector("[data-sign-label]")?.textContent).toBe("Placeholder, not a sign language recording");
    expect(root?.querySelector("[data-sign-heading]")?.textContent).toBe("ASL");
    expect(root?.querySelector("[data-sign-video]")?.hasAttribute("src")).toBe(false);

    move?.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    expect(move?.getAttribute("aria-pressed")).toBe("true");
    move?.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    expect(root?.querySelector("[data-sign-moved]")?.textContent).toBe("");
    expect(sign?.style.left || "").toBe("");
    move?.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", shiftKey: true, bubbles: true }));
    move?.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    expect(move?.getAttribute("aria-pressed")).toBe("false");
    expect(root?.querySelector("[data-sign-moved]")?.textContent).toContain("Moved. 116 pixels from the left");

    const row = root?.querySelector<HTMLElement>(".media-row");
    root?.querySelector<HTMLButtonElement>("[data-act=shrink]")?.click();
    expect(row?.style.getPropertyValue("--sign-col")).toBe("14rem");
    root?.querySelector<HTMLButtonElement>("[data-act=reset]")?.click();
    expect(row?.style.getPropertyValue("--sign-col")).toBe("16rem");
    expect(sign?.style.left || "").toBe("");
    expect(sign?.style.height || "").toBe("");
  });

  it("uses Ethiopian Sign Language as the heading only when the clip is declared and ready", () => {
    const player = document.createElement("learnable-player") as LearnAblePlayer;
    player.setAttribute("sign", "/media/esl/lesson-1.mp4");
    player.setAttribute("sign-lang", "ethiopian");
    player.setAttribute("sign-offset", "1.5");
    document.body.append(player);
    const video = player.shadowRoot?.querySelector<HTMLVideoElement>("[data-sign-video]");
    expect(video?.getAttribute("src")).toContain("/media/esl/lesson-1.mp4");
    expect(player.shadowRoot?.querySelector("[data-sign-heading]")?.textContent).toBe("ASL");
    video?.dispatchEvent(new Event("loadeddata"));
    expect(player.shadowRoot?.querySelector("[data-sign-heading]")?.textContent).toBe("Ethiopian Sign Language");
    video?.dispatchEvent(new Event("error"));
    expect(player.shadowRoot?.querySelector("[data-sign-heading]")?.textContent).toBe("ASL");
    expect(player.shadowRoot?.querySelector("[data-sign-notice]")?.textContent).toContain("No Ethiopian Sign Language recording");
  });
});

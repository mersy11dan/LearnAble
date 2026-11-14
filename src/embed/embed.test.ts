import { afterEach, describe, expect, it } from "vitest";
import LearnAble, { init, reset } from "./index";

afterEach(() => {
  document.body.innerHTML = "";
  reset();
  document.querySelectorAll("learnable-toolbar, learnable-player").forEach((node) => node.remove());
});

describe("LearnAble embed", () => {
  it("registers the custom elements and the global API", () => {
    expect(customElements.get("learnable-player")).toBeTruthy();
    expect(customElements.get("learnable-toolbar")).toBeTruthy();
    expect(window.LearnAble?.version).toBe("0.2.0");
    expect(LearnAble.init).toBe(init);
  });

  it("renders a player from attributes and keeps settings", () => {
    const player = document.createElement("learnable-player");
    player.setAttribute("src", "/media/lesson-en.mp4");
    player.setAttribute("captions-en", "/media/captions-en.vtt");
    player.setAttribute("captions-am", "/media/captions-am.vtt");
    player.setAttribute("offline", "");
    player.setAttribute("braille", "");
    document.body.append(player);
    const shadow = player.shadowRoot;
    expect(shadow?.querySelector("video")).toBeTruthy();
    expect(shadow?.querySelector("[data-act=pack]")).toBeTruthy();
    expect(shadow?.querySelector("[data-act=braille]")).toBeTruthy();
    init({ lang: "am", features: { toolbar: false, offlinePack: false } });
    expect(window.LearnAble?.getSettings().lang).toBe("am");
    expect(document.getElementById("learnable-host-adjust")).toBeTruthy();
    window.LearnAble?.setSettings({ largeText: true });
    expect(document.documentElement.dataset.learnableText).toBe("large");
    const saved = JSON.parse(localStorage.getItem("learnable-widget") || "{}") as { largeText?: boolean };
    expect(saved.largeText).toBe(true);
  });

  it("does not mount a toolbar when the host turns it off", () => {
    init({ features: { toolbar: false } });
    expect(document.querySelector("learnable-toolbar")).toBeNull();
  });
});

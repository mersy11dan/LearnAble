import { afterEach, describe, expect, it } from "vitest";
import { rememberScript, resetAssetBase, resolveUrl } from "./assets";

afterEach(() => {
  resetAssetBase();
  document.head.querySelector("base")?.remove();
});

describe("plug-in asset URLs", () => {
  it("ignores a foreign base href and uses the script origin", () => {
    const base = document.createElement("base");
    base.href = "https://en.wikipedia.org/wiki/Ada_Lovelace";
    document.head.append(base);
    const script = document.createElement("script");
    script.src = "http://127.0.0.1:4185/learnable/learnable.js";
    rememberScript(script);
    expect(document.baseURI).toContain("wikipedia.org");
    for (const path of [
      "/fonts/atkinson-latin-400.woff2",
      "/fonts/NotoSansEthiopic-Regular.ttf",
      "/learnable/espeak/speak.js",
      "/media/lesson-en.mp4",
      "/signs/dictionary.json",
    ]) {
      const url = new URL(resolveUrl(path));
      expect(url.origin).toBe("http://127.0.0.1:4185");
      expect(url.pathname).toBe(path);
    }
  });
});

import { resolveUrl } from "./assets";

type EspeakModule = {
  speak?: (text: string, lang: string, rate: number) => Promise<void> | void;
  default?: { speak?: (text: string, lang: string, rate: number) => Promise<void> | void };
};

/**
 * Optional GPL-3.0 eSpeak NG build. It is not part of the MIT bundle.
 * A host can place speak.js at /learnable/espeak/speak.js. See NOTICE.md.
 */
export async function speakWithEspeak(text: string, lang: string, rate: number): Promise<boolean> {
  try {
    const url = resolveUrl("/learnable/espeak/speak.js");
    const loaded = (await import(/* @vite-ignore */ url)) as EspeakModule;
    const speak = loaded.speak || loaded.default?.speak;
    if (typeof speak !== "function") return false;
    await speak(text, lang, rate);
    return true;
  } catch {
    return false;
  }
}

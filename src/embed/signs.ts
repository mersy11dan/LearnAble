import shipped from "../content/asl-gloss.json";
import dictionary from "../content/signs.json";

export const ASL_GLOSS_LABEL = "ASL gloss (English → ASL), not Ethiopian Sign Language";
export const AMHARIC_GLOSS_NOTE = "Amharic captions are not turned into ASL gloss.";
export const GLOSS_MODEL = shipped.model;

export type SignEntry = { match?: string; gloss: string; clip: string | null };
export type CaptionMode = "en" | "am" | "off";
export type GlossSource = "precomputed" | "amharic" | "off" | "offline";

export type SignPanel = {
  gloss: string;
  note: string;
  spell: string;
  clip: string | null;
  source: GlossSource;
};

const shippedEntries = dictionary.signs as SignEntry[];
let entries: SignEntry[] = shippedEntries;

export function setSignDictionary(next: SignEntry[]): void {
  entries = next.map((entry) => ({ match: entry.match, gloss: entry.gloss, clip: entry.clip ?? null }));
  window.dispatchEvent(new CustomEvent("learnable-settings"));
}

export function resetSignDictionary(): void {
  entries = shippedEntries;
}

export function fingerspell(gloss: string): string[] {
  return [...gloss.toUpperCase()].filter((letter) => /[A-Z]/.test(letter));
}

export function glossTokens(gloss: string): string[] {
  return gloss
    .split(/\s+/)
    .map((part) => part.replace(/^[,.:;]+|[,.:;]+$/g, ""))
    .filter((part) => part.length > 0 && !/^[,.:;]+$/.test(part));
}

export function normalizeToken(token: string): string {
  return token.replace(/^(?:X-|DESC-)+/i, "").replace(/[^A-Za-z]/g, "").toUpperCase();
}

export function lookupToken(token: string): { token: string; key: string; clip: string | null; letters: string[] } {
  const key = normalizeToken(token);
  const found = entries.find((entry) => entry.gloss.toUpperCase() === key);
  const clip = found?.clip ?? null;
  return { token, key, clip, letters: clip || !key ? [] : fingerspell(key) };
}

export function precomputedGloss(text: string): string | null {
  const cleaned = text.trim();
  const cue = shipped.cues.find((item) => item.en.trim() === cleaned);
  return cue?.gloss ?? null;
}

function spellLine(gloss: string): { spell: string; clip: string | null } {
  const parts = glossTokens(gloss).map(lookupToken);
  const clip = parts.find((part) => part.clip)?.clip ?? null;
  const missing = parts.filter((part) => !part.clip && part.letters.length);
  if (!missing.length) return { spell: clip ? "A clip is available for a gloss token." : "", clip };
  return {
    spell: `Fingerspelling placeholder: ${missing.map((part) => part.letters.join(" ")).join(" · ")}`,
    clip,
  };
}

export function signPanel(text: string, mode: CaptionMode): SignPanel {
  if (mode === "am") {
    return { gloss: "", note: AMHARIC_GLOSS_NOTE, spell: "", clip: null, source: "amharic" };
  }
  if (mode === "off" || !text.trim()) {
    return { gloss: "", note: "ASL gloss is shown with English captions.", spell: "", clip: null, source: "off" };
  }
  const known = precomputedGloss(text);
  if (known) {
    const rendered = spellLine(known);
    return {
      gloss: known,
      note: `Precomputed by ${GLOSS_MODEL}. This keeps English word order. It is not a recorded signer.`,
      spell: rendered.spell,
      clip: rendered.clip,
      source: "precomputed",
    };
  }
  const words = text.replace(/[^A-Za-z]/g, " ").trim().split(/\s+/).filter(Boolean);
  const gloss = words.map((word) => word.toUpperCase()).join(" ");
  const rendered = spellLine(gloss);
  return {
    gloss,
    note: "This caption has no shipped gloss, and the model is not running. These are the English words, not model output.",
    spell: rendered.spell,
    clip: rendered.clip,
    source: "offline",
  };
}

export function lookupSign(text: string): { gloss: string; clip: string | null; placeholder: true } {
  const panel = signPanel(text, "en");
  return { gloss: panel.gloss || "SIGN", clip: panel.clip, placeholder: true };
}

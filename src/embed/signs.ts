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
  model: string;
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
  const raw = token.replace(/^[,.:;]+|[,.:;]+$/g, "");
  if (/^fs-/i.test(raw)) {
    const key = raw.replace(/^fs-/i, "").replace(/[^A-Za-z]/g, "").toUpperCase();
    return { token, key, clip: null, letters: fingerspell(key) };
  }
  if (/^IX(?:-\d+)?$/i.test(raw)) {
    return { token, key: raw.toUpperCase(), clip: null, letters: [] };
  }
  const key = normalizeToken(raw);
  const found = entries.find((entry) => entry.gloss.toUpperCase() === key);
  const clip = found?.clip ?? null;
  return { token, key, clip, letters: clip || !key ? [] : fingerspell(key) };
}

export function precomputedGloss(text: string): { model: string; corrected: string } | null {
  const cleaned = text.trim();
  const cue = shipped.cues.find((item) => item.en.trim() === cleaned);
  if (!cue?.gloss) return null;
  const corrected = "corrected" in cue && typeof cue.corrected === "string" ? cue.corrected : cue.gloss;
  return { model: cue.gloss, corrected };
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

const emptyPanel = (note: string, source: GlossSource): SignPanel => ({
  gloss: "",
  model: "",
  note,
  spell: "",
  clip: null,
  source,
});

export function signPanel(text: string, mode: CaptionMode): SignPanel {
  if (mode === "am") return emptyPanel(AMHARIC_GLOSS_NOTE, "amharic");
  if (mode === "off" || !text.trim()) return emptyPanel("ASL gloss is shown with English captions.", "off");
  const known = precomputedGloss(text);
  if (known) {
    const rendered = spellLine(known.corrected);
    return {
      gloss: known.corrected,
      model: known.model,
      note: "Corrected by hand for this demo. A Deaf ASL signer should review it. This is ASL, not Ethiopian Sign Language, and not a recorded signer.",
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
    model: "",
    note: "This caption has no shipped gloss, and the model is not running. These are the English words, not model output.",
    spell: rendered.spell,
    clip: rendered.clip,
    source: "offline",
  };
}

export type SignVisual = {
  src: string | null;
  alt: string;
  caption: string;
  kind: "fingerspell" | "point";
};

const FINGERSPELL_DIR = "/signs/fingerspell";

export function visualsFor(gloss: string): SignVisual[] {
  const frames: SignVisual[] = [];
  for (const token of glossTokens(gloss)) {
    if (/^fs-/i.test(token)) {
      const word = token.replace(/^fs-/i, "").replace(/[^A-Za-z]/g, "").toUpperCase();
      for (const letter of word) frames.push(letterFrame(letter));
      continue;
    }
    if (/^IX(?:-\d+)?$/i.test(token)) {
      frames.push({ src: null, alt: "ASL point, no picture shipped", caption: token.toUpperCase(), kind: "point" });
      continue;
    }
    const key = normalizeToken(token);
    for (const letter of key) frames.push(letterFrame(letter));
  }
  return frames;
}

function letterFrame(letter: string): SignVisual {
  return {
    src: `${FINGERSPELL_DIR}/${letter}.svg`,
    alt: `ASL fingerspelling: ${letter}`,
    caption: letter,
    kind: "fingerspell",
  };
}

export function signSummary(frames: SignVisual[]): string {
  if (!frames.length) return "";
  const letters = frames.filter((frame) => frame.kind === "fingerspell").map((frame) => frame.caption);
  const points = frames.filter((frame) => frame.kind === "point").map((frame) => frame.caption);
  const parts = ["ASL. Fingerspelled."];
  if (letters.length) parts.push(letters.join(" "));
  if (points.length) parts.push(points.join(" "));
  return parts.join(" ");
}

export function lookupSign(text: string): { gloss: string; clip: string | null; placeholder: true } {
  const panel = signPanel(text, "en");
  return { gloss: panel.gloss || "SIGN", clip: panel.clip, placeholder: true };
}

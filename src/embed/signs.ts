import dictionary from "../content/signs.json";

export type SignEntry = { match: string; gloss: string; clip: string | null };

export function lookupSign(text: string): { gloss: string; clip: string | null; placeholder: true } {
  const found = (dictionary.signs as SignEntry[]).find((entry) => text.toLowerCase().includes(entry.match.toLowerCase()));
  if (found) return { gloss: found.gloss, clip: found.clip, placeholder: true };
  const word = text.replace(/[^A-Za-z\u1200-\u137F]/g, " ").trim().split(/\s+/)[0] || "SIGN";
  return { gloss: word.slice(0, 12).toUpperCase(), clip: null, placeholder: true };
}

export function fingerspell(gloss: string): string[] {
  return [...gloss.toUpperCase()].filter((letter) => /[A-Z]/.test(letter));
}

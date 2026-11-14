import { zipSync } from "fflate";
import { toBrf } from "./braille";

const PACK_FILES = [
  "index.html",
  "lesson-en.wav",
  "lesson-am.wav",
  "captions-en.vtt",
  "captions-am.vtt",
  "descriptions.vtt",
  "lesson-figure.svg",
  "lesson.pdf",
];

export async function buildOfflinePack(english: string, amharic: string): Promise<Uint8Array> {
  const entries: Record<string, Uint8Array> = {};
  for (const name of PACK_FILES) {
    const response = await fetch(`/packs/demo/${name}`);
    if (!response.ok) {
      throw new Error(`The light pack is missing ${name}.`);
    }
    entries[name] = new Uint8Array(await response.arrayBuffer());
  }
  entries["transcript-en.brf"] = new TextEncoder().encode(toBrf(english));
  entries["transcript-am.brf"] = new TextEncoder().encode(toBrf(amharic));
  return zipSync(entries);
}

export function saveFile(data: Uint8Array, filename: string, type: string): void {
  const blob = new Blob([Uint8Array.from(data)], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

import { zipSync } from "fflate";
import { toBrf } from "./braille";
import { escapeHtml, safeFetch } from "./guard";

const PACK_FILES = [
  "index.html",
  "lesson-en.opus",
  "lesson-en.m4a",
  "lesson-am.opus",
  "lesson-am.m4a",
  "captions-en.vtt",
  "captions-am.vtt",
  "descriptions.vtt",
  "descriptions-am.vtt",
  "lesson-figure.svg",
  "lesson.pdf",
];

export async function buildOfflinePack(english: string, amharic: string): Promise<Uint8Array> {
  const entries: Record<string, Uint8Array> = {};
  for (const name of PACK_FILES) {
    const response = await safeFetch(`/packs/demo/${name}`);
    if (!response.ok) {
      throw new Error(`The light pack is missing ${name}.`);
    }
    entries[name] = new Uint8Array(await response.arrayBuffer());
  }
  entries["transcript-en.brf"] = new TextEncoder().encode(toBrf(english));
  entries["transcript-am.brf"] = new TextEncoder().encode(toBrf(amharic));
  return zipSync(entries);
}

const FIGURE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" role="img"><title>A navy phone on a paper background, with an English and Amharic caption under the screen.</title><rect width="640" height="480" fill="#f2f0ea"/><rect x="230" y="40" width="180" height="320" rx="28" fill="#ffffff" stroke="#1b3048" stroke-width="8"/><rect x="254" y="72" width="132" height="210" rx="6" fill="#f2f0ea" stroke="#1b3048" stroke-width="3"/><rect x="120" y="390" width="400" height="36" fill="#111111"/><rect x="140" y="400" width="160" height="8" fill="#ffee00"/></svg>`;

const FIGURE_ALT = "A navy phone on a paper background, with an English and Amharic caption under the screen.";

export type ClientPack = {
  english: string;
  amharic: string;
  descriptions?: string;
  audioEn?: string;
  audioAm?: string;
};

const AUDIO_TYPES: Record<string, string> = {
  opus: "audio/ogg; codecs=opus",
  m4a: "audio/mp4",
  mp3: "audio/mpeg",
  wav: "audio/wav",
};

function audioName(url: string | undefined, lang: "en" | "am"): string {
  const leaf = (url || "").split("?")[0].split("/").pop() || "";
  const match = /\.(opus|m4a|mp3|wav)$/i.exec(leaf);
  return `lesson-${lang}.${match ? match[1].toLowerCase() : "m4a"}`;
}

function audioElement(names: string[], missingNote: boolean): string {
  if (!names.length) return missingNote ? `<p>The narration file was not on this host.</p>` : "";
  const sources = names
    .map((name) => {
      const ext = name.split(".").pop() || "";
      return `<source src="${name}" type="${AUDIO_TYPES[ext] || "application/octet-stream"}">`;
    })
    .join("");
  return `<audio controls>${sources}</audio>`;
}

function packHtml(english: string, amharic: string, descriptions: string, englishAudio: string[], amharicAudio: string[]): string {
  const lines = english.split("\n").filter(Boolean);
  const amLines = amharic.split("\n").filter(Boolean);
  const sections = lines
    .map((line, index) => `<section><h2>${escapeHtml(line)}</h2>${amLines[index] ? `<p lang="am">${escapeHtml(amLines[index])}</p>` : ""}</section>`)
    .join("");
  const described = descriptions ? `<h2>Audio description</h2><p>${escapeHtml(descriptions)}</p>` : "";
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>LearnAble light lesson</title></head><body><main><h1>LearnAble light lesson</h1><p>Sound, text, and this page. The video is not in the pack.</p><figure><img src="lesson-figure.svg" alt="${escapeHtml(FIGURE_ALT)}"></figure><h2>English</h2>${audioElement(englishAudio, true)}<h2 lang="am">አማርኛ</h2>${audioElement(amharicAudio, false)}${sections}${described}</main></body></html>`;
}

async function optionalFile(url: string | undefined): Promise<Uint8Array | null> {
  if (!url) return null;
  try {
    const response = await safeFetch(url);
    if (!response.ok) return null;
    return new Uint8Array(await response.arrayBuffer());
  } catch {
    return null;
  }
}

export async function buildClientPack(input: ClientPack): Promise<{ bytes: Uint8Array; audio: boolean }> {
  const audioEn = await optionalFile(input.audioEn);
  const audioAm = await optionalFile(input.audioAm);
  const enName = audioEn ? audioName(input.audioEn, "en") : "";
  const amName = audioAm ? audioName(input.audioAm, "am") : "";
  const entries: Record<string, Uint8Array> = {
    "index.html": new TextEncoder().encode(packHtml(input.english, input.amharic, input.descriptions || "", enName ? [enName] : [], amName ? [amName] : [])),
    "lesson-figure.svg": new TextEncoder().encode(FIGURE_SVG),
    "transcript-en.brf": new TextEncoder().encode(toBrf(input.english)),
    "transcript-am.brf": new TextEncoder().encode(toBrf(input.amharic)),
  };
  if (audioEn && enName) entries[enName] = audioEn;
  if (audioAm && amName) entries[amName] = audioAm;
  return { bytes: zipSync(entries), audio: Boolean(audioEn || audioAm) };
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

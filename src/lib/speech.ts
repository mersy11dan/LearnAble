import { speakWithEspeak } from "../embed/espeak";

export type SpeakHooks = {
  rate?: number;
  pitch?: number;
  onend?: () => void;
  oncancel?: () => void;
};

type Pending = { text: string; lang: string; hooks: SpeakHooks };

let generation = 0;
let unlocked = false;
let pending: Pending | null = null;
let espeakNote = false;
let voicesPrimed = false;

export function canSpeak(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window && typeof window.speechSynthesis?.speak === "function";
}

export function markSpeechUnlocked(): void {
  unlocked = true;
  try {
    window.speechSynthesis?.resume();
  } catch {
    /* Some browsers throw until a gesture lands. */
  }
}

export function flushUnlockedSpeech(): void {
  if (!unlocked || !pending) return;
  const next = pending;
  pending = null;
  void speakNow(next.text, next.lang, next.hooks);
}

function prefix(lang: string): string {
  return lang.toLowerCase().slice(0, 2);
}

function matchingVoice(lang: string): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis?.getVoices?.() ?? [];
  return voices.find((item) => item.lang.toLowerCase().startsWith(prefix(lang)));
}

function noteEspeakMissing(lang: string): void {
  if (espeakNote) return;
  espeakNote = true;
  const live = document.getElementById("learnable-reader-live");
  if (!live) return;
  const name = prefix(lang) === "am" ? "Amharic" : lang;
  live.textContent = `No ${name} voice in this browser. The optional eSpeak file is not on this site, so this line stays on screen.`;
}

function finish(mine: number, hooks: SpeakHooks, cancelled: boolean): void {
  if (mine !== generation || cancelled) hooks.oncancel?.();
  else hooks.onend?.();
}

async function speakNow(text: string, lang: string, hooks: SpeakHooks): Promise<void> {
  const mine = ++generation;
  const rate = Math.min(2, Math.max(0.5, hooks.rate ?? 1));
  const pitch = Math.min(2, Math.max(0, hooks.pitch ?? 1));
  try {
    window.speechSynthesis?.cancel();
  } catch {
    /* ignore */
  }

  const voices = window.speechSynthesis?.getVoices?.() ?? [];
  const voice = matchingVoice(lang);
  if (!voice && voices.length > 0) {
    const spoken = await speakWithEspeak(text, lang, rate);
    if (mine !== generation) {
      hooks.oncancel?.();
      return;
    }
    if (spoken) {
      hooks.onend?.();
      return;
    }
    noteEspeakMissing(lang);
  }

  if (!canSpeak()) {
    if (!voice) noteEspeakMissing(lang);
    hooks.onend?.();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang.startsWith("am") ? "am" : lang;
  utterance.rate = rate;
  utterance.pitch = pitch;
  try {
    if (voice) utterance.voice = voice;
  } catch {
    /* A stub voice is not a SpeechSynthesisVoice. The lang is still set. */
  }
  let settled = false;
  const done = (cancelled: boolean) => {
    if (settled) return;
    settled = true;
    finish(mine, hooks, cancelled);
  };
  utterance.onend = () => done(false);
  utterance.onerror = () => done(true);
  window.speechSynthesis.speak(utterance);
}

export function speak(text: string, lang: string, rate = 1, hooks: SpeakHooks = {}): void {
  const clean = text.replace(/\s+/g, " ").trim();
  if (!clean) return;
  const next = { text: clean, lang, hooks: { ...hooks, rate: hooks.rate ?? rate } };
  if (!voicesPrimed && canSpeak()) {
    voicesPrimed = true;
    window.speechSynthesis.addEventListener?.("voiceschanged", () => {
      window.speechSynthesis.getVoices();
    });
    window.speechSynthesis.getVoices();
  }
  if (!unlocked) {
    pending = next;
    return;
  }
  pending = null;
  void speakNow(next.text, next.lang, next.hooks);
}

export function stopSpeaking(): void {
  generation += 1;
  pending = null;
  try {
    window.speechSynthesis?.cancel();
  } catch {
    /* ignore */
  }
}

import { getSettings } from "./settings";

let items: HTMLElement[] = [];
let cursor = 0;
let playing = false;
let wrapped = false;

function note(message: string): void {
  const live = document.getElementById("learnable-reader-live");
  if (live) live.textContent = message;
}

function unwrap(): void {
  document.querySelectorAll(".learnable-sentence").forEach((span) => {
    span.replaceWith(document.createTextNode(span.textContent || ""));
  });
  document.querySelectorAll(".is-current").forEach((element) => element.classList.remove("is-current"));
  wrapped = false;
  items = [];
}

function wrapSentences(root: HTMLElement): HTMLElement[] {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const texts: Text[] = [];
  while (walker.nextNode()) texts.push(walker.currentNode as Text);
  const spans: HTMLElement[] = [];
  texts.forEach((node) => {
    const parent = node.parentElement;
    if (!parent || parent.closest("script, style, learnable-player, learnable-toolbar, .learnable-gateway, .learnable-sentence")) return;
    const parts = (node.textContent || "").split(/(?<=[.!?])\s+/).filter((part) => part.trim());
    if (parts.length === 0) return;
    const fragment = document.createDocumentFragment();
    parts.forEach((part) => {
      const span = document.createElement("span");
      span.className = "learnable-sentence";
      span.textContent = part;
      fragment.append(span, document.createTextNode(" "));
      spans.push(span);
    });
    node.replaceWith(fragment);
  });
  wrapped = true;
  return spans;
}

function collect(): HTMLElement[] {
  const main = document.querySelector("main");
  if (!main) return [];
  const verbosity = getSettings().readVerbosity;
  if (verbosity === "headings") return [...main.querySelectorAll<HTMLElement>("h1, h2, h3")];
  if (verbosity === "links") return [...main.querySelectorAll<HTMLElement>("a")];
  if (!wrapped) return wrapSentences(main);
  return [...main.querySelectorAll<HTMLElement>(".learnable-sentence")];
}

function pulse(): void {
  const settings = getSettings();
  if (!settings.haptics || !("vibrate" in navigator)) return;
  navigator.vibrate?.(20);
}

function speakCurrent(): void {
  window.speechSynthesis?.cancel();
  const current = items[cursor];
  items.forEach((item) => item.classList.remove("is-current"));
  if (!current) {
    playing = false;
    note("Reading stopped.");
    return;
  }
  current.classList.add("is-current");
  current.scrollIntoView({ block: "nearest" });
  const settings = getSettings();
  const utterance = new SpeechSynthesisUtterance(current.textContent || "");
  utterance.rate = settings.readRate;
  utterance.pitch = settings.readPitch;
  utterance.lang = document.documentElement.lang || "en";
  utterance.onend = () => {
    if (!playing) return;
    cursor += 1;
    speakCurrent();
  };
  note(`Reading ${cursor + 1} of ${items.length}.`);
  pulse();
  window.speechSynthesis?.speak(utterance);
}

export function readerPlay(): void {
  if (!window.speechSynthesis) {
    note("This browser has no speech synthesis. Nothing was spoken.");
    return;
  }
  items = collect();
  if (items.length === 0) {
    note("There is no text to read in the main region.");
    return;
  }
  playing = true;
  speakCurrent();
}

export function readerPause(): void {
  playing = false;
  window.speechSynthesis?.cancel();
  note("Reading paused.");
}

export function readerStop(): void {
  playing = false;
  cursor = 0;
  window.speechSynthesis?.cancel();
  unwrap();
  note("Reading stopped. The page text is unchanged.");
}

export function readerStopIfPlaying(): void {
  if (!playing) return;
  readerStop();
}

window.addEventListener("learnable-speech-cancel", () => {
  if (!playing) return;
  playing = false;
  note("Reading paused.");
});

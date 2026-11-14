import { flushUnlockedSpeech, markSpeechUnlocked, speak, stopSpeaking } from "../lib/speech";
import { utteranceFor } from "./focus-speech";
import { readerStopIfPlaying } from "./reader";
import { getSettings, updateSettings, type ShortcutMap } from "./settings";
import { inPlayer, matchesChar, matchesChord, typingTarget } from "./shortcuts";

const PROMPT_ID = "learnable-voice-prompt";
const HELP_ID = "learnable-help";

let started = false;
let keyboardUntil = 0;
let helpOpener: HTMLElement | null = null;

export function announce(message: string): void {
  const live = document.getElementById("learnable-reader-live");
  if (!live) return;
  live.textContent = "";
  live.textContent = message;
}

function focusVoiceButton(): void {
  const button = document.querySelector("learnable-toolbar")?.shadowRoot?.querySelector<HTMLElement>("[data-act=voice]");
  button?.focus();
}

function trapTab(dialog: HTMLElement, event: KeyboardEvent): void {
  if (event.key !== "Tab") return;
  const items = [...dialog.querySelectorAll<HTMLElement>("button, a[href], input, select, textarea")].filter((item) => !item.hasAttribute("disabled"));
  if (items.length === 0) return;
  const first = items[0];
  const last = items[items.length - 1];
  const active = dialog.contains(document.activeElement) ? document.activeElement : null;
  if (event.shiftKey && (active === first || !active)) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
}

export function setVoice(on: boolean, source: "prompt" | "toggle"): void {
  updateSettings({
    voice: on,
    voiceChosen: true,
    ...(source === "prompt" ? { audioDescription: on } : {}),
  });
  document.getElementById(PROMPT_ID)?.remove();
  announce(on ? "LearnAble voice on." : "LearnAble voice off.");
  if (on) speak("LearnAble voice on.", "en", getSettings().readRate);
  else stopSpeaking();
  if (source === "prompt") {
    keyboardUntil = 0;
    focusVoiceButton();
  }
}

function openPrompt(): void {
  if (getSettings().voiceChosen || document.getElementById(PROMPT_ID) || !document.body) return;
  const dialog = document.createElement("div");
  dialog.id = PROMPT_ID;
  dialog.className = "learnable-dialog";
  dialog.tabIndex = -1;
  dialog.setAttribute("role", "alertdialog");
  dialog.setAttribute("aria-modal", "true");
  dialog.setAttribute("aria-labelledby", "learnable-voice-title");
  dialog.setAttribute("aria-describedby", "learnable-voice-desc");
  dialog.innerHTML = `
    <h2 id="learnable-voice-title">LearnAble voice</h2>
    <p id="learnable-voice-desc">LearnAble can speak the control, heading, or picture you move to. If you already use a screen reader, turn this voice off so the two do not talk at once. Some browsers speak only after the first click or key. Choosing here unlocks that. Escape turns the voice off.</p>
    <div class="learnable-row">
      <button type="button" data-voice="keep">Keep LearnAble voice</button>
      <button type="button" data-voice="reader">I use my own screen reader (turn LearnAble voice off)</button>
    </div>
  `;
  dialog.querySelector("[data-voice=keep]")?.addEventListener("click", () => setVoice(true, "prompt"));
  dialog.querySelector("[data-voice=reader]")?.addEventListener("click", () => setVoice(false, "prompt"));
  document.body.append(dialog);
  dialog.querySelector<HTMLElement>("[data-voice=keep]")?.focus();
}

function shortcutList(): string {
  const keys = getSettings().keys;
  return `
    <li>Tab and Shift+Tab move through the page. The skip link is first.</li>
    <li>${keys.heading.toUpperCase()} next heading. Shift+${keys.heading.toUpperCase()} previous heading.</li>
    <li>${keys.landmark.toUpperCase()} next landmark. Shift+${keys.landmark.toUpperCase()} previous landmark.</li>
    <li>${keys.help} opens this help. Escape closes it and returns focus.</li>
    <li>${keys.voice} toggles LearnAble voice. The LearnAble voice button does the same. This chord is not an NVDA, JAWS, Orca, VoiceOver, or Chrome shortcut. On some Mac layouts it types a character in a text field, so it does not run there.</li>
    <li>Picture frame, while it is focused: Space or K play, C captions, D audio description, S sign panel, arrows seek, J and L move further. L is landmarks everywhere else.</li>
    <li>NVDA and JAWS browse mode take H and L before the page sees them. That is expected.</li>
    <li>Single-letter keys do nothing in a text field, and they can be turned off or changed below.</li>
  `;
}

export function openHelp(opener?: HTMLElement | null): void {
  if (document.getElementById(PROMPT_ID)) return;
  helpOpener = opener ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
  document.getElementById(HELP_ID)?.remove();
  const keys = getSettings().keys;
  const dialog = document.createElement("div");
  dialog.id = HELP_ID;
  dialog.className = "learnable-dialog";
  dialog.tabIndex = -1;
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-modal", "true");
  dialog.setAttribute("aria-labelledby", "learnable-help-title");
  dialog.innerHTML = `
    <h2 id="learnable-help-title">Keyboard shortcuts</h2>
    <ul>${shortcutList()}</ul>
    <div class="learnable-row">
      <label>Heading key <input data-map="heading" value="${escapeAttr(keys.heading)}" maxlength="8" /></label>
      <label>Landmark key <input data-map="landmark" value="${escapeAttr(keys.landmark)}" maxlength="8" /></label>
      <label>Help key <input data-map="help" value="${escapeAttr(keys.help)}" maxlength="8" /></label>
      <label>Voice shortcut <input data-map="voice" value="${escapeAttr(keys.voice)}" maxlength="32" /></label>
    </div>
    <div class="learnable-row">
      <button type="button" data-help="close">Close shortcuts</button>
    </div>
  `;
  dialog.querySelectorAll<HTMLInputElement>("[data-map]").forEach((input) => {
    input.addEventListener("change", () => {
      const map = input.dataset.map as keyof ShortcutMap;
      const value = input.value.trim();
      if (!value) return;
      updateSettings({ keys: { ...getSettings().keys, [map]: value } });
    });
  });
  const close = () => closeHelp();
  dialog.querySelector("[data-help=close]")?.addEventListener("click", close);
  document.body.append(dialog);
  dialog.querySelector<HTMLElement>("[data-help=close]")?.focus();
}

function closeHelp(): void {
  document.getElementById(HELP_ID)?.remove();
  const opener = helpOpener;
  helpOpener = null;
  opener?.focus();
}

function visible(node: HTMLElement): boolean {
  if (node.closest(`#${PROMPT_ID}, #${HELP_ID}, [hidden]`)) return false;
  const style = getComputedStyle(node);
  return style.display !== "none" && style.visibility !== "hidden";
}

function focusTarget(node: HTMLElement): void {
  const naturally = node.matches("a[href], button, input, select, textarea, summary, [tabindex]");
  if (!naturally || node.tabIndex < 0) node.tabIndex = -1;
  node.focus();
}

function cycle(selector: string, delta: number): void {
  const items = [...document.querySelectorAll<HTMLElement>(selector)].filter(visible);
  const unique = [...new Set(items)];
  if (unique.length === 0) return;
  const active = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  let index = unique.findIndex((item) => item === active || item.contains(active));
  if (index < 0) index = delta > 0 ? -1 : 0;
  const next = unique[(index + delta + unique.length) % unique.length];
  focusTarget(next);
}

const LANDMARKS = "header, [role='banner'], nav, [role='navigation'], main, [role='main'], footer, [role='contentinfo'], aside, [role='complementary'], [role='search'], form[aria-label], form[aria-labelledby], section[aria-label], section[aria-labelledby]";

function onFocus(event: FocusEvent): void {
  if (performance.now() > keyboardUntil) return;
  const target = event.composedPath()[0];
  if (!(target instanceof HTMLElement)) return;
  if (target.closest(`#${PROMPT_ID}, #${HELP_ID}`)) return;
  const settings = getSettings();
  if (!settings.voice || !settings.voiceChosen) return;
  const spoken = utteranceFor(target);
  if (!spoken) return;
  speak(spoken.text, spoken.lang, settings.readRate, { pitch: settings.readPitch });
}

function onKey(event: KeyboardEvent): void {
  keyboardUntil = performance.now() + 800;
  markSpeechUnlocked();
  const settings = getSettings();
  const prompt = document.getElementById(PROMPT_ID);
  const help = document.getElementById(HELP_ID);

  if (prompt) trapTab(prompt, event);
  if (help) trapTab(help, event);

  if (matchesChord(event, settings.keys.voice) && !typingTarget(event)) {
    event.preventDefault();
    event.stopPropagation();
    setVoice(!getSettings().voice, "toggle");
    return;
  }

  stopSpeaking();
  window.dispatchEvent(new CustomEvent("learnable-speech-cancel"));

  if (event.key === "Escape") {
    if (prompt) {
      event.preventDefault();
      setVoice(false, "prompt");
      return;
    }
    if (help) {
      event.preventDefault();
      event.stopPropagation();
      closeHelp();
      return;
    }
    readerStopIfPlaying();
  }

  if (prompt || help) return;
  if (typingTarget(event) || !settings.keyboard) return;
  if (matchesChar(event, settings.keys.help)) {
    event.preventDefault();
    event.stopPropagation();
    openHelp(document.activeElement instanceof HTMLElement ? document.activeElement : null);
    return;
  }
  if (inPlayer(event)) return;
  if (matchesChar(event, settings.keys.heading)) {
    event.preventDefault();
    cycle("h1, h2, h3, h4, h5, h6", event.shiftKey ? -1 : 1);
  } else if (matchesChar(event, settings.keys.landmark)) {
    event.preventDefault();
    cycle(LANDMARKS, event.shiftKey ? -1 : 1);
  }
}

function onPointer(): void {
  markSpeechUnlocked();
  flushUnlockedSpeech();
}

function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function ensureLive(): void {
  if (document.getElementById("learnable-reader-live") || !document.body) return;
  const live = document.createElement("p");
  live.id = "learnable-reader-live";
  live.setAttribute("role", "status");
  live.setAttribute("aria-live", "polite");
  document.body.append(live);
}

export function startVoice(): void {
  ensureLive();
  openPrompt();
  if (started) return;
  started = true;
  document.addEventListener("keydown", onKey, true);
  document.addEventListener("focusin", onFocus, true);
  document.addEventListener("pointerdown", onPointer, true);
}

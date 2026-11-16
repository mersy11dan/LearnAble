import { speak } from "../lib/speech";
import { presentHands } from "./signer";
import { signPanel, signSummary, visualsFor } from "./signs";

function sectionText(): string {
  const selected = window.getSelection()?.toString().replace(/\s+/g, " ").trim() || "";
  if (selected.length > 1) return selected.slice(0, 280);
  const main = document.querySelector("main") || document.body;
  return (main.textContent || "").replace(/\s+/g, " ").trim().slice(0, 280);
}

export function signCurrentText(): void {
  const text = sectionText();
  const view = signPanel(text, "en");
  const frames = visualsFor(view.gloss || text);
  const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  presentHands(frames, {
    word: text.slice(0, 48),
    returnFocus: opener,
    source: "selection",
  });
  const live = document.getElementById("learnable-reader-live");
  const summary = signSummary(frames) || "No text to sign.";
  if (live) live.textContent = summary;
  if (text) speak(text.slice(0, 280), "en");
}

export function startTextSign(): void {
  window.addEventListener("learnable-sign-selection", () => signCurrentText());
}

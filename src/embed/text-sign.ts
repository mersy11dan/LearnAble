import { speak } from "../lib/speech";
import { ensureSigner, showSignerFrame } from "./signer";
import { signPanel, signSummary, visualsFor } from "./signs";

function sectionText(): string {
  const selected = window.getSelection()?.toString().replace(/\s+/g, " ").trim() || "";
  if (selected.length > 1) return selected.slice(0, 280);
  const main = document.querySelector("main") || document.body;
  return (main.textContent || "").replace(/\s+/g, " ").trim().slice(0, 280);
}

function panel(): HTMLElement {
  let node = document.getElementById("learnable-text-sign");
  if (node) return node;
  node = document.createElement("section");
  node.id = "learnable-text-sign";
  node.setAttribute("aria-label", "Computer-generated signing for the selected text");
  const heading = document.createElement("h2");
  heading.textContent = "Computer-generated signing";
  const note = document.createElement("p");
  note.dataset.textNote = "true";
  const hands = document.createElement("div");
  hands.dataset.hands = "true";
  const gloss = document.createElement("p");
  gloss.dataset.gloss = "true";
  node.append(heading, note, hands, gloss);
  document.body.append(node);
  return node;
}

export function signCurrentText(): void {
  const text = sectionText();
  const view = signPanel(text, "en");
  const frames = visualsFor(view.gloss);
  const node = panel();
  const note = node.querySelector("[data-text-note]");
  if (note) note.textContent = "Computer-generated signing. ASL fingerspelling. This is not Ethiopian Sign Language.";
  const gloss = node.querySelector("[data-gloss]");
  if (gloss) gloss.textContent = view.gloss;
  const hands = node.querySelector<HTMLElement>("[data-hands]");
  if (hands) {
    ensureSigner(hands);
    showSignerFrame(hands, frames, 0);
  }
  const live = document.getElementById("learnable-reader-live");
  const summary = signSummary(frames) || "No text to sign.";
  if (live) live.textContent = summary;
  if (text) speak(text.slice(0, 280), "en");
}

export function startTextSign(): void {
  window.addEventListener("learnable-sign-selection", () => signCurrentText());
}

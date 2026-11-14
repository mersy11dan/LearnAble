import { chromeCopy } from "./copy";
import { describeImages, imageReport, readPage } from "./enhance";
import { applyHost } from "./host";
import { speak } from "../lib/speech";
import { getSettings, updateSettings, type CaptionPreset } from "./settings";
import { widgetCss } from "./styles";

export class LearnAbleToolbar extends HTMLElement {
  private root: ShadowRoot;
  private built = false;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
  }

  connectedCallback(): void {
    if (this.built) return;
    this.built = true;
    this.root.innerHTML = `
      <style>${widgetCss}</style>
      <div class="bar" role="group" aria-label="LearnAble display">
        <button type="button" data-key="largeText" aria-pressed="false">Larger text</button>
        <button type="button" data-key="highContrast" aria-pressed="false">High contrast</button>
        <button type="button" data-key="stopMotion" aria-pressed="false">Stop motion</button>
        <button type="button" data-act="read">Read this page</button>
        <button type="button" data-act="images">Image check</button>
        <a href="#learnable-pipeline">Transcript</a>
        <a href="#learnable-job">Job card</a>
        <a href="#learnable-session">Session</a>
        <label>Caption size <input data-key="captionScale" type="range" min="1" max="2.2" step="0.1" value="1.15" /></label>
        <label>Caption background
          <select data-key="captionPreset">
            <option value="white">White on black</option>
            <option value="yellow">Yellow on black</option>
            <option value="black">Black on white</option>
            <option value="cyan">Cyan on black</option>
          </select>
        </label>
        <label class="lang-pick">Language
          <select data-key="uiLang">
            <option value="en">English</option>
            <option value="am">አማርኛ</option>
          </select>
        </label>
        <p class="status" data-note></p>
        <label class="consent"><input type="checkbox" data-act="consent" /> I agree a description service may see pictures that have no alternative. Nothing is sent until this is checked.</label>
      </div>
    `;
    this.root.querySelectorAll<HTMLButtonElement>("button[data-key]").forEach((button) => {
      button.addEventListener("click", () => {
        const key = button.dataset.key as "largeText" | "highContrast" | "stopMotion";
        const current = getSettings();
        const next = updateSettings({ [key]: !current[key] });
        applyHost(next);
        this.reflect();
      });
    });
    this.root.querySelector<HTMLInputElement>("[data-key=captionScale]")?.addEventListener("input", (event) => {
      const next = updateSettings({ captionScale: Number((event.target as HTMLInputElement).value) });
      applyHost(next);
    });
    this.root.querySelector<HTMLSelectElement>("[data-key=captionPreset]")?.addEventListener("change", (event) => {
      const next = updateSettings({ captionPreset: (event.target as HTMLSelectElement).value as CaptionPreset });
      applyHost(next);
    });
    this.root.querySelector<HTMLSelectElement>("[data-key=uiLang]")?.addEventListener("change", (event) => {
      updateSettings({ uiLang: (event.target as HTMLSelectElement).value === "am" ? "am" : "en" });
      this.reflect();
    });
    this.root.querySelector<HTMLButtonElement>("[data-act=read]")?.addEventListener("click", () => {
      const spoken = readPage();
      const note = this.root.querySelector("[data-note]");
      if (note) note.textContent = spoken.notice;
      speak(spoken.text, spoken.lang === "am" ? "am-ET" : "en");
    });
    this.root.querySelector<HTMLButtonElement>("[data-act=images]")?.addEventListener("click", () => {
      const consent = this.root.querySelector<HTMLInputElement>("[data-act=consent]")?.checked === true;
      const note = this.root.querySelector("[data-note]");
      if (note) note.textContent = consent ? describeImages(true) : imageReport();
    });
    this.reflect();
  }

  private reflect(): void {
    const settings = getSettings();
    this.root.querySelectorAll<HTMLButtonElement>("button[data-key]").forEach((button) => {
      const key = button.dataset.key as "largeText" | "highContrast" | "stopMotion";
      button.setAttribute("aria-pressed", String(settings[key]));
    });
    const copy = chromeCopy[settings.uiLang];
    this.root.querySelector<HTMLButtonElement>("[data-key=largeText]")!.textContent = copy.larger;
    this.root.querySelector<HTMLButtonElement>("[data-key=highContrast]")!.textContent = copy.contrast;
    this.root.querySelector<HTMLButtonElement>("[data-key=stopMotion]")!.textContent = copy.stop;
    const read = this.root.querySelector<HTMLButtonElement>("[data-act=read]");
    const images = this.root.querySelector<HTMLButtonElement>("[data-act=images]");
    if (read) read.textContent = copy.read;
    if (images) images.textContent = copy.images;
    const pipeline = this.root.querySelector<HTMLAnchorElement>("[href='#learnable-pipeline']");
    const job = this.root.querySelector<HTMLAnchorElement>("[href='#learnable-job']");
    const session = this.root.querySelector<HTMLAnchorElement>("[href='#learnable-session']");
    if (pipeline) pipeline.textContent = copy.pipeline;
    if (job) job.textContent = copy.job;
    if (session) session.textContent = copy.session;
    const scale = this.root.querySelector<HTMLInputElement>("[data-key=captionScale]");
    const preset = this.root.querySelector<HTMLSelectElement>("[data-key=captionPreset]");
    const uiLang = this.root.querySelector<HTMLSelectElement>("[data-key=uiLang]");
    if (scale) scale.value = String(settings.captionScale);
    if (preset) preset.value = settings.captionPreset;
    if (uiLang) uiLang.value = settings.uiLang;
    const skip = document.querySelector(".learnable-skip");
    if (skip) skip.textContent = copy.skip;
    if (settings.highContrast) this.setAttribute("contrast", "high");
    else this.removeAttribute("contrast");
  }
}

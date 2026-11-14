import { chromeCopy } from "./copy";
import { describeImages, imageReport } from "./enhance";
import { applyHost } from "./host";
import { readerPause, readerPlay, readerStop } from "./reader";
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
        <button type="button" data-key="stopMotion" aria-pressed="false">Stop motion</button>
        <label>Contrast
          <select data-key="contrastMode">
            <option value="off">Off</option>
            <option value="bw">Black and white</option>
            <option value="yb">Yellow on black</option>
          </select>
        </label>
        <label>Contrast strength
          <input data-key="contrastLevel" type="range" min="1" max="10" step="1" value="7" />
          <span data-contrast-value>7</span>
        </label>
        <button type="button" data-act="read-play">Play reading</button>
        <button type="button" data-act="read-pause">Pause reading</button>
        <button type="button" data-act="read-stop">Stop reading</button>
        <label>Speech speed <input data-key="readRate" type="range" min="0.6" max="1.6" step="0.1" value="1" /></label>
        <label>Speech pitch <input data-key="readPitch" type="range" min="0.8" max="1.4" step="0.1" value="1" /></label>
        <label>Verbosity
          <select data-key="readVerbosity">
            <option value="sentences">Sentences</option>
            <option value="headings">Headings</option>
            <option value="links">Links</option>
          </select>
        </label>
        <label class="consent"><input type="checkbox" data-key="haptics" /> Vibration on Android, off until checked</label>
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
        <details>
          <summary>Keyboard help</summary>
          <p>Reading keys work only while this toolbar is focused, so they do not cover a screen reader. Escape stops reading.</p>
        </details>
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
    this.root.querySelector<HTMLSelectElement>("[data-key=contrastMode]")?.addEventListener("change", (event) => {
      const value = (event.target as HTMLSelectElement).value;
      const next = updateSettings({ contrastMode: value === "bw" || value === "yb" ? value : "off" });
      applyHost(next);
      this.reflect();
    });
    this.root.querySelector<HTMLInputElement>("[data-key=contrastLevel]")?.addEventListener("input", (event) => {
      const next = updateSettings({ contrastLevel: Number((event.target as HTMLInputElement).value) });
      applyHost(next);
      this.reflect();
    });
    this.root.querySelector<HTMLInputElement>("[data-key=readRate]")?.addEventListener("input", (event) => {
      updateSettings({ readRate: Number((event.target as HTMLInputElement).value) });
    });
    this.root.querySelector<HTMLInputElement>("[data-key=readPitch]")?.addEventListener("input", (event) => {
      updateSettings({ readPitch: Number((event.target as HTMLInputElement).value) });
    });
    this.root.querySelector<HTMLSelectElement>("[data-key=readVerbosity]")?.addEventListener("change", (event) => {
      const value = (event.target as HTMLSelectElement).value;
      updateSettings({ readVerbosity: value === "headings" || value === "links" ? value : "sentences" });
    });
    this.root.querySelector<HTMLInputElement>("[data-key=haptics]")?.addEventListener("change", (event) => {
      updateSettings({ haptics: (event.target as HTMLInputElement).checked });
    });
    this.root.querySelector<HTMLButtonElement>("[data-act=read-play]")?.addEventListener("click", () => readerPlay());
    this.root.querySelector<HTMLButtonElement>("[data-act=read-pause]")?.addEventListener("click", () => readerPause());
    this.root.querySelector<HTMLButtonElement>("[data-act=read-stop]")?.addEventListener("click", () => readerStop());
    this.root.addEventListener("keydown", (event) => {
      if (event instanceof KeyboardEvent && event.key === "Escape") readerStop();
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
    this.root.querySelector<HTMLButtonElement>("[data-key=stopMotion]")!.textContent = copy.stop;
    const images = this.root.querySelector<HTMLButtonElement>("[data-act=images]");
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
    const mode = this.root.querySelector<HTMLSelectElement>("[data-key=contrastMode]");
    const level = this.root.querySelector<HTMLInputElement>("[data-key=contrastLevel]");
    const shown = this.root.querySelector("[data-contrast-value]");
    if (mode) mode.value = settings.contrastMode;
    if (level) level.value = String(settings.contrastLevel);
    if (shown) shown.textContent = String(settings.contrastLevel);
    const haptics = this.root.querySelector<HTMLInputElement>("[data-key=haptics]");
    if (haptics) haptics.checked = settings.haptics;
    const skip = document.querySelector(".learnable-skip");
    if (skip) skip.textContent = copy.skip;
    if (settings.contrastMode !== "off") this.setAttribute("contrast", "high");
    else this.removeAttribute("contrast");
  }
}

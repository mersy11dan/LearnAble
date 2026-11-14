import { getSettings, updateSettings, type CaptionPreset } from "./settings";
import { applyHost } from "./host";
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
        <label>Caption size <input data-key="captionScale" type="range" min="1" max="2.2" step="0.1" value="1.15" /></label>
        <label>Caption background
          <select data-key="captionPreset">
            <option value="white">White on black</option>
            <option value="yellow">Yellow on black</option>
            <option value="black">Black on white</option>
            <option value="cyan">Cyan on black</option>
          </select>
        </label>
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
    this.reflect();
  }

  private reflect(): void {
    const settings = getSettings();
    this.root.querySelectorAll<HTMLButtonElement>("button[data-key]").forEach((button) => {
      const key = button.dataset.key as "largeText" | "highContrast" | "stopMotion";
      button.setAttribute("aria-pressed", String(settings[key]));
    });
    const scale = this.root.querySelector<HTMLInputElement>("[data-key=captionScale]");
    const preset = this.root.querySelector<HTMLSelectElement>("[data-key=captionPreset]");
    if (scale) scale.value = String(settings.captionScale);
    if (preset) preset.value = settings.captionPreset;
    if (settings.highContrast) this.setAttribute("contrast", "high");
    else this.removeAttribute("contrast");
  }
}

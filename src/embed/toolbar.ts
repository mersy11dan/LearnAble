import { chromeCopy } from "./copy";
import { describeImages, imageReport } from "./enhance";
import { applyHost } from "./host";
import { readerPause, readerPlay, readerStop } from "./reader";
import { getSettings, updateSettings, type CaptionPreset } from "./settings";
import { widgetCss } from "./styles";
import { announce, openHelp, setVoice } from "./voice";

const CORNERS = ["tl", "tr", "bl", "br"] as const;
type Corner = (typeof CORNERS)[number];

function intersects(a: DOMRect, b: DOMRect): boolean {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

export class LearnAbleToolbar extends HTMLElement {
  private root: ShadowRoot;
  private built = false;
  private open = true;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
  }

  connectedCallback(): void {
    if (this.built) return;
    this.built = true;
    this.root.innerHTML = `
      <style>${widgetCss}</style>
      <button type="button" class="launcher" data-act="launcher" aria-expanded="false" aria-controls="learnable-panel">LearnAble</button>
      <div class="dock">
      <button type="button" class="handle" data-act="move" aria-label="Move LearnAble. Arrow keys move it. The corner buttons place it without dragging.">Move</button>
      <div class="bar" id="learnable-panel" role="toolbar" aria-label="LearnAble display" aria-orientation="horizontal">
        <button type="button" data-act="voice" aria-pressed="true" aria-keyshortcuts="Alt+Shift+S">LearnAble voice</button>
        <button type="button" data-act="describe" aria-pressed="true">Audio description</button>
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
        <button type="button" data-act="keys" aria-pressed="true">Keyboard shortcuts</button>
        <button type="button" data-act="help">Keyboard help</button>
        <button type="button" data-act="collapse">Minimise</button>
        <button type="button" data-corner="tl">Top left</button>
        <button type="button" data-corner="tr">Top right</button>
        <button type="button" data-corner="bl">Bottom left</button>
        <button type="button" data-corner="br">Bottom right</button>
      </div>
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
    this.root.querySelector<HTMLButtonElement>("[data-act=voice]")?.addEventListener("click", () => {
      setVoice(!getSettings().voice, "toggle");
    });
    this.root.querySelector<HTMLButtonElement>("[data-act=describe]")?.addEventListener("click", () => {
      const on = !getSettings().audioDescription;
      updateSettings({ audioDescription: on });
      announce(on ? "Audio description on." : "Audio description off.");
    });
    this.root.querySelector<HTMLButtonElement>("[data-act=keys]")?.addEventListener("click", () => {
      const on = !getSettings().keyboard;
      updateSettings({ keyboard: on });
      announce(on ? "Keyboard shortcuts on." : "Keyboard shortcuts off. The buttons still work.");
    });
    this.root.querySelector<HTMLButtonElement>("[data-act=help]")?.addEventListener("click", (event) => {
      openHelp(event.currentTarget instanceof HTMLElement ? event.currentTarget : null);
    });
    window.addEventListener("learnable-settings", () => this.reflect());
    this.root.querySelector<HTMLButtonElement>("[data-act=images]")?.addEventListener("click", () => {
      const consent = this.root.querySelector<HTMLInputElement>("[data-act=consent]")?.checked === true;
      const note = this.root.querySelector("[data-note]");
      if (note) note.textContent = consent ? describeImages(true) : imageReport();
    });
    const saved = getSettings();
    this.open = saved.toolbarVisited ? !saved.toolbarCollapsed : true;
    if (!saved.toolbarVisited) updateSettings({ toolbarVisited: true, toolbarCollapsed: true });
    this.place(saved.toolbarCorner);
    this.root.querySelector<HTMLButtonElement>("[data-act=launcher]")?.addEventListener("click", () => this.setOpen(true));
    this.root.querySelector<HTMLButtonElement>("[data-act=collapse]")?.addEventListener("click", () => this.setOpen(false));
    this.root.querySelectorAll<HTMLButtonElement>("[data-corner]").forEach((button) => {
      button.addEventListener("click", () => this.place(button.dataset.corner as Corner, true));
    });
    const handle = this.root.querySelector<HTMLButtonElement>("[data-act=move]");
    handle?.addEventListener("pointerdown", (event) => this.drag(event));
    handle?.addEventListener("keydown", (event) => this.moveByKey(event));
    this.root.querySelector(".bar")?.addEventListener("keydown", (event) => this.rove(event as KeyboardEvent));
    document.addEventListener("focusin", (event) => this.avoid(event));
    this.paint();
    this.reflect();
  }

  private controls(): HTMLElement[] {
    return [...this.root.querySelectorAll<HTMLElement>(".bar button, .bar a[href], .bar select, .bar input")];
  }

  private setOpen(open: boolean): void {
    this.open = open;
    updateSettings({ toolbarCollapsed: !open, toolbarVisited: true });
    this.paint();
    const focus = open ? this.root.querySelector<HTMLElement>("[data-act=move]") : this.root.querySelector<HTMLElement>("[data-act=launcher]");
    focus?.focus();
  }

  private place(corner: Corner, save = false): void {
    if (!CORNERS.includes(corner)) return;
    this.dataset.corner = corner;
    this.style.left = "";
    this.style.top = "";
    this.style.right = "";
    this.style.bottom = "";
    if (save) updateSettings({ toolbarCorner: corner });
  }

  private drag(event: PointerEvent): void {
    if (event.button !== 0) return;
    const handle = event.currentTarget;
    if (!(handle instanceof HTMLElement)) return;
    const startX = event.clientX;
    const startY = event.clientY;
    const origin = this.getBoundingClientRect();
    const move = (next: PointerEvent) => {
      const left = Math.min(window.innerWidth - 48, Math.max(0, origin.left + next.clientX - startX));
      const top = Math.min(window.innerHeight - 48, Math.max(0, origin.top + next.clientY - startY));
      this.dataset.corner = "free";
      this.style.left = `${left}px`;
      this.style.top = `${top}px`;
      this.style.right = "auto";
      this.style.bottom = "auto";
    };
    const up = () => {
      handle.removeEventListener("pointermove", move);
      handle.removeEventListener("pointerup", up);
    };
    handle.setPointerCapture(event.pointerId);
    handle.addEventListener("pointermove", move);
    handle.addEventListener("pointerup", up);
  }

  private moveByKey(event: KeyboardEvent): void {
    if (!event.key.startsWith("Arrow")) return;
    event.preventDefault();
    event.stopPropagation();
    const rect = this.getBoundingClientRect();
    const step = 24;
    const left = rect.left + (event.key === "ArrowLeft" ? -step : event.key === "ArrowRight" ? step : 0);
    const top = rect.top + (event.key === "ArrowUp" ? -step : event.key === "ArrowDown" ? step : 0);
    this.dataset.corner = "free";
    this.style.left = `${Math.min(window.innerWidth - 48, Math.max(0, left))}px`;
    this.style.top = `${Math.min(window.innerHeight - 48, Math.max(0, top))}px`;
    this.style.right = "auto";
    this.style.bottom = "auto";
  }

  private rove(event: KeyboardEvent): void {
    const target = event.composedPath()[0];
    if (!(target instanceof HTMLElement)) return;
    if (target.closest("input, select, textarea")) return;
    if (target.dataset.act === "move") return;
    const items = this.controls();
    const index = items.indexOf(target);
    if (index < 0) return;
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % items.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + items.length) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    else return;
    event.preventDefault();
    items.forEach((item, itemIndex) => item.setAttribute("tabindex", itemIndex === next ? "0" : "-1"));
    items[next].focus();
  }

  private avoid(event: FocusEvent): void {
    const target = event.composedPath()[0];
    if (!(target instanceof HTMLElement)) return;
    if (event.composedPath().includes(this)) return;
    const rect = target.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) return;
    if (!intersects(this.getBoundingClientRect(), rect)) return;
    const order: Corner[] = ["tr", "tl", "br", "bl"];
    for (const corner of order) {
      this.place(corner);
      if (!intersects(this.getBoundingClientRect(), target.getBoundingClientRect())) {
        updateSettings({ toolbarCorner: corner });
        return;
      }
    }
    target.style.scrollMargin = "5rem";
    target.scrollIntoView({ block: "nearest", inline: "nearest" });
  }

  private paint(): void {
    const launcher = this.root.querySelector<HTMLElement>("[data-act=launcher]");
    const dock = this.root.querySelector<HTMLElement>(".dock");
    if (launcher) {
      launcher.hidden = this.open;
      launcher.setAttribute("aria-expanded", String(this.open));
    }
    if (dock) dock.hidden = !this.open;
    if (this.open) {
      const items = this.controls();
      items.forEach((item, index) => item.setAttribute("tabindex", index === 0 ? "0" : "-1"));
    }
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
    const voice = this.root.querySelector<HTMLButtonElement>("[data-act=voice]");
    const describe = this.root.querySelector<HTMLButtonElement>("[data-act=describe]");
    const keys = this.root.querySelector<HTMLButtonElement>("[data-act=keys]");
    if (voice) {
      voice.setAttribute("aria-pressed", String(settings.voice));
      voice.setAttribute("aria-keyshortcuts", settings.keys.voice);
    }
    if (describe) describe.setAttribute("aria-pressed", String(settings.audioDescription));
    if (keys) keys.setAttribute("aria-pressed", String(settings.keyboard));
    const skip = document.querySelector(".learnable-skip");
    if (skip) skip.textContent = copy.skip;
    if (settings.contrastMode !== "off") this.setAttribute("contrast", "high");
    else this.removeAttribute("contrast");
  }
}

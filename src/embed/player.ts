import { toBrf } from "../lib/braille";
import { commandForKey } from "../lib/commands";
import { buildOfflinePack, saveFile } from "../lib/pack";
import { speak, stopSpeaking } from "../lib/speech";
import { buildTaggedPdf } from "../lib/taggedPdf";
import { formatTime } from "../lib/time";
import { cueAt, parseVtt, type Cue } from "../lib/vtt";
import { getFeatures, getSettings, getTheme, optedIn, PRESETS, type CaptionPreset } from "./settings";
import { widgetCss } from "./styles";

function emit(element: HTMLElement, name: string, detail: unknown): void {
  const event = new CustomEvent(name, { bubbles: true, composed: true, detail });
  element.dispatchEvent(event);
  window.dispatchEvent(new CustomEvent(name, { detail }));
}

export class LearnAblePlayer extends HTMLElement {
  private root: ShadowRoot;
  private video: HTMLVideoElement | null = null;
  private en: Cue[] = [];
  private am: Cue[] = [];
  private ad: Cue[] = [];
  private mode: "off" | "en" | "am" = "en";
  private adOn = false;
  private signOn = true;
  private lastAd = "";
  private built = false;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
  }

  connectedCallback(): void {
    if (!this.built) this.mount();
    void this.loadTracks();
    this.applySettings();
    window.addEventListener("learnable-settings", this.onSettings);
  }

  refresh(): void {
    this.built = false;
    this.mount();
    void this.loadTracks();
    this.applySettings();
  }

  disconnectedCallback(): void {
    window.removeEventListener("learnable-settings", this.onSettings);
    stopSpeaking();
  }

  private onSettings = (): void => {
    this.applySettings();
  };

  private mount(): void {
    this.built = true;
    const features = getFeatures();
    const sign = optedIn(this, "sign", features.signWindow);
    const describe = optedIn(this, "describe", features.audioDescription);
    const offline = this.hasAttribute("offline") || features.offlinePack;
    const braille = this.hasAttribute("braille") || features.braille;
    const docs = this.hasAttribute("docs") || features.taggedDocs;
    this.root.innerHTML = `
      <style>${widgetCss}</style>
      <section aria-label="LearnAble lesson">
        <div class="stage" tabindex="0" role="region" aria-label="Lesson picture. Press question mark for keyboard shortcuts.">
          <video playsinline preload="metadata"></video>
          <p class="caption" aria-hidden="true"></p>
        </div>
        <p class="status" aria-live="polite">Paused.</p>
        <div class="row">
          <button type="button" data-act="play">Play</button>
          <button type="button" data-act="captions">Captions: English</button>
          ${describe ? `<button type="button" data-act="ad" aria-pressed="false">Audio description</button>` : ""}
          ${sign ? `<button type="button" data-act="sign" aria-pressed="true">Sign window</button>` : ""}
          <label>Caption size <input data-act="size" type="range" min="1" max="2.2" step="0.1" value="1.15" /></label>
          <label>Caption colours
            <select data-act="preset">
              <option value="white">White on black</option>
              <option value="yellow">Yellow on black</option>
              <option value="black">Black on white</option>
              <option value="cyan">Cyan on black</option>
            </select>
          </label>
        </div>
        <div class="row extras">
          ${offline ? `<button type="button" data-act="pack">Download 3G pack</button>` : ""}
          ${braille ? `<button type="button" data-act="braille">Download braille</button>` : ""}
          ${docs ? `<button type="button" data-act="pdf">Download tagged PDF</button>` : ""}
        </div>
        <h2>Transcript</h2>
        <ol class="transcript"></ol>
        ${
          sign
            ? `<div class="sign" data-sign>
                <h2>Ethiopian Sign Language</h2>
                <div style="padding:0.75rem">
                  <span class="mark" aria-hidden="true"></span>
                  <p>Sign interpreter video goes here</p>
                  <p class="gloss">OPEN</p>
                  <p>This is not a signer. Point the sign attribute at a recorded clip. The gloss follows the captions. Move and resize with the buttons. S also toggles this window when the picture is selected.</p>
                  <div class="row">
                    <button type="button" data-act="left">Move left</button>
                    <button type="button" data-act="right">Move right</button>
                    <button type="button" data-act="up">Move up</button>
                    <button type="button" data-act="down">Move down</button>
                    <button type="button" data-act="shrink">Smaller</button>
                    <button type="button" data-act="grow">Larger</button>
                  </div>
                </div>
              </div>`
            : ""
        }
      </section>
    `;
    this.video = this.root.querySelector("video");
    const stage = this.root.querySelector<HTMLElement>(".stage");
    stage?.addEventListener("keydown", (event) => this.onKey(event));
    this.root.querySelectorAll<HTMLButtonElement>("button[data-act]").forEach((button) => {
      button.addEventListener("click", () => this.onAction(button.dataset.act || ""));
    });
    this.root.querySelector<HTMLInputElement>("[data-act=size]")?.addEventListener("input", (event) => {
      const value = Number((event.target as HTMLInputElement).value);
      this.styleCaption(value, getSettings().captionPreset);
      emit(this, "learnable-settings", { captionScale: value });
    });
    this.root.querySelector<HTMLSelectElement>("[data-act=preset]")?.addEventListener("change", (event) => {
      const preset = (event.target as HTMLSelectElement).value as CaptionPreset;
      this.styleCaption(getSettings().captionScale, preset);
    });
    this.video?.addEventListener("timeupdate", () => this.sync());
    this.video?.addEventListener("play", () => {
      this.setPlayLabel(true);
      emit(this, "learnable-play", { playing: true });
    });
    this.video?.addEventListener("pause", () => {
      this.setPlayLabel(false);
      emit(this, "learnable-play", { playing: false });
    });
  }

  private async loadTracks(): Promise<void> {
    const src = this.getAttribute("src");
    if (this.video && src) this.video.src = src;
    this.en = await this.fetchCues(this.getAttribute("captions-en"));
    this.am = await this.fetchCues(this.getAttribute("captions-am"));
    this.ad = await this.fetchCues(this.getAttribute("describe"));
    const sign = this.root.querySelector<HTMLElement>("[data-sign]");
    if (sign) sign.hidden = !this.signOn;
    this.renderTranscript();
    this.sync();
  }

  private renderTranscript(): void {
    const list = this.root.querySelector(".transcript");
    if (!list) return;
    const cues = this.en.length ? this.en : this.am;
    list.replaceChildren();
    for (const cue of cues) {
      const item = document.createElement("li");
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.seek = String(cue.start);
      button.textContent = `${formatTime(cue.start)} ${cue.text}`;
      button.addEventListener("click", () => {
        if (this.video) this.video.currentTime = cue.start;
      });
      item.append(button);
      list.append(item);
    }
  }

  private async fetchCues(url: string | null): Promise<Cue[]> {
    if (!url || url === "false") return [];
    try {
      const response = await fetch(url);
      if (!response.ok) return [];
      return parseVtt(await response.text());
    } catch {
      return [];
    }
  }

  private applySettings(): void {
    const settings = getSettings();
    this.mode = settings.lang;
    if (settings.highContrast) this.setAttribute("contrast", "high");
    else this.removeAttribute("contrast");
    this.setAttribute("theme", getTheme());
    const preset = this.root.querySelector<HTMLSelectElement>("[data-act=preset]");
    const size = this.root.querySelector<HTMLInputElement>("[data-act=size]");
    if (preset) preset.value = settings.captionPreset;
    if (size) size.value = String(settings.captionScale);
    this.styleCaption(settings.captionScale, settings.captionPreset);
    this.sync();
  }

  private styleCaption(scale: number, preset: CaptionPreset): void {
    const caption = this.root.querySelector<HTMLElement>(".caption");
    const colors = PRESETS[preset] ?? PRESETS.white;
    if (!caption) return;
    caption.style.color = colors.fg;
    caption.style.background = colors.bg;
    caption.style.fontSize = `${scale}rem`;
  }

  private setPlayLabel(playing: boolean): void {
    const button = this.root.querySelector<HTMLButtonElement>("[data-act=play]");
    if (button) button.textContent = playing ? "Pause" : "Play";
    const status = this.root.querySelector(".status");
    if (status && this.video) status.textContent = `${playing ? "Playing" : "Paused"}. ${formatTime(this.video.currentTime)} of ${formatTime(this.video.duration || 0)}.`;
  }

  private sync(): void {
    if (!this.video) return;
    const time = this.video.currentTime;
    const cues = this.mode === "am" ? this.am : this.mode === "en" ? this.en : [];
    const cue = this.mode === "off" ? undefined : cueAt(cues, time);
    const caption = this.root.querySelector(".caption");
    if (caption) {
      caption.textContent = cue?.text ?? "";
      caption.setAttribute("lang", this.mode === "am" ? "am" : "en");
    }
    const gloss = this.root.querySelector(".gloss");
    if (gloss) gloss.textContent = cue ? cue.text.split(" ").slice(0, 2).join(" ") : "OPEN";
    if (this.adOn) {
      const description = cueAt(this.ad, time);
      if (description && description.text !== this.lastAd) {
        this.lastAd = description.text;
        speak(description.text, "en");
      }
    }
    const button = this.root.querySelector<HTMLButtonElement>("[data-act=captions]");
    if (button) button.textContent = this.mode === "off" ? "Captions: off" : this.mode === "am" ? "Captions: Amharic" : "Captions: English";
    this.setPlayLabel(!this.video.paused);
  }

  private onKey(event: KeyboardEvent): void {
    const command = commandForKey(event);
    if (!command) return;
    event.preventDefault();
    if (command.type === "toggle-play") void this.toggle();
    if (command.type === "cycle-captions") this.cycleCaptions();
    if (command.type === "toggle-ad") this.toggleAd();
    if (command.type === "toggle-sign") this.toggleSign();
    if (command.type === "seek" && this.video) this.video.currentTime = Math.max(0, this.video.currentTime + command.by);
    if (command.type === "seek-to" && this.video) this.video.currentTime = command.to === "start" ? 0 : this.video.duration || 0;
    if (command.type === "mute" && this.video) this.video.muted = !this.video.muted;
    if (command.type === "volume" && this.video) this.video.volume = Math.min(1, Math.max(0, this.video.volume + command.by));
  }

  private async toggle(): Promise<void> {
    if (!this.video) return;
    try {
      if (this.video.paused) await this.video.play();
      else this.video.pause();
    } catch {
      this.setStatus("The video did not play. Captions are still listed when the file loads.");
    }
  }

  private cycleCaptions(): void {
    this.mode = this.mode === "off" ? "en" : this.mode === "en" ? "am" : "off";
    this.sync();
    emit(this, "learnable-captions", { lang: this.mode });
  }

  private toggleAd(): void {
    this.adOn = !this.adOn;
    if (!this.adOn) stopSpeaking();
    const button = this.root.querySelector<HTMLButtonElement>("[data-act=ad]");
    if (button) button.setAttribute("aria-pressed", String(this.adOn));
  }

  private nudge(direction: string): void {
    const sign = this.root.querySelector<HTMLElement>("[data-sign]");
    if (!sign) return;
    const current = sign.style.transform.match(/-?\d+/g)?.map(Number) ?? [0, 0];
    const x = (current[0] ?? 0) + (direction === "left" ? -24 : direction === "right" ? 24 : 0);
    const y = (current[1] ?? 0) + (direction === "up" ? -24 : direction === "down" ? 24 : 0);
    sign.style.transform = `translate(${x}px, ${y}px)`;
  }

  private scaleSign(step: number): void {
    const sign = this.root.querySelector<HTMLElement>("[data-sign]");
    if (!sign) return;
    const width = Math.min(560, Math.max(180, (sign.offsetWidth || 280) + step * 40));
    sign.style.width = `${width}px`;
    sign.style.maxWidth = "100%";
  }

  private toggleSign(): void {
    this.signOn = !this.signOn;
    const sign = this.root.querySelector<HTMLElement>("[data-sign]");
    if (sign) sign.hidden = !this.signOn;
    const button = this.root.querySelector<HTMLButtonElement>("[data-act=sign]");
    if (button) button.setAttribute("aria-pressed", String(this.signOn));
  }

  private setStatus(message: string): void {
    const status = this.root.querySelector(".status");
    if (status) status.textContent = message;
  }

  private textOf(cues: Cue[]): string {
    return cues.map((cue) => cue.text).join("\n");
  }

  private async onAction(action: string): Promise<void> {
    if (action === "play") void this.toggle();
    if (action === "captions") this.cycleCaptions();
    if (action === "ad") this.toggleAd();
    if (action === "sign") this.toggleSign();
    if (action === "left" || action === "right" || action === "up" || action === "down") this.nudge(action);
    if (action === "shrink" || action === "grow") this.scaleSign(action === "grow" ? 1 : -1);
    if (action === "pack") {
      try {
        const zip = await buildOfflinePack(this.textOf(this.en), this.textOf(this.am));
        saveFile(zip, "learnable-3g-pack.zip", "application/zip");
        this.setStatus("3G pack downloaded.");
      } catch (error) {
        this.setStatus(error instanceof Error ? error.message : "The pack could not be built.");
      }
    }
    if (action === "braille") {
      const lang = this.mode === "am" ? "am" : "en";
      const text = lang === "am" ? this.textOf(this.am) : this.textOf(this.en);
      saveFile(new TextEncoder().encode(toBrf(text)), `lesson-${lang}.brf`, "text/plain");
      this.setStatus("Braille file downloaded.");
    }
    if (action === "pdf") {
      const pdf = buildTaggedPdf({
        title: "LearnAble lesson",
        paragraphs: this.en.map((cue) => cue.text),
        figureAlt: "Lesson picture with English and Amharic captions.",
      });
      saveFile(pdf, "learnable-lesson.pdf", "application/pdf");
      this.setStatus("Tagged PDF downloaded. Amharic stays in the captions.");
    }
  }
}

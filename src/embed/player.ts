import lesson from "../content/lesson.json";
import { jobs } from "../content/jobs";
import { verifyOpenBadge } from "../lib/badge";
import { toBrf } from "../lib/braille";
import { commandForKey } from "../lib/commands";
import { buildClientPack, saveFile } from "../lib/pack";
import { cueToDeliver, needsExtendedDescription, scheduleDescriptions, spokenSeconds } from "../lib/describe";
import { speak, stopSpeaking, whenVoice } from "../lib/speech";
import { buildTaggedPdf } from "../lib/taggedPdf";
import { formatTime } from "../lib/time";
import { cueAt, cuesToVtt, parseVtt, type Cue } from "../lib/vtt";
import { safeFetch } from "../lib/guard";
import { resolveUrl } from "./assets";
import {
  DEFAULT_FRAME,
  EMBED_SIGN_FRAME_KEY,
  NUDGE_PX,
  NUDGE_SHIFT_PX,
  boundsFromRect,
  clampFrame,
  mediaMatches,
  movedAnnouncement,
  nudgeFrame,
  readStoredFrame,
  writeStoredFrame,
  type Frame,
} from "../lib/signFrame";
import { presentSign, type SignLoad } from "../lib/signLabel";
import { attachSignSync } from "../lib/signSync";
import { closeHands, presentHands } from "./signer";
import { ASL_GLOSS_LABEL, GLOSS_MODEL, signPanel, signSummary, visualsFor, type SignVisual } from "./signs";
import { getFeatures, getSettings, getTheme, optedIn, PRESETS, updateSettings, type CaptionPreset, type DescriptionMode } from "./settings";
import { widgetCss } from "./styles";

function emit(element: HTMLElement, name: string, detail: unknown): void {
  const event = new CustomEvent(name, { bubbles: true, composed: true, detail });
  element.dispatchEvent(event);
  window.dispatchEvent(new CustomEvent(name, { detail }));
}

export class LearnAblePlayer extends HTMLElement {
  private root: ShadowRoot;
  private video: HTMLMediaElement | null = null;
  private signClip: HTMLVideoElement | null = null;
  private en: Cue[] = [];
  private am: Cue[] = [];
  private ad: Cue[] = [];
  private adAm: Cue[] = [];
  private mode: "off" | "en" | "am" = "en";
  private signOn = true;
  private held = false;
  private adLock: { text: string; start: number; holdUntil: number } | null = null;
  private adTimer = 0;
  private built = false;
  private handKey = "";
  private signLoad: SignLoad = "idle";
  private moving = false;
  private frame: Frame = { ...DEFAULT_FRAME };
  private moveTimer = 0;
  private stopSignSync: (() => void) | undefined;
  private readonly onHostResize = (): void => {
    this.frame = clampFrame(this.frame, this.signBounds());
    this.layoutSign();
  };

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
  }

  connectedCallback(): void {
    if (!this.built) this.mount();
    void this.loadTracks();
    this.applySettings();
    window.addEventListener("learnable-settings", this.onSettings);
    window.addEventListener("learnable-speech-cancel", this.onSpeechCancel);
    window.addEventListener("resize", this.onHostResize);
  }

  refresh(): void {
    this.built = false;
    this.mount();
    void this.loadTracks();
    this.applySettings();
  }

  disconnectedCallback(): void {
    window.removeEventListener("learnable-settings", this.onSettings);
    window.removeEventListener("learnable-speech-cancel", this.onSpeechCancel);
    window.removeEventListener("resize", this.onHostResize);
    this.stopSignSync?.();
    window.clearTimeout(this.moveTimer);
    window.clearTimeout(this.adTimer);
    stopSpeaking();
  }

  private onSettings = (): void => {
    this.applySettings();
  };

  private onSpeechCancel = (): void => {
    this.resumeHeld();
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
      <style>${widgetCss}
:host { position: relative; z-index: auto; width: 100%; max-width: none; max-height: none; container-type: inline-size; }
.media-row { grid-template-columns: minmax(0, 1fr); }
.stage, .stage video, video { min-width: 0; max-width: 100%; }
.stage { min-height: 12rem; }
.caption { position: static; left: auto; bottom: auto; transform: none; max-width: 40rem; margin: 0.5rem 0 0; }
@container (max-width: 36rem) {
  .media-row { grid-template-columns: 1fr; }
}
.sign { height: auto; overflow: visible; }
.sign-head {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  min-width: 0;
  background: var(--color-navy);
  color: var(--color-navy-ink);
  padding: 0.5rem 0.75rem;
}
.sign-head h2 {
  flex: 1 1 auto;
  min-width: 0;
  margin: 0;
  padding: 0;
  background: transparent;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow-wrap: normal;
  word-break: keep-all;
}
.sign-head .sign-resize-grip,
.sign .row button,
.sign-grip {
  position: static;
  flex: 0 0 auto;
  width: auto;
  height: auto;
  min-width: max-content;
  max-width: none;
  white-space: nowrap;
  overflow-wrap: normal;
  word-break: keep-all;
  writing-mode: horizontal-tb;
}
.gloss-small { font-size: 0.95rem; }
.sign-info { margin: 0.35rem 0.75rem 0.6rem; }
.sign-info summary { cursor: pointer; min-height: 2.75rem; display: flex; align-items: center; }
.sign-float { position: absolute; z-index: 5; margin-top: 0; }
.sign-stacked.sign-float { position: static; left: auto; top: auto; width: auto; height: auto; }
.sign-drag-handle { touch-action: none; cursor: grab; }
.sign-resize-grip { position: static; width: auto; height: auto; min-width: max-content; cursor: nwse-resize; white-space: nowrap; }
.sign-missing, .sign-video-label, .sign-moved { margin: 0.5rem 0.75rem; }
.sign-move-controls { display: contents; }
.sign-stacked .sign-move-controls, .sign-move-controls[hidden] { display: none; }
@media (max-width: 52rem) {
  .sign-move-controls { display: none; }
}
.sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.media-error { margin: 0.5rem 0.75rem; }
.media-error a { color: var(--color-focus); }
</style>
      <section aria-label="LearnAble lesson">
        <div class="media-row">
        <div class="stage" tabindex="0" role="region" aria-label="Lesson picture. Press question mark for keyboard shortcuts.">
          <slot name="media"></slot>
          <video data-fallback playsinline preload="metadata" poster="${resolveUrl("/media/poster.png")}"></video>
          <p class="caption" aria-hidden="true"></p>
          <p class="media-error" data-media-error hidden role="alert"></p>
        </div>
        <button type="button" class="sign-grip" aria-label="Resize the sign panel">Resize</button>
        ${
          sign
            ? `<aside class="sign" data-sign aria-label="${ASL_GLOSS_LABEL}">
                <div class="sign-head">
                  <h2 data-sign-heading class="sign-drag-handle">ASL</h2>
                  <button type="button" class="sign-resize-grip" data-sign-resize aria-label="Resize sign window">Resize</button>
                </div>
                <p class="sr" aria-live="polite" data-sign-live></p>
                <p class="sign-missing" data-sign-notice hidden></p>
                <p class="sign-video-label" data-sign-label hidden></p>
                <video data-sign-video muted playsinline preload="metadata" hidden></video>
                <div class="hands" data-hands></div>
                <p class="sign-kind" data-sign-kind></p>
                <p class="gloss gloss-small" data-gloss-corrected lang="en"></p>
                <p class="sign-note" data-sign-note></p>
                <details class="sign-info">
                  <summary>About this ASL</summary>
                  <p>${ASL_GLOSS_LABEL}. Computer-generated signing uses ASL fingerspelling. A real recording is optional. If you have one, put an H.264 file at public/media/signs/ and set its clip in src/content/signs.json. This panel does not require that file.</p>
                  <p data-model-term>Model output (${GLOSS_MODEL})</p>
                  <p class="gloss gloss-small" data-gloss-model lang="en"></p>
                  <p>Fingerspelling drawings are public domain, from WPClipart (edited by Paul Sherman), the files Sign language A.svg through Z.svg on Wikimedia Commons. ASL-LEX is CC BY-NC, so it is not included. Lifeprint and Handspeak are not open licences, so they are not included. No lexical sign picture is shipped. Every word here is fingerspelled.</p>
                </details>
                <p class="spell" data-spell></p>
                <video data-gloss-clip muted playsinline preload="metadata" hidden></video>
                <p class="sign-moved" aria-live="polite" data-sign-moved></p>
                <div class="row">
                  <span class="sign-move-controls">
                    <button type="button" data-act="move" aria-pressed="false" aria-keyshortcuts="ArrowUp ArrowDown ArrowLeft ArrowRight">Move</button>
                  </span>
                  <button type="button" data-act="shrink">Smaller</button>
                  <button type="button" data-act="grow">Larger</button>
                  <button type="button" data-act="reset">Reset</button>
                  <button type="button" data-act="left">Narrower</button>
                  <button type="button" data-act="right">Wider</button>
                </div>
              </aside>`
            : ""
        }
        </div>
        <p class="status" aria-live="polite">Paused.</p>
        <p class="time" data-time>0:00 of 0:00.</p>
        <p class="ad-live" aria-live="polite" data-ad-live></p>
        <div class="row">
          <button type="button" data-act="play">Play</button>
          <button type="button" data-act="captions">Captions: English</button>
          ${describe ? `<button type="button" data-act="ad" aria-pressed="${getSettings().audioDescription}">Audio description</button>
          <fieldset data-ad-choice>
            <legend>Audio description</legend>
            <label><input type="radio" name="ad-mode" value="off" data-ad-mode="off"${getSettings().descriptionMode === "off" ? " checked" : ""}> Off</label>
            <label><input type="radio" name="ad-mode" value="spoken" data-ad-mode="spoken"${getSettings().descriptionMode === "spoken" ? " checked" : ""}> Spoken</label>
            <label><input type="radio" name="ad-mode" value="text" data-ad-mode="text"${getSettings().descriptionMode === "text" ? " checked" : ""}> Text for my screen reader</label>
          </fieldset>` : ""}
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
          ${docs ? `<button type="button" data-act="html">Download HTML</button>` : ""}
          <button type="button" data-act="vtt-en">Download English VTT</button>
          <button type="button" data-act="vtt-am">Download Amharic VTT</button>
        </div>
        <h2>Transcript</h2>
        <ol class="transcript"></ol>
        <h2>Job card</h2>
        <p data-job>${jobs[0]?.summary ?? ""}</p>
        <p lang="am" data-job-am>${jobs[0]?.summaryAm ?? ""}</p>
        <p data-job-voice role="status"></p>
        <div class="row">
          <button type="button" data-act="job">Play audio summary</button>
          <button type="button" data-act="badge">Check certificate</button>
        </div>
        <h2>Session chat</h2>
        <ol class="chat">
          ${lesson.chat.map((line) => `<li><span>${formatTime(line.time)}</span> ${line.speaker}: ${line.text}</li>`).join("")}
        </ol>
        <button type="button" data-act="txt">Download transcript text</button>
      </section>
    `;
    this.bindMedia();
    const grip = this.root.querySelector<HTMLElement>(".sign-grip");
    grip?.addEventListener("pointerdown", (event) => this.dragSign(event));
    grip?.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowDown") this.nudge("left");
      if (event.key === "ArrowRight" || event.key === "ArrowUp") this.nudge("right");
      if (event.key === "Home") this.setSignColumn(12);
      if (event.key === "End") this.setSignColumn(24);
    });
    this.root.querySelector<HTMLElement>("[data-sign-heading]")?.addEventListener("pointerdown", (event) => this.dragFrame(event));
    this.root.querySelector<HTMLElement>("[data-sign-resize]")?.addEventListener("pointerdown", (event) => this.resizeFramePointer(event));
    this.root.querySelector<HTMLButtonElement>("[data-act=move]")?.addEventListener("keydown", (event) => this.onMoveKey(event));
    this.signClip = this.root.querySelector("[data-sign-video]");
    this.signClip?.addEventListener("loadeddata", () => {
      this.signLoad = "ready";
      this.applySignPresentation();
      this.bindSignSync();
    });
    this.signClip?.addEventListener("error", () => {
      this.signLoad = "error";
      if (this.signClip) this.signClip.hidden = true;
      this.applySignPresentation();
      this.bindSignSync();
    });
    this.frame = readStoredFrame(this.storage(), EMBED_SIGN_FRAME_KEY) ?? { ...DEFAULT_FRAME };
    this.layoutSign();
    this.applySignSource();
    const stage = this.root.querySelector<HTMLElement>(".stage");
    stage?.addEventListener("keydown", (event) => this.onKey(event));
    this.root.querySelectorAll<HTMLButtonElement>("button[data-act]").forEach((button) => {
      button.addEventListener("click", () => this.onAction(button.dataset.act || ""));
    });
    this.root.addEventListener("click", (event) => {
      const button = event.target instanceof Element ? event.target.closest("button[data-act]") : null;
      if (!(button instanceof HTMLButtonElement)) return;
      if (button.dataset.act === "sign-prev" || button.dataset.act === "sign-next") return;
    });
    this.root.querySelectorAll<HTMLInputElement>("[data-ad-mode]").forEach((input) => {
      input.addEventListener("change", () => {
        if (!input.checked) return;
        const mode: DescriptionMode = input.value === "text" || input.value === "spoken" ? input.value : "off";
        this.applyDescriptionMode(mode);
      });
    });
    this.root.querySelector<HTMLInputElement>("[data-act=size]")?.addEventListener("input", (event) => {
      const value = Number((event.target as HTMLInputElement).value);
      updateSettings({ captionScale: value });
      this.styleCaption(value, getSettings().captionPreset);
    });
    this.root.querySelector<HTMLSelectElement>("[data-act=preset]")?.addEventListener("change", (event) => {
      const preset = (event.target as HTMLSelectElement).value as CaptionPreset;
      updateSettings({ captionPreset: preset });
      this.styleCaption(getSettings().captionScale, preset);
    });
    this.video?.addEventListener("timeupdate", () => this.sync());
    this.video?.addEventListener("seeking", () => {
      this.adLock = null;
      window.clearTimeout(this.adTimer);
      stopSpeaking();
    });
    this.video?.addEventListener("error", () => this.showMediaError());
    this.video?.addEventListener("play", () => {
      this.clearMediaError();
      this.setPlayLabel(true);
      this.setStatus("Playing.");
      emit(this, "learnable-play", { playing: true });
    });
    this.video?.addEventListener("pause", () => {
      this.setPlayLabel(false);
      if (!this.held) this.setStatus("Paused.");
      emit(this, "learnable-play", { playing: false });
    });
  }

  private bindMedia(): void {
    const media = this.querySelector("video, audio");
    const fallback = this.root.querySelector<HTMLVideoElement>("[data-fallback]");
    if (media instanceof HTMLMediaElement && media.slot === "media") {
      this.video = media;
      if (fallback) fallback.hidden = true;
      media.setAttribute("playsinline", "");
      if (media instanceof HTMLVideoElement && !media.getAttribute("poster")) media.poster = resolveUrl("/media/poster.png");
    } else if (fallback) {
      this.video = fallback;
      const src = this.getAttribute("src");
      if (src) fallback.src = resolveUrl(src);
    }
    this.ensureDescriptionTrack();
    const frame = this.querySelector("iframe");
    if (frame) {
      if (!frame.getAttribute("title")) frame.setAttribute("title", "Embedded lesson video");
      if (!frame.getAttribute("sandbox")) frame.setAttribute("sandbox", "allow-scripts allow-same-origin allow-presentation");
    }
  }

  private signColumn(): number {
    const row = this.root.querySelector<HTMLElement>(".media-row");
    const value = Number.parseFloat(row?.style.getPropertyValue("--sign-col") || "16");
    return Number.isFinite(value) ? value : 16;
  }

  private setSignColumn(rem: number): void {
    const row = this.root.querySelector<HTMLElement>(".media-row");
    if (row) row.style.setProperty("--sign-col", `${Math.min(28, Math.max(10, rem))}rem`);
  }

  private dragSign(event: PointerEvent): void {
    if (event.button !== 0) return;
    const handle = event.currentTarget;
    if (!(handle instanceof HTMLElement)) return;
    const startX = event.clientX;
    const origin = this.signColumn();
    const move = (next: PointerEvent) => this.setSignColumn(origin + (startX - next.clientX) / 16);
    const up = () => {
      handle.removeEventListener("pointermove", move);
      handle.removeEventListener("pointerup", up);
    };
    handle.setPointerCapture(event.pointerId);
    handle.addEventListener("pointermove", move);
    handle.addEventListener("pointerup", up);
  }

  private async loadTracks(): Promise<void> {
    this.en = await this.fetchCues(this.getAttribute("captions-en"));
    this.am = await this.fetchCues(this.getAttribute("captions-am"));
    this.ad = await this.fetchCues(this.getAttribute("describe"));
    const amDescription = this.getAttribute("descriptions-am") || (this.getAttribute("describe") && this.getAttribute("describe") !== "false" ? "/media/descriptions-am.vtt" : null);
    this.adAm = await this.fetchCues(amDescription);
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
      const response = await safeFetch(resolveUrl(url));
      if (!response.ok) return [];
      return parseVtt(await response.text());
    } catch {
      return [];
    }
  }

  private applySettings(): void {
    const settings = getSettings();
    this.mode = settings.lang;
    if (settings.contrastMode !== "off" || settings.highContrast) this.setAttribute("contrast", "high");
    else this.removeAttribute("contrast");
    this.setAttribute("theme", getTheme());
    const preset = this.root.querySelector<HTMLSelectElement>("[data-act=preset]");
    const size = this.root.querySelector<HTMLInputElement>("[data-act=size]");
    if (preset) preset.value = settings.captionPreset;
    if (size) size.value = String(settings.captionScale);
    this.styleCaption(settings.captionScale, settings.captionPreset);
    this.root.querySelectorAll<HTMLInputElement>("[data-ad-mode]").forEach((input) => {
      input.checked = input.value === settings.descriptionMode;
    });
    const adButton = this.root.querySelector<HTMLButtonElement>("[data-act=ad]");
    if (adButton) adButton.setAttribute("aria-pressed", String(settings.descriptionMode !== "off"));
    this.sync();
  }

  private ensureDescriptionTrack(): void {
    if (!(this.video instanceof HTMLVideoElement)) return;
    const src = this.getAttribute("describe");
    if (!src || src === "false") return;
    const url = resolveUrl(src);
    let track = this.video.querySelector<HTMLTrackElement>("track[kind='descriptions']");
    if (!track) {
      track = document.createElement("track");
      track.kind = "descriptions";
      track.label = "Audio description";
      track.srclang = "en";
      this.video.append(track);
    }
    if (track.getAttribute("src") !== url) track.src = url;
    const amSrc = this.getAttribute("descriptions-am") || "/media/descriptions-am.vtt";
    let amTrack = this.video.querySelector<HTMLTrackElement>("track[data-descriptions-am]");
    if (!amTrack) {
      amTrack = document.createElement("track");
      amTrack.kind = "descriptions";
      amTrack.label = "Amharic audio description";
      amTrack.srclang = "am";
      amTrack.dataset.descriptionsAm = "true";
      this.video.append(amTrack);
    }
    const amUrl = resolveUrl(amSrc);
    if (amTrack.getAttribute("src") !== amUrl) amTrack.src = amUrl;
  }

  private resumeHeld(): void {
    if (!this.held || !this.video) return;
    this.held = false;
    void this.video.play().catch(() => undefined);
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
    const clock = this.root.querySelector("[data-time]");
    if (clock && this.video) clock.textContent = `${formatTime(this.video.currentTime)} of ${formatTime(this.video.duration || 0)}.`;
  }

  private paintHands(frames: SignVisual[], note = "", word = ""): void {
    const host = this.root.querySelector<HTMLElement>("[data-hands]");
    if (host) host.replaceChildren();
    const key = frames.map((frame) => frame.alt).join("|") + note;
    if (!frames.length) {
      this.handKey = "";
      closeHands(false);
      return;
    }
    if (key === this.handKey) return;
    this.handKey = key;
    presentHands(frames, { word, note, anchor: this, source: "lesson" });
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
    const panel = signPanel(cue?.text || "", this.mode);
    const englishCue = this.mode === "am" ? cueAt(this.en, time) : cue;
    const glossSource = this.mode === "am" ? signPanel(englishCue?.text || "", "en") : panel;
    const frames = glossSource.gloss ? visualsFor(glossSource.gloss) : [];
    const amharicNote = this.mode === "am" ? "English letters only. Amharic is not fingerspelled." : "";
    this.paintHands(frames, amharicNote, glossSource.gloss);
    const corrected = this.root.querySelector("[data-gloss-corrected]");
    const model = this.root.querySelector("[data-gloss-model]");
    const modelTerm = this.root.querySelector<HTMLElement>("[data-model-term]");
    if (corrected) corrected.textContent = panel.source === "precomputed" ? `Corrected by hand. ${panel.gloss}` : panel.gloss;
    if (model) model.textContent = panel.model;
    if (modelTerm) modelTerm.hidden = !panel.model;
    const kind = this.root.querySelector("[data-sign-kind]");
    if (kind) {
      kind.textContent = frames.length
        ? "Fingerspelled. These drawings are handshapes, not recorded signs."
        : "";
    }
    const note = this.root.querySelector("[data-sign-note]");
    if (note) note.textContent = panel.source === "precomputed" ? "" : panel.note;
    const live = this.root.querySelector("[data-sign-live]");
    const summary = panel.source === "amharic" ? panel.note : signSummary(frames);
    if (live && live.textContent !== summary) live.textContent = summary;
    const spell = this.root.querySelector("[data-spell]");
    if (spell) spell.textContent = frames.length ? "" : panel.spell;
    const glossClip = this.root.querySelector<HTMLVideoElement>("[data-gloss-clip]");
    if (glossClip) {
      if (panel.clip) {
        glossClip.hidden = false;
        const next = resolveUrl(panel.clip);
        if (glossClip.getAttribute("src") !== next) {
          glossClip.src = next;
          void glossClip.play().catch(() => undefined);
        }
      } else if (!glossClip.hidden) {
        glossClip.pause();
        glossClip.hidden = true;
      }
    }
    this.deliverDescription();
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
      if (this.video.paused) {
        await this.video.play();
        if (this.signClip?.getAttribute("src")) {
          try {
            void this.signClip.play().catch(() => undefined);
          } catch {
            /* The lesson keeps playing when the sign file cannot. */
          }
        }
      } else {
        this.video.pause();
        try {
          this.signClip?.pause();
        } catch {
          /* The lesson keeps its own pause state. */
        }
      }
    } catch {
      this.showMediaError("The video did not play. Captions are still listed when the file loads.");
    }
  }

  private showMediaError(message?: string): void {
    const box = this.root.querySelector<HTMLElement>("[data-media-error]");
    if (!box) return;
    const code = this.video?.error?.code;
    const reason = code === 3 ? "The browser could not decode this video." : code === 4 ? "This video format is not supported." : code === 2 ? "The video file did not load." : message || "The video did not play.";
    const src = this.video?.currentSrc || this.video?.getAttribute("src") || "";
    box.hidden = false;
    box.replaceChildren();
    box.append(document.createTextNode(`${reason} `));
    if (src) {
      const link = document.createElement("a");
      link.href = src;
      link.download = "";
      link.textContent = "Download the video";
      box.append(link);
    }
    this.setStatus(reason);
  }

  private clearMediaError(): void {
    const box = this.root.querySelector<HTMLElement>("[data-media-error]");
    if (box) {
      box.hidden = true;
      box.replaceChildren();
    }
  }

  private cycleCaptions(): void {
    this.mode = this.mode === "off" ? "en" : this.mode === "en" ? "am" : "off";
    this.sync();
    this.setStatus(this.mode === "off" ? "Captions off." : this.mode === "am" ? "Amharic captions on." : "English captions on.");
    emit(this, "learnable-captions", { lang: this.mode });
  }

  private applyDescriptionMode(mode: DescriptionMode): void {
    updateSettings({ descriptionMode: mode, audioDescription: mode !== "off" });
    this.adLock = null;
    window.clearTimeout(this.adTimer);
    if (mode !== "spoken") stopSpeaking();
    if (mode === "off") this.resumeHeld();
    const live = this.root.querySelector<HTMLElement>("[data-ad-live]");
    if (live && mode !== "text") live.textContent = "";
    const button = this.root.querySelector<HTMLButtonElement>("[data-act=ad]");
    if (button) button.setAttribute("aria-pressed", String(mode !== "off"));
    this.setStatus(mode === "off" ? "Audio description off." : mode === "text" ? "Audio description as text." : "Audio description on.");
    this.sync();
  }

  private toggleAd(): void {
    const current = getSettings().descriptionMode;
    const next: DescriptionMode = current === "off" ? "spoken" : current === "spoken" ? "text" : "off";
    this.applyDescriptionMode(next);
  }

  private descriptionCues(): Cue[] {
    return getSettings().lang === "am" && this.adAm.length ? this.adAm : this.ad;
  }

  private deliverDescription(): void {
    if (!this.video) return;
    const settings = getSettings();
    const live = this.root.querySelector<HTMLElement>("[data-ad-live]");
    if (settings.descriptionMode === "off") {
      this.adLock = null;
      if (live) live.textContent = "";
      return;
    }
    if (this.video.paused && !this.held) return;
    const planned = scheduleDescriptions(this.descriptionCues(), settings.readRate);
    const cue = cueToDeliver(planned, this.video.currentTime, this.adLock);
    if (!cue) return;
    this.adLock = { text: cue.text, start: cue.start, holdUntil: cue.holdUntil };
    const extended = needsExtendedDescription(cue.text, Math.max(0, cue.end - cue.start), settings.readRate);
    const lang = settings.lang === "am" && this.adAm.length ? "am" : "en";
    if (extended && !this.video.paused) {
      this.held = true;
      this.video.pause();
    }
    if (settings.descriptionMode === "text") {
      stopSpeaking();
      if (live) {
        live.lang = lang;
        live.textContent = cue.text;
      }
      if (extended) {
        window.clearTimeout(this.adTimer);
        this.adTimer = window.setTimeout(() => this.resumeHeld(), spokenSeconds(cue.text, settings.readRate) * 1000);
      }
      return;
    }
    if (live) live.textContent = "";
    speak(cue.text, lang, settings.readRate, {
      pitch: settings.readPitch,
      onend: () => this.resumeHeld(),
      oncancel: () => this.resumeHeld(),
    });
  }

  private nudge(direction: string): void {
    const delta = direction === "left" || direction === "shrink" ? -2 : 2;
    this.setSignColumn(this.signColumn() + delta);
  }

  private scaleSign(step: number): void {
    this.setSignColumn(this.signColumn() + step * 2);
  }

  private signLang(): string {
    return (this.getAttribute("sign-lang") || "").trim().toLowerCase();
  }

  private signOffset(): number {
    const value = Number(this.getAttribute("sign-offset"));
    return Number.isFinite(value) ? value : 0;
  }

  private storage(): Storage | null {
    try {
      return window.localStorage;
    } catch {
      return null;
    }
  }

  private signBounds() {
    const rect = this.getBoundingClientRect();
    if (rect.width >= 32 && rect.height >= 32) return { left: 0, top: 0, width: rect.width, height: rect.height };
    return boundsFromRect(null, { width: window.innerWidth || 0, height: window.innerHeight || 0 });
  }

  private signStacked(): boolean {
    if (mediaMatches("(max-width: 52rem)")) return true;
    const width = this.getBoundingClientRect().width;
    return width > 0 && width <= 36 * 16;
  }

  private persistFrame(): void {
    writeStoredFrame(this.storage(), EMBED_SIGN_FRAME_KEY, this.frame);
  }

  private layoutSign(): void {
    const sign = this.root.querySelector<HTMLElement>(".sign");
    if (!sign) return;
    const stacked = this.signStacked();
    sign.classList.toggle("sign-stacked", stacked);
    sign.classList.remove("sign-float");
    const move = this.root.querySelector<HTMLElement>(".sign-move-controls");
    if (move) move.hidden = stacked;
    sign.style.left = "";
    sign.style.top = "";
    sign.style.width = "";
    sign.style.height = "";
  }

  private applySignSource(): void {
    this.signClip = this.root.querySelector("[data-sign-video]");
    const src = this.getAttribute("sign");
    const view = presentSign({ src, signLang: this.signLang(), load: "idle" });
    this.signLoad = view.showVideo ? "loading" : "idle";
    if (this.signClip) {
      this.signClip.muted = true;
      if (!view.showVideo) {
        this.signClip.removeAttribute("src");
        this.signClip.hidden = true;
      } else if (src) {
        const url = resolveUrl(src);
        if (this.signClip.getAttribute("src") !== url) this.signClip.src = url;
        this.signClip.hidden = false;
      }
    }
    this.applySignPresentation();
    this.bindSignSync();
  }

  private applySignPresentation(): void {
    const view = presentSign({ src: this.getAttribute("sign"), signLang: this.signLang(), load: this.signLoad });
    const heading = this.root.querySelector("[data-sign-heading]");
    if (heading) heading.textContent = view.shortHeading;
    const aside = this.root.querySelector("[data-sign]");
    if (aside) aside.setAttribute("aria-label", view.heading);
    const notice = this.root.querySelector<HTMLElement>("[data-sign-notice]");
    if (notice) {
      notice.hidden = !view.missingNotice;
      notice.textContent = view.missingNotice ?? "";
    }
    const label = this.root.querySelector<HTMLElement>("[data-sign-label]");
    if (label) {
      label.hidden = !view.videoLabel;
      label.textContent = view.videoLabel ?? "";
    }
    if (this.signClip) this.signClip.hidden = !view.showVideo;
  }

  private bindSignSync(): void {
    this.stopSignSync?.();
    this.stopSignSync = undefined;
    const view = presentSign({ src: this.getAttribute("sign"), signLang: this.signLang(), load: this.signLoad });
    if (!this.video || !this.signClip || !view.showVideo) return;
    this.stopSignSync = attachSignSync(this.video, this.signClip, () => this.signOffset());
  }

  private enterMove(): void {
    this.moving = true;
    this.root.querySelector("[data-act=move]")?.setAttribute("aria-pressed", "true");
  }

  private exitMove(announce = true): void {
    this.moving = false;
    window.clearTimeout(this.moveTimer);
    this.root.querySelector("[data-act=move]")?.setAttribute("aria-pressed", "false");
    if (!announce) return;
    const live = this.root.querySelector("[data-sign-moved]");
    if (live) live.textContent = movedAnnouncement(this.frame);
  }

  private nudgeFrameBy(dx: number, dy: number): void {
    this.frame = nudgeFrame(this.frame, dx, dy, this.signBounds());
    this.persistFrame();
    this.layoutSign();
    window.clearTimeout(this.moveTimer);
    this.moveTimer = window.setTimeout(() => {
      const live = this.root.querySelector("[data-sign-moved]");
      if (live) live.textContent = movedAnnouncement(this.frame);
    }, 800);
  }

  private onMoveKey(event: KeyboardEvent): void {
    if (event.key === "Escape") {
      event.preventDefault();
      if (this.moving) this.exitMove();
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (this.moving) this.exitMove();
      else this.enterMove();
      return;
    }
    if (!this.moving) return;
    const step = event.shiftKey ? NUDGE_SHIFT_PX : NUDGE_PX;
    let dx = 0;
    let dy = 0;
    if (event.key === "ArrowLeft") dx = -step;
    else if (event.key === "ArrowRight") dx = step;
    else if (event.key === "ArrowUp") dy = -step;
    else if (event.key === "ArrowDown") dy = step;
    else return;
    event.preventDefault();
    this.nudgeFrameBy(dx, dy);
  }

  private dragFrame(event: PointerEvent): void {
    if (this.signStacked() || event.button !== 0) return;
    const handle = event.currentTarget;
    if (!(handle instanceof HTMLElement)) return;
    const startX = event.clientX;
    const startY = event.clientY;
    const origin = { ...this.frame };
    const move = (next: PointerEvent) => {
      this.frame = nudgeFrame(origin, next.clientX - startX, next.clientY - startY, this.signBounds());
      this.layoutSign();
    };
    const up = () => {
      handle.removeEventListener("pointermove", move);
      handle.removeEventListener("pointerup", up);
      this.persistFrame();
      const live = this.root.querySelector("[data-sign-moved]");
      if (live) live.textContent = movedAnnouncement(this.frame);
    };
    handle.setPointerCapture(event.pointerId);
    handle.addEventListener("pointermove", move);
    handle.addEventListener("pointerup", up);
  }

  private resizeFramePointer(event: PointerEvent): void {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    const handle = event.currentTarget;
    if (!(handle instanceof HTMLElement)) return;
    const startX = event.clientX;
    const origin = this.signColumn();
    const move = (next: PointerEvent) => {
      this.setSignColumn(origin + (next.clientX - startX) / 16);
    };
    const up = () => {
      handle.removeEventListener("pointermove", move);
      handle.removeEventListener("pointerup", up);
      this.persistFrame();
    };
    handle.setPointerCapture(event.pointerId);
    handle.addEventListener("pointermove", move);
    handle.addEventListener("pointerup", up);
  }

  private toggleSign(): void {
    this.signOn = !this.signOn;
    const sign = this.root.querySelector<HTMLElement>("[data-sign]");
    if (sign) sign.hidden = !this.signOn;
    const button = this.root.querySelector<HTMLButtonElement>("[data-act=sign]");
    if (button) button.setAttribute("aria-pressed", String(this.signOn));
    this.setStatus(this.signOn ? "Sign window opened." : "Sign window closed.");
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
    if (action === "ad") this.applyDescriptionMode(getSettings().descriptionMode === "off" ? "spoken" : "off");
    if (action === "sign") this.toggleSign();
    if (action === "left" || action === "right" || action === "up" || action === "down") this.nudge(action);
    if (action === "shrink" || action === "grow") this.scaleSign(action === "grow" ? 1 : -1);
    if (action === "move") {
      if (this.moving) this.exitMove();
      else this.enterMove();
    }
    if (action === "reset") {
      this.frame = { ...DEFAULT_FRAME };
      this.persistFrame();
      this.setSignColumn(16);
      this.layoutSign();
    }
    if (action === "pack") {
      try {
        const packed = await buildClientPack({
          english: this.textOf(this.en),
          amharic: this.textOf(this.am),
          descriptions: this.textOf(this.ad),
          audioEn: this.optionalUrl("audio-en"),
          audioAm: this.optionalUrl("audio-am"),
        });
        saveFile(packed.bytes, "learnable-3g-pack.zip", "application/zip");
        this.setStatus(packed.audio ? "3G pack downloaded, with narration and text." : "Text pack downloaded. Narration files were not beside the video.");
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
      try {
        const shipped = await safeFetch(resolveUrl(this.getAttribute("pdf") || "/media/learnable-lesson.pdf"));
        if (shipped.ok) {
          saveFile(new Uint8Array(await shipped.arrayBuffer()), "learnable-lesson.pdf", "application/pdf");
          this.setStatus("Tagged PDF downloaded, with Amharic and the picture description.");
          return;
        }
      } catch {
        /* The text file below is built on this page. */
      }
      const pdf = buildTaggedPdf({
        title: "LearnAble lesson",
        paragraphs: this.en.map((cue) => cue.text),
        figureAlt: "Lesson picture with English and Amharic captions.",
      });
      saveFile(pdf, "learnable-lesson.pdf", "application/pdf");
      this.setStatus("Tagged PDF downloaded. Amharic stays in the captions.");
    }
    if (action === "html") {
      const english = this.en.map((cue) => `<h2>${cue.text}</h2>`).join("");
      const amharic = this.am.map((cue) => `<p lang="am">${cue.text}</p>`).join("");
      const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>LearnAble lesson</title></head><body><main><h1>LearnAble lesson</h1><p>Picture: A navy phone on a paper background, with an English and Amharic caption under the screen.</p>${english}${amharic}</main></body></html>`;
      saveFile(new TextEncoder().encode(html), "learnable-lesson.html", "text/html");
      this.setStatus("HTML text version downloaded, with the picture description.");
    }
    if (action === "txt") {
      const text = `English\n${this.textOf(this.en)}\n\nAmharic\n${this.textOf(this.am)}\n`;
      saveFile(new TextEncoder().encode(text), "learnable-transcript.txt", "text/plain");
      this.setStatus("Transcript text downloaded.");
    }
    if (action === "vtt-en" || action === "vtt-am") {
      const cues = action === "vtt-am" ? this.am : this.en;
      saveFile(new TextEncoder().encode(cuesToVtt(cues)), action === "vtt-am" ? "captions-am.vtt" : "captions-en.vtt", "text/vtt");
      this.setStatus(action === "vtt-am" ? "Amharic captions downloaded." : "English captions downloaded.");
    }
    if (action === "job") {
      const lang = getSettings().lang === "am" ? "am" : "en";
      const job = jobs[0];
      const summary = lang === "am" ? job?.summaryAm || "" : job?.summary || "";
      const note = this.root.querySelector("[data-job-voice]");
      if (lang === "am" && (await whenVoice("am")) !== "ready") {
        if (note) note.textContent = "No Amharic voice is available on this device. The Amharic summary stays on this page.";
        return;
      }
      if (note) note.textContent = "";
      speak(summary, lang);
      this.setStatus(lang === "am" ? "Playing the Amharic job summary on this device." : "Playing the job summary on this device.");
    }
    if (action === "badge") {
      const ok = await verifyOpenBadge();
      this.setStatus(ok ? "The certificate proof matches the published public key." : "The certificate proof does not match.");
    }
  }

  private optionalUrl(name: string): string | undefined {
    const value = this.getAttribute(name);
    if (!value || value === "false") return undefined;
    return resolveUrl(value);
  }
}

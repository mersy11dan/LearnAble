import { rememberScript, setAssetBase } from "./assets";
import { runEnhance } from "./enhance";
import { applyHost, clearHost } from "./host";
import { LearnAblePlayer } from "./player";
import { enhancePart, type LearnAbleConfig } from "./settings";
import { LearnAbleToolbar } from "./toolbar";
import { startVoice } from "./voice";
import {
  configure,
  getFeatures,
  getSettings,
  loadSettings,
  resetSettings,
  updateSettings,
  type WidgetSettings,
} from "./settings";

rememberScript(document.currentScript instanceof HTMLScriptElement ? document.currentScript : null);

export type { LearnAbleConfig, WidgetSettings };

let booted = false;
let autoToolbar: LearnAbleToolbar | null = null;

function defineElements(): void {
  if (!customElements.get("learnable-player")) customElements.define("learnable-player", LearnAblePlayer);
  if (!customElements.get("learnable-toolbar")) customElements.define("learnable-toolbar", LearnAbleToolbar);
}

function scriptConfig(): LearnAbleConfig {
  const script = document.querySelector("script[src*='learnable']");
  const attr = script?.getAttribute("data-learnable-enhance");
  const root = document.documentElement.dataset.learnableEnhance;
  const lang = script?.getAttribute("data-learnable-lang");
  const voiceAttr = script?.getAttribute("data-learnable-voice");
  const off = root === "off" || attr === "false" || attr === "off";
  return {
    enhance: off ? false : true,
    lang: lang === "am" || lang === "en" ? lang : undefined,
    assetBase: script?.getAttribute("data-learnable-base") || undefined,
    voice: voiceAttr === "on" || voiceAttr === "off" ? voiceAttr : undefined,
  };
}

function mountToolbar(): void {
  if (!enhancePart("toolbar") || !getFeatures().toolbar || document.documentElement.dataset.learnableToolbar === "page") {
    autoToolbar?.remove();
    autoToolbar = null;
    return;
  }
  if (document.querySelector("learnable-toolbar")) return;
  autoToolbar = document.createElement("learnable-toolbar") as LearnAbleToolbar;
  autoToolbar.dataset.auto = "true";
  document.body?.append(autoToolbar);
}

function startup(extra: LearnAbleConfig = {}): void {
  const fromScript = scriptConfig();
  const enhance = extra.enhance !== undefined ? extra.enhance : fromScript.enhance;
  configure({ ...fromScript, ...extra, enhance });
  setAssetBase(extra.assetBase || fromScript.assetBase);
  defineElements();
  applyHost(getSettings());
  mountToolbar();
  if (enhance !== false) runEnhance();
  startVoice();
  document.querySelectorAll("learnable-player").forEach((element) => {
    if (element instanceof LearnAblePlayer) element.refresh();
  });
  booted = true;
  window.dispatchEvent(new CustomEvent("learnable-ready", { detail: { settings: getSettings(), features: getFeatures() } }));
}

export function boot(): void {
  const settings = loadSettings();
  updateSettings(settings);
  startup();
}

export function init(config: LearnAbleConfig = {}): typeof api {
  startup(config);
  return api;
}

export function reset(): WidgetSettings {
  const settings = resetSettings();
  clearHost();
  applyHost(settings);
  return settings;
}

const api = {
  init,
  boot,
  reset,
  getSettings,
  setSettings(partial: Partial<WidgetSettings>) {
    const next = updateSettings(partial);
    applyHost(next);
    return next;
  },
  getFeatures,
  version: "0.3.0",
};

declare global {
  interface Window {
    LearnAble?: typeof api;
  }
}

if (typeof window !== "undefined") {
  window.LearnAble = api;
  defineElements();
  const start = () => {
    if (!booted) boot();
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
}

export default api;

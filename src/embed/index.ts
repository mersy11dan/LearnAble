import { applyHost, clearHost } from "./host";
import { LearnAblePlayer } from "./player";
import { LearnAbleToolbar } from "./toolbar";
import {
  configure,
  getFeatures,
  getSettings,
  loadSettings,
  resetSettings,
  updateSettings,
  type LearnAbleConfig,
  type WidgetSettings,
} from "./settings";

export type { LearnAbleConfig, WidgetSettings };

let booted = false;
let autoToolbar: LearnAbleToolbar | null = null;

function defineElements(): void {
  if (!customElements.get("learnable-player")) customElements.define("learnable-player", LearnAblePlayer);
  if (!customElements.get("learnable-toolbar")) customElements.define("learnable-toolbar", LearnAbleToolbar);
}

function mountToolbar(): void {
  if (!getFeatures().toolbar || document.documentElement.dataset.learnableToolbar === "page") {
    autoToolbar?.remove();
    autoToolbar = null;
    return;
  }
  if (document.querySelector("learnable-toolbar")) return;
  autoToolbar = document.createElement("learnable-toolbar") as LearnAbleToolbar;
  autoToolbar.dataset.auto = "true";
  document.body?.append(autoToolbar);
}

export function boot(): void {
  defineElements();
  const settings = loadSettings();
  updateSettings(settings);
  applyHost(getSettings());
  mountToolbar();
  booted = true;
  window.dispatchEvent(new CustomEvent("learnable-ready", { detail: { settings: getSettings(), features: getFeatures() } }));
}

export function init(config: LearnAbleConfig = {}): typeof api {
  configure(config);
  defineElements();
  applyHost(getSettings());
  mountToolbar();
  document.querySelectorAll("learnable-player").forEach((element) => {
    if (element instanceof LearnAblePlayer) element.refresh();
  });
  booted = true;
  window.dispatchEvent(new CustomEvent("learnable-ready", { detail: { settings: getSettings(), features: getFeatures() } }));
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
  version: "0.2.0",
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

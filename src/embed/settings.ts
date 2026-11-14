export type CaptionPreset = "white" | "yellow" | "black" | "cyan";
export type Lang = "en" | "am";

export type EnhanceFlag = boolean | {
  toolbar?: boolean;
  media?: boolean;
  skip?: boolean;
  landmarks?: boolean;
  keyboard?: boolean;
  images?: boolean;
  read?: boolean;
};

export type WidgetSettings = {
  lang: Lang;
  uiLang: Lang;
  largeText: boolean;
  highContrast: boolean;
  stopMotion: boolean;
  captionScale: number;
  captionPreset: CaptionPreset;
};

export type FeatureFlags = {
  toolbar: boolean;
  signWindow: boolean;
  audioDescription: boolean;
  offlinePack: boolean;
  braille: boolean;
  taggedDocs: boolean;
};

export type LearnAbleConfig = {
  lang?: Lang;
  uiLang?: Lang;
  theme?: "paper" | "navy";
  features?: Partial<FeatureFlags>;
  enhance?: EnhanceFlag;
  assetBase?: string;
};

export const PRESETS: Record<CaptionPreset, { label: string; fg: string; bg: string }> = {
  white: { label: "White on black", fg: "#ffffff", bg: "#111111" },
  yellow: { label: "Yellow on black", fg: "#ffee00", bg: "#111111" },
  black: { label: "Black on white", fg: "#172033", bg: "#f2f0ea" },
  cyan: { label: "Cyan on black", fg: "#00ffff", bg: "#111111" },
};

const KEY = "learnable-widget";

export const defaultFeatures = (): FeatureFlags => ({
  toolbar: true,
  signWindow: true,
  audioDescription: true,
  offlinePack: false,
  braille: false,
  taggedDocs: false,
});

export const defaultSettings = (): WidgetSettings => ({
  lang: "en",
  uiLang: "en",
  largeText: false,
  highContrast: false,
  stopMotion: false,
  captionScale: 1.15,
  captionPreset: "white",
});

let features = defaultFeatures();
let settings = defaultSettings();
let themeName: "paper" | "navy" = "paper";
let enhance: EnhanceFlag = true;

export function getEnhance(): EnhanceFlag {
  return enhance;
}

export function enhancePart(part: "toolbar" | "media" | "skip" | "landmarks" | "keyboard" | "images" | "read"): boolean {
  if (enhance === false) return false;
  if (enhance === true) return true;
  return enhance[part] !== false;
}

function prefersReduce(): boolean {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

export function loadSettings(): WidgetSettings {
  const base = defaultSettings();
  base.stopMotion = prefersReduce();
  try {
    const saved = localStorage.getItem(KEY);
    if (!saved) return base;
    const parsed = JSON.parse(saved) as Partial<WidgetSettings>;
    const lang = parsed.lang === "am" ? "am" : parsed.lang === "en" ? "en" : base.lang;
    const uiLang = parsed.uiLang === "am" ? "am" : parsed.uiLang === "en" ? "en" : base.uiLang;
    return { ...base, ...parsed, lang, uiLang };
  } catch {
    return base;
  }
}

export function getSettings(): WidgetSettings {
  return { ...settings };
}

export function getFeatures(): FeatureFlags {
  return { ...features };
}

export function getTheme(): "paper" | "navy" {
  return themeName;
}

export function saveSettings(next: WidgetSettings): void {
  settings = { ...next };
  localStorage.setItem(KEY, JSON.stringify(settings));
  window.dispatchEvent(new CustomEvent("learnable-settings", { detail: getSettings() }));
}

export function updateSettings(partial: Partial<WidgetSettings>): WidgetSettings {
  const next = { ...getSettings(), ...partial };
  saveSettings(next);
  return getSettings();
}

export function configure(config: LearnAbleConfig = {}): void {
  features = { ...defaultFeatures(), ...config.features };
  if (config.theme) themeName = config.theme;
  if (config.enhance !== undefined) enhance = config.enhance;
  const stored = loadSettings();
  settings = {
    ...stored,
    lang: config.lang ?? stored.lang,
    uiLang: config.uiLang ?? stored.uiLang,
  };
  saveSettings(settings);
}

export function resetSettings(): WidgetSettings {
  localStorage.removeItem(KEY);
  settings = defaultSettings();
  settings.stopMotion = prefersReduce();
  saveSettings(settings);
  return getSettings();
}

export function optedIn(element: HTMLElement, attribute: string, fallback: boolean): boolean {
  if (!element.hasAttribute(attribute)) return fallback;
  return element.getAttribute(attribute) !== "false";
}

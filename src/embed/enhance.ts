import { chromeCopy } from "./copy";
import { LearnAblePlayer } from "./player";
import { enhancePart, getSettings } from "./settings";

const MEDIA_ATTRS = ["captions-en", "captions-am", "sign", "describe", "audio-en", "audio-am", "offline", "braille", "docs"] as const;

function copyMediaAttributes(from: HTMLElement, player: LearnAblePlayer): void {
  for (const name of MEDIA_ATTRS) {
    const value = from.getAttribute(`data-learnable-${name}`);
    if (value !== null) player.setAttribute(name, value);
  }
  const src = from.getAttribute("src");
  if (src && !player.getAttribute("src")) player.setAttribute("src", src);
}

function upgradeElement(node: HTMLElement): void {
  if (node.dataset.learnableUpgraded === "true") return;
  if (node.closest("learnable-player")) return;
  node.dataset.learnableUpgraded = "true";
  const player = document.createElement("learnable-player") as LearnAblePlayer;
  copyMediaAttributes(node, player);
  if (!player.hasAttribute("offline")) player.setAttribute("offline", "");
  if (!player.hasAttribute("braille")) player.setAttribute("braille", "");
  if (!player.hasAttribute("docs")) player.setAttribute("docs", "");
  node.slot = "media";
  node.replaceWith(player);
  player.append(node);
}

export function upgradeMedia(): void {
  if (!enhancePart("media")) return;
  document.querySelectorAll("video, audio").forEach((node) => {
    if (node instanceof HTMLElement) upgradeElement(node);
  });
  document.querySelectorAll("iframe").forEach((frame) => {
    const src = frame.getAttribute("src") || "";
    if (!/youtube\.com|youtu\.be|player\.vimeo\.com|vimeo\.com/.test(src)) return;
    if (frame instanceof HTMLElement) upgradeElement(frame);
  });
}

function ensureSkip(): void {
  if (!enhancePart("skip")) return;
  if (document.querySelector("a.learnable-skip, a[href='#content'], a[href='#main']")) return;
  const main = document.querySelector("main");
  if (main && !main.id) main.id = "content";
  const link = document.createElement("a");
  link.className = "learnable-skip";
  link.href = main?.id ? `#${main.id}` : "#content";
  link.textContent = chromeCopy[getSettings().uiLang].skip;
  document.body.prepend(link);
}

function ensureLandmarks(): void {
  if (!enhancePart("landmarks")) return;
  const header = document.querySelector(".header");
  if (header && !document.querySelector("header, [role='banner']")) {
    header.setAttribute("role", "banner");
  }
  const sidebar = document.getElementById("sidebar");
  if (sidebar && !document.querySelector("nav, [role='navigation']")) {
    sidebar.setAttribute("role", "navigation");
    if (!sidebar.getAttribute("aria-label")) sidebar.setAttribute("aria-label", "Sidebar");
  }
}

function focusables(selector: string): HTMLElement[] {
  return [...document.querySelectorAll<HTMLElement>(selector)].filter((node) => !node.closest("learnable-player, learnable-toolbar"));
}

function move(items: HTMLElement[], current: HTMLElement, delta: number): void {
  const index = items.indexOf(current);
  if (index < 0) return;
  const next = items[(index + delta + items.length) % items.length];
  next.focus();
}

function onKey(event: KeyboardEvent): void {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  if (target.closest("learnable-player, learnable-toolbar, input, textarea, select")) return;

  if (target.classList.contains("hamburger") && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    target.click();
    target.setAttribute("aria-expanded", String(document.body.classList.contains("sidebar-collapsed") ? "false" : "true"));
  }

  if (event.key === "Escape") {
    document.querySelectorAll<HTMLElement>(".collapse.show").forEach((panel) => {
      const button = document.querySelector<HTMLElement>(`[data-bs-target="#${panel.id}"]`);
      if (button?.getAttribute("aria-expanded") === "true") button.click();
    });
    document.querySelectorAll<HTMLElement>(".dropdown-menu.show").forEach((menu) => {
      menu.classList.remove("show");
    });
  }

  const groups = [
    ".homepage-nav .nav-link",
    "button[data-section-index]",
    ".accordion-button",
    ".dropdown-menu.show .dropdown-item",
  ];
  if (event.key !== "ArrowRight" && event.key !== "ArrowLeft" && event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
  for (const selector of groups) {
    const items = focusables(selector);
    if (!items.includes(target)) continue;
    event.preventDefault();
    const delta = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
    move(items, target, delta);
    break;
  }
}

function ensureKeyboard(): void {
  if (!enhancePart("keyboard")) return;
  document.querySelectorAll<HTMLElement>(".hamburger").forEach((burger) => {
    if (burger.dataset.learnableKey === "true") return;
    burger.dataset.learnableKey = "true";
    burger.tabIndex = 0;
    burger.setAttribute("role", "button");
    burger.setAttribute("aria-label", chromeCopy[getSettings().uiLang].menu);
    burger.setAttribute("aria-expanded", String(!document.body.classList.contains("sidebar-collapsed")));
  });
  if (document.documentElement.dataset.learnableKeys === "true") return;
  document.documentElement.dataset.learnableKeys = "true";
  document.addEventListener("keydown", onKey);
}

function missingAlt(): HTMLImageElement[] {
  return [...document.querySelectorAll("img")].filter((img) => !img.hasAttribute("alt") || img.getAttribute("alt") === img.getAttribute("src")?.split("/").pop());
}

export function imageReport(): string {
  const images = missingAlt();
  if (images.length === 0) return "Every image on this page has a text alternative.";
  const lines = images.slice(0, 8).map((img) => img.currentSrc || img.getAttribute("src") || "image");
  return `${images.length} image${images.length === 1 ? "" : "s"} need a description. Nothing was sent off this page. ${lines.join(" ")}`;
}

export function runEnhance(): void {
  upgradeMedia();
  ensureSkip();
  ensureLandmarks();
  ensureKeyboard();
}

export function readPage(): { text: string; lang: "en" | "am"; notice: string } {
  const uiLang = getSettings().uiLang;
  const amharic = [...document.querySelectorAll<HTMLElement>("[lang='am']")]
    .map((node) => node.innerText.trim())
    .filter(Boolean)
    .join(" ");
  const main = document.querySelector("main");
  const english = (main?.innerText || document.body.innerText || "").replace(/\s+/g, " ").trim().slice(0, 1500);
  if (uiLang === "am" && amharic) {
    const voices = window.speechSynthesis?.getVoices?.() ?? [];
    const hasAmharic = voices.some((voice) => voice.lang.toLowerCase().startsWith("am"));
    if (!hasAmharic) {
      return {
        text: english,
        lang: "en",
        notice: "This browser has no Amharic voice. The English text is read instead. Nothing is sent off this device.",
      };
    }
    return { text: amharic.slice(0, 1500), lang: "am", notice: "Reading the Amharic text on this page. Nothing is sent off this device." };
  }
  return { text: english, lang: "en", notice: "Reading the start of this page. Nothing is sent off this device." };
}

export function describeImages(consent: boolean): string {
  if (!consent) return "Nothing was sent. Check the box before a description service is asked.";
  const api = document.querySelector("script[src*='learnable']")?.getAttribute("data-learnable-api");
  if (!api) return imageReport();
  return imageReport();
}

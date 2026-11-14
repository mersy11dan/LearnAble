import { chromeCopy } from "../copy";
import { getSettings } from "../settings";

/** Optional host profile. Loaded only when the page looks like the Savanna test bed. */
export function isSavannaHost(): boolean {
  if (document.documentElement.dataset.learnableProfile === "savanna") return true;
  const path = location.pathname;
  return /savanna|with-learnable|homepage-v1|concept-with|index-learnable/.test(path);
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
    document.querySelectorAll<HTMLElement>(".dropdown-menu.show").forEach((menu) => menu.classList.remove("show"));
  }

  const groups = [".homepage-nav .nav-link", "button[data-section-index]", ".accordion-button", ".dropdown-menu.show .dropdown-item"];
  if (event.key !== "ArrowRight" && event.key !== "ArrowLeft" && event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
  for (const selector of groups) {
    const items = focusables(selector);
    if (!items.includes(target)) continue;
    event.preventDefault();
    move(items, target, event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1);
    break;
  }
}

export function applySavannaProfile(): void {
  const header = document.querySelector(".header");
  if (header && !document.querySelector("header, [role='banner']")) {
    header.setAttribute("role", "banner");
    header.setAttribute("data-learnable-repair", "landmark");
  }
  const sidebar = document.getElementById("sidebar");
  if (sidebar && !document.querySelector("nav, [role='navigation']")) {
    sidebar.setAttribute("role", "navigation");
    if (!sidebar.getAttribute("aria-label")) sidebar.setAttribute("aria-label", "Sidebar");
    sidebar.setAttribute("data-learnable-repair", "landmark");
  }
  document.querySelectorAll<HTMLElement>(".hamburger").forEach((burger) => {
    if (burger.dataset.learnableKey === "true") return;
    burger.dataset.learnableKey = "true";
    burger.tabIndex = 0;
    burger.setAttribute("role", "button");
    burger.setAttribute("aria-label", chromeCopy[getSettings().uiLang].menu);
    burger.setAttribute("aria-expanded", String(!document.body.classList.contains("sidebar-collapsed")));
    burger.setAttribute("data-learnable-repair", "aria");
  });
  if (document.documentElement.dataset.learnableSavanna === "true") return;
  document.documentElement.dataset.learnableSavanna = "true";
  document.addEventListener("keydown", onKey);
}

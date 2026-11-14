const REPAIR_ATTR = "data-learnable-repair";

function nameOf(element: Element): string {
  const label = element.getAttribute("aria-label")?.trim();
  if (label) return label;
  const labelledBy = element.getAttribute("aria-labelledby");
  if (labelledBy) {
    const text = labelledBy
      .split(/\s+/)
      .map((id) => document.getElementById(id)?.textContent || "")
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    if (text) return text;
  }
  const text = element.textContent?.replace(/\s+/g, " ").trim() || "";
  if (text) return text;
  const alt = element.querySelector("img[alt]")?.getAttribute("alt")?.trim();
  if (alt) return alt;
  const title = element.getAttribute("title")?.trim();
  if (title) return title;
  return "";
}

function insideWidget(element: Element): boolean {
  return Boolean(element.closest("learnable-player, learnable-toolbar, .learnable-gateway"));
}

export function repairNames(): void {
  document.querySelectorAll("a, button, [role='button']").forEach((element) => {
    if (insideWidget(element) || nameOf(element)) return;
    const title = element.getAttribute("title")?.trim();
    const logo = element.classList.contains("logo-container") || element.querySelector(".logo");
    const fallback = logo ? "ALX home" : element.tagName === "A" ? "Link" : "Button";
    element.setAttribute("aria-label", title || fallback);
    element.setAttribute(REPAIR_ATTR, "name");
  });

  document.querySelectorAll("input, select, textarea").forEach((element) => {
    if (insideWidget(element)) return;
    if (element.getAttribute("type") === "hidden") return;
    if (element.getAttribute("aria-label") || element.closest("label")) return;
    const id = element.getAttribute("id");
    if (id && document.querySelector(`label[for="${CSS.escape(id)}"]`)) return;
    const placeholder = element.getAttribute("placeholder")?.trim();
    const adjacent = element.previousElementSibling?.textContent?.replace(/\s+/g, " ").trim();
    element.setAttribute("aria-label", placeholder || adjacent || element.getAttribute("name") || "Input");
    element.setAttribute(REPAIR_ATTR, "label");
  });
}

export function repairImages(): void {
  document.querySelectorAll("img").forEach((img) => {
    if (insideWidget(img) || img.hasAttribute("alt")) return;
    const decorative =
      Boolean(img.closest("[aria-hidden='true']")) ||
      img.className.toString().includes("icon") ||
      (img.width > 0 && img.width < 8);
    if (decorative) {
      img.alt = "";
      img.setAttribute("role", "presentation");
    } else {
      img.alt = "Needs a description";
      const note = document.createElement("span");
      note.className = "learnable-alt-note";
      note.textContent = "Needs a description";
      img.after(note);
    }
    img.setAttribute(REPAIR_ATTR, "alt");
  });
}

export function repairAria(): void {
  document.querySelectorAll("[aria-expanded]").forEach((element) => {
    if (insideWidget(element)) return;
    const role = element.getAttribute("role");
    const tag = element.tagName;
    if (role || tag === "BUTTON" || tag === "A" || tag === "SUMMARY") return;
    element.setAttribute("role", "button");
    if (!element.hasAttribute("tabindex")) element.setAttribute("tabindex", "0");
    element.setAttribute(REPAIR_ATTR, "aria");
  });

  document.querySelectorAll("[role='progressbar']").forEach((element) => {
    if (insideWidget(element) || nameOf(element)) return;
    const nearby = element.closest("div")?.parentElement?.textContent?.replace(/\s+/g, " ").trim().slice(0, 80);
    element.setAttribute("aria-label", nearby || "Progress");
    element.setAttribute(REPAIR_ATTR, "aria");
  });

  document.querySelectorAll("a.anchor[aria-hidden='true'], [aria-hidden='true'][tabindex]").forEach((element) => {
    element.setAttribute("tabindex", "-1");
    if (element.getAttribute("aria-hidden") === "true" && element.classList.contains("modal")) {
      element.removeAttribute("tabindex");
    }
    element.setAttribute(REPAIR_ATTR, "aria");
  });

  document.querySelectorAll("span[aria-label], div[aria-label]").forEach((element) => {
    if (insideWidget(element) || element.getAttribute("role")) return;
    element.setAttribute("role", "note");
    element.setAttribute(REPAIR_ATTR, "aria");
  });
}

export function repairLists(): void {
  document.querySelectorAll("ul, ol").forEach((list) => {
    if (insideWidget(list)) return;
    [...list.children].forEach((child) => {
      if (child.tagName === "LI" || child.tagName === "SCRIPT" || child.tagName === "TEMPLATE") return;
      const item = document.createElement("li");
      child.replaceWith(item);
      item.append(child);
      item.setAttribute(REPAIR_ATTR, "list");
    });
  });
}

function channel(value: number): number {
  const scaled = value / 255;
  return scaled <= 0.03928 ? scaled / 12.92 : ((scaled + 0.055) / 1.055) ** 2.4;
}

function luminance(rgb: number[]): number {
  return 0.2126 * channel(rgb[0]) + 0.7152 * channel(rgb[1]) + 0.0722 * channel(rgb[2]);
}

function ratio(foreground: number[], background: number[]): number {
  const lighter = Math.max(luminance(foreground), luminance(background));
  const darker = Math.min(luminance(foreground), luminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

function parseColor(value: string): number[] | null {
  const match = value.match(/rgba?\(([^)]+)\)/);
  if (!match) return null;
  const parts = match[1].split(",").map((part) => Number.parseFloat(part.trim()));
  if (parts.length < 3 || parts.some((part) => Number.isNaN(part))) return null;
  return [parts[0], parts[1], parts[2], parts[3] ?? 1];
}

function composite(front: number[], back: number[]): number[] {
  const alpha = front[3];
  return [
    front[0] * alpha + back[0] * (1 - alpha),
    front[1] * alpha + back[1] * (1 - alpha),
    front[2] * alpha + back[2] * (1 - alpha),
    1,
  ];
}

function backgroundOf(element: Element): number[] {
  const layers: number[][] = [];
  let node: Element | null = element;
  while (node) {
    const parsed = parseColor(getComputedStyle(node).backgroundColor);
    if (parsed && parsed[3] > 0) layers.push(parsed);
    if (parsed && parsed[3] >= 1) break;
    node = node.parentElement;
  }
  if (layers.length === 0) return [255, 255, 255, 1];
  let mixed = layers[layers.length - 1];
  for (let index = layers.length - 2; index >= 0; index -= 1) mixed = composite(layers[index], mixed);
  return mixed;
}

function mix(from: number[], to: number[], amount: number): number[] {
  return [
    Math.round(from[0] + (to[0] - from[0]) * amount),
    Math.round(from[1] + (to[1] - from[1]) * amount),
    Math.round(from[2] + (to[2] - from[2]) * amount),
    1,
  ];
}

function neededRatio(element: Element): number {
  const style = getComputedStyle(element);
  const size = Number.parseFloat(style.fontSize);
  const weight = Number.parseInt(style.fontWeight, 10) || 400;
  return size >= 24 || (size >= 18.67 && weight >= 700) ? 3 : 4.5;
}

export function repairContrast(): void {
  document.querySelectorAll("a, button, span, p, h1, h2, h3, h4, li, label, div, td, th, code, small, strong, b, em").forEach((element) => {
    if (insideWidget(element) || element.getAttribute(REPAIR_ATTR) === "contrast") return;
    const direct = [...element.childNodes].some((node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim());
    if (!direct || element.getClientRects().length === 0) return;
    const foreground = parseColor(getComputedStyle(element).color);
    if (!foreground) return;
    const background = backgroundOf(element);
    const floor = neededRatio(element);
    if (ratio(foreground, background) >= floor) return;
    const need = floor + 0.45;
    let chosen = foreground;
    let change = 2;
    for (const target of [[0, 0, 0], [255, 255, 255]]) {
      let low = 0;
      let high = 1;
      for (let step = 0; step < 10; step += 1) {
        const mid = (low + high) / 2;
        if (ratio(mix(foreground, target, mid), background) >= need) high = mid;
        else low = mid;
      }
      let amount = high;
      let next = mix(foreground, target, amount);
      while (ratio(next, background) < need && amount < 1) {
        amount = Math.min(1, amount + 0.08);
        next = mix(foreground, target, amount);
      }
      if (ratio(next, background) >= need && amount < change) {
        chosen = next;
        change = amount;
      }
    }
    if (ratio(chosen, background) < need) {
      const black = [0, 0, 0, 1];
      const white = [255, 255, 255, 1];
      chosen = ratio(black, background) >= ratio(white, background) ? black : white;
    }
    (element as HTMLElement).style.setProperty("color", `rgb(${chosen[0]}, ${chosen[1]}, ${chosen[2]})`, "important");
    element.setAttribute(REPAIR_ATTR, "contrast");
  });
}

export function repairHost(): void {
  repairNames();
  repairImages();
  repairAria();
  repairLists();
  repairContrast();
}

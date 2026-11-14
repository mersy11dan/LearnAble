import diagrams from "../content/diagrams.json";

export const DESCRIPTION_PLACEHOLDER = "Description not yet provided";

const mapped = diagrams as Record<string, string>;

export function imageFile(img: HTMLImageElement): string {
  const src = img.currentSrc || img.getAttribute("src") || "";
  return decodeURIComponent(src.split("/").pop()?.split("?")[0] || "");
}

export function isDecorativeImage(img: HTMLImageElement): boolean {
  if (img.getAttribute("aria-hidden") === "true") return true;
  if (img.closest("[aria-hidden='true']")) return true;
  const role = img.getAttribute("role");
  if (role === "presentation" || role === "none") return true;
  const alt = img.getAttribute("alt");
  if (alt === "") return true;
  return false;
}

function weakAlt(img: HTMLImageElement, alt: string): boolean {
  if (alt === DESCRIPTION_PLACEHOLDER || alt === "Needs a description") return true;
  const file = imageFile(img);
  const stem = file.replace(/\.[^.]+$/, "");
  return alt === file || alt === stem;
}

export function imageDescription(img: HTMLImageElement): string | null {
  if (isDecorativeImage(img)) return null;
  const alt = img.getAttribute("alt")?.trim() ?? "";
  if (alt && !weakAlt(img, alt)) return alt;
  const file = imageFile(img);
  if (mapped[file]) return mapped[file];
  return DESCRIPTION_PLACEHOLDER;
}

export function prepareImages(): void {
  document.querySelectorAll("img").forEach((img) => {
    if (img.closest("learnable-player, learnable-toolbar")) return;
    const description = imageDescription(img);
    if (!description) return;
    const alt = img.getAttribute("alt")?.trim() ?? "";
    if (!alt || weakAlt(img, alt)) img.alt = description;
    const insideControl = img.closest("a, button, [role='link'], [role='button']");
    if (!insideControl && img.tabIndex < 0) {
      img.tabIndex = 0;
      img.dataset.learnableImage = "true";
    }
  });
}

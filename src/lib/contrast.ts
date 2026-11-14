export type ContrastMode = "off" | "bw" | "yb";

function channel(value: number): number {
  const scaled = value / 255;
  return scaled <= 0.03928 ? scaled / 12.92 : ((scaled + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
  const value = hex.replace("#", "");
  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);
  return 0.2126 * channel(red) + 0.7152 * channel(green) + 0.0722 * channel(blue);
}

export function contrastRatio(foreground: string, background: string): number {
  const lighter = Math.max(luminance(foreground), luminance(background));
  const darker = Math.min(luminance(foreground), luminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

function mix(from: string, to: string, amount: number): string {
  const parse = (hex: string) => [0, 2, 4].map((index) => Number.parseInt(hex.slice(index, index + 2), 16));
  const start = parse(from.replace("#", ""));
  const end = parse(to.replace("#", ""));
  const mixed = start.map((part, index) => Math.round(part + (end[index] - part) * amount));
  return `#${mixed.map((part) => part.toString(16).padStart(2, "0")).join("")}`;
}

export function themePair(mode: Exclude<ContrastMode, "off">, level: number): { fg: string; bg: string; focus: string } {
  const clamped = Math.min(10, Math.max(1, Math.round(level)));
  const amount = (clamped - 1) / 9;
  if (mode === "yb") {
    return {
      bg: mix("16140c", "12100c", amount),
      fg: mix("e6c200", "ffe566", amount),
      focus: "#ffffff",
    };
  }
  return {
    bg: mix("1c1c1c", "121212", amount),
    fg: mix("e6e6e6", "f2f2f2", amount),
    focus: "#ffe14a",
  };
}

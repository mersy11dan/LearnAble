/** Rough spoken length at 150 words per minute, scaled by the speech rate. */
export function needsExtendedDescription(text: string, gapSeconds: number, rate = 1): boolean {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  if (words === 0) return false;
  const seconds = words / (2.5 * Math.min(2, Math.max(0.5, rate)));
  return seconds > Math.max(0, gapSeconds) + 0.25;
}

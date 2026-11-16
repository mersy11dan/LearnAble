/** Bytes in the downloadable 3G pack after the Opus and AAC encode. WAV narration was 1,904,228 bytes per language. */
export const packBytes = 703942;

export function formatPackSize(bytes: number): string {
  if (bytes < 1_000_000) return `${Math.round(bytes / 1000)} KB`;
  return `${(bytes / 1_000_000).toFixed(1)} MB`;
}

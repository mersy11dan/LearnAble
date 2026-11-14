export type Cue = {
  start: number;
  end: number;
  text: string;
};

export function parseTimestamp(value: string): number {
  const match = /^(?:(\d+):)?(\d{2}):(\d{2})\.(\d{3})$/.exec(value.trim());
  if (!match) {
    throw new Error(`Bad WebVTT timestamp: ${value}`);
  }
  const hours = Number(match[1] ?? 0);
  const minutes = Number(match[2]);
  const seconds = Number(match[3]);
  const millis = Number(match[4]);
  return hours * 3600 + minutes * 60 + seconds + millis / 1000;
}

export function parseVtt(source: string): Cue[] {
  const lines = source.replace(/^\uFEFF/, "").split(/\r?\n/);
  const cues: Cue[] = [];
  let index = 0;
  if (lines[0]?.startsWith("WEBVTT")) {
    index = 1;
    while (index < lines.length && lines[index].trim() !== "") index += 1;
  }

  while (index < lines.length) {
    if (lines[index].trim() === "") {
      index += 1;
      continue;
    }
    let timing = lines[index];
    if (!timing.includes("-->") && index + 1 < lines.length) {
      index += 1;
      timing = lines[index];
    }
    const parts = timing.split("-->");
    if (parts.length < 2) {
      index += 1;
      continue;
    }
    const start = parseTimestamp(parts[0]);
    const endToken = parts[1].trim().split(/\s+/)[0];
    const end = parseTimestamp(endToken);
    index += 1;
    const text: string[] = [];
    while (index < lines.length && lines[index].trim() !== "") {
      text.push(lines[index]);
      index += 1;
    }
    cues.push({ start, end, text: text.join("\n") });
  }
  return cues;
}

function stamp(seconds: number): string {
  const total = Math.max(0, Math.round(seconds * 1000));
  const hours = Math.floor(total / 3_600_000);
  const minutes = Math.floor((total % 3_600_000) / 60_000);
  const secs = Math.floor((total % 60_000) / 1000);
  const millis = total % 1000;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${String(millis).padStart(3, "0")}`;
}

export function cuesToVtt(cues: Cue[]): string {
  const body = cues.map((cue) => `${stamp(cue.start)} --> ${stamp(cue.end)}\n${cue.text}`).join("\n\n");
  return `WEBVTT\n\n${body}\n`;
}

export function cueAt<T extends { start: number; end: number }>(items: T[], time: number): T | undefined {
  const found = items.find((item) => time >= item.start && time < item.end);
  if (found) return found;
  const last = items[items.length - 1];
  if (last && time >= last.start && time <= last.end + 0.05) return last;
  return undefined;
}

/** Rough spoken length at 150 words per minute, scaled by the speech rate. */
export function needsExtendedDescription(text: string, gapSeconds: number, rate = 1): boolean {
  return spokenSeconds(text, rate) > Math.max(0, gapSeconds) + 0.25;
}

export function spokenSeconds(text: string, rate = 1): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  if (words === 0) return 0;
  const safe = Math.min(2, Math.max(0.5, rate));
  return words / (2.5 * safe);
}

export type ScheduledCue = {
  start: number;
  end: number;
  text: string;
  /** Do not start another cue before this media time. A long line keeps the slot. */
  holdUntil: number;
};

export type AdLock = {
  text: string;
  start: number;
  holdUntil: number;
};

/** Sorts cues and pushes any that would overlap, including a cue still being spoken. */
export function scheduleDescriptions(cues: { start: number; end: number; text: string }[], rate = 1): ScheduledCue[] {
  const sorted = [...cues].sort((left, right) => left.start - right.start || left.end - right.end);
  let earliest = 0;
  return sorted.map((cue) => {
    const start = Math.max(cue.start, earliest);
    const end = Math.max(cue.end, start + 0.05);
    const holdUntil = Math.max(end, start + spokenSeconds(cue.text, rate));
    earliest = holdUntil;
    return { start, end, text: cue.text, holdUntil };
  });
}

/** Returns the cue to start, or null while an earlier cue is still being delivered. */
export function cueToDeliver(cues: ScheduledCue[], time: number, lock: AdLock | null): ScheduledCue | null {
  if (lock && time >= lock.start && time < lock.holdUntil) return null;
  const next = cues.find((cue) => time >= cue.start && time < cue.holdUntil);
  if (!next) return null;
  if (lock && lock.text === next.text && lock.start === next.start) return null;
  return next;
}

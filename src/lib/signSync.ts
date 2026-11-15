/** Keep a muted sign-language video aligned with the lesson video. */

export const DRIFT_SECONDS = 0.3;
export const SIGN_SYNC_MS = 500;

export type SignSyncEvent = "play" | "pause" | "seeking" | "seeked" | "ratechange" | "drift";

export type SignMedia = {
  currentTime: number;
  playbackRate: number;
  paused: boolean;
  play: () => void | Promise<void>;
  pause: () => void;
};

type Listenable = {
  addEventListener: (type: string, listener: EventListener) => void;
  removeEventListener: (type: string, listener: EventListener) => void;
};

/** Seconds into the sign file that match this lesson time. Offset is added. */
export function signTargetTime(mainTime: number, offsetSeconds: number): number {
  const main = Number.isFinite(mainTime) ? mainTime : 0;
  const offset = Number.isFinite(offsetSeconds) ? offsetSeconds : 0;
  return Math.max(0, main + offset);
}

export function needsDriftCorrection(
  mainTime: number,
  signTime: number,
  offsetSeconds = 0,
  threshold = DRIFT_SECONDS,
): boolean {
  if (!Number.isFinite(mainTime) || !Number.isFinite(signTime)) return false;
  return Math.abs(signTime - signTargetTime(mainTime, offsetSeconds)) > threshold;
}

/**
 * Mirror one lesson event onto the sign video.
 * Failures stay inside this function so the lesson audio and captions keep going.
 */
export function syncSignPlayback(main: SignMedia, sign: SignMedia, offsetSeconds: number, event: SignSyncEvent): void {
  try {
    if (event === "ratechange" || event === "play") {
      const rate = Number.isFinite(main.playbackRate) && main.playbackRate > 0 ? main.playbackRate : 1;
      sign.playbackRate = rate;
    }
    if (event === "pause") {
      sign.pause();
      return;
    }
    if (event === "drift" && !needsDriftCorrection(main.currentTime, sign.currentTime, offsetSeconds)) return;
    if (event === "play" || event === "seeking" || event === "seeked" || event === "drift") {
      sign.currentTime = signTargetTime(main.currentTime, offsetSeconds);
    }
    if (event === "play" || (event === "seeked" && !main.paused)) {
      const pending = sign.play();
      if (pending && typeof (pending as Promise<void>).catch === "function") {
        void (pending as Promise<void>).catch(() => undefined);
      }
    }
  } catch {
    /* A broken sign file must not throw into the lesson player. */
  }
}

export function attachSignSync(main: SignMedia & Listenable, sign: SignMedia, getOffset: () => number): () => void {
  const run = (event: SignSyncEvent) => syncSignPlayback(main, sign, getOffset(), event);
  const onPlay = () => run("play");
  const onPause = () => run("pause");
  const onSeeking = () => run("seeking");
  const onSeeked = () => run("seeked");
  const onRate = () => run("ratechange");
  main.addEventListener("play", onPlay);
  main.addEventListener("pause", onPause);
  main.addEventListener("seeking", onSeeking);
  main.addEventListener("seeked", onSeeked);
  main.addEventListener("ratechange", onRate);
  const timer = setInterval(() => run("drift"), SIGN_SYNC_MS);
  return () => {
    clearInterval(timer);
    main.removeEventListener("play", onPlay);
    main.removeEventListener("pause", onPause);
    main.removeEventListener("seeking", onSeeking);
    main.removeEventListener("seeked", onSeeked);
    main.removeEventListener("ratechange", onRate);
  };
}

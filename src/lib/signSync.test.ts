import { describe, expect, it, vi } from "vitest";
import { ASL_GLOSS_LABEL } from "../embed/signs";
import {
  ETHIOPIAN_SIGN_HEADING,
  MISSING_SIGN_NOTICE,
  PLACEHOLDER_SIGN_LABEL,
  presentSign,
} from "./signLabel";
import { needsDriftCorrection, signTargetTime, syncSignPlayback, type SignMedia } from "./signSync";

function media(partial: Partial<SignMedia> = {}): SignMedia {
  return {
    currentTime: 0,
    playbackRate: 1,
    paused: true,
    play: vi.fn(() => Promise.resolve()),
    pause: vi.fn(),
    ...partial,
  };
}

describe("sign video sync", () => {
  it("corrects drift only past 0.3 seconds and applies the offset", () => {
    expect(needsDriftCorrection(10, 10.2, 0)).toBe(false);
    expect(needsDriftCorrection(10, 10.31, 0)).toBe(true);
    expect(needsDriftCorrection(10, 11.4, 1.5)).toBe(false);
    expect(needsDriftCorrection(10, 10, 1.5)).toBe(true);
    expect(signTargetTime(10, 1.5)).toBe(11.5);
    expect(signTargetTime(0.2, -1)).toBe(0);
    expect(signTargetTime(Number.NaN, 2)).toBe(2);
  });

  it("mirrors play, pause, seeking, and rate without letting a sign failure escape", () => {
    const main = media({ currentTime: 4, playbackRate: 1.5, paused: false });
    const sign = media({ currentTime: 0, playbackRate: 1, paused: true });
    syncSignPlayback(main, sign, 0.5, "play");
    expect(sign.playbackRate).toBe(1.5);
    expect(sign.currentTime).toBe(4.5);
    expect(sign.play).toHaveBeenCalled();

    syncSignPlayback(main, sign, 0.5, "pause");
    expect(sign.pause).toHaveBeenCalled();

    main.currentTime = 9;
    syncSignPlayback(main, sign, 0, "seeking");
    expect(sign.currentTime).toBe(9);

    main.playbackRate = 0.75;
    syncSignPlayback(main, sign, 0, "ratechange");
    expect(sign.playbackRate).toBe(0.75);

    const broken = media({
      play: () => {
        throw new Error("sign decode failed");
      },
      get currentTime() {
        return 0;
      },
      set currentTime(_value: number) {
        throw new Error("sign seek failed");
      },
    });
    expect(() => syncSignPlayback(media({ currentTime: 3, paused: false }), broken, 0, "play")).not.toThrow();
    expect(() => syncSignPlayback(media(), broken, 0, "drift")).not.toThrow();
  });

  it("leaves a sign video alone when drift is inside the threshold", () => {
    const sign = media({ currentTime: 5.1 });
    syncSignPlayback(media({ currentTime: 5 }), sign, 0, "drift");
    expect(sign.currentTime).toBe(5.1);
  });
});

describe("sign language label", () => {
  it("names Ethiopian Sign Language only for a loaded clip declared as ethiopian", () => {
    const ready = presentSign({ src: "/media/esl/lesson-1.mp4", signLang: "ethiopian", load: "ready" });
    expect(ready.heading).toBe(ETHIOPIAN_SIGN_HEADING);
    expect(ready.shortHeading).toBe(ETHIOPIAN_SIGN_HEADING);
    expect(ready.showVideo).toBe(true);
    expect(ready.videoLabel).toBeNull();
    expect(ready.missingNotice).toBeNull();

    const loading = presentSign({ src: "/media/esl/lesson-1.mp4", signLang: "Ethiopian", load: "loading" });
    expect(loading.heading).toBe(ASL_GLOSS_LABEL);
    expect(loading.showVideo).toBe(true);
  });

  it("labels a placeholder, a missing file, and an undeclared language without calling it Ethiopian Sign Language", () => {
    const placeholder = presentSign({ src: "/media/esl-placeholder.mp4", signLang: "ethiopian", load: "ready" });
    expect(placeholder.showVideo).toBe(false);
    expect(placeholder.heading).toBe(ASL_GLOSS_LABEL);
    expect(placeholder.shortHeading).toBe("ASL");
    expect(placeholder.videoLabel).toBe(PLACEHOLDER_SIGN_LABEL);
    expect(placeholder.missingNotice).toBe(MISSING_SIGN_NOTICE);

    const missing = presentSign({ src: "", signLang: "", load: "missing" });
    expect(missing.missingNotice).toBe(MISSING_SIGN_NOTICE);
    expect(missing.heading).toBe(ASL_GLOSS_LABEL);

    const failed = presentSign({ src: "/media/esl/lesson-1.mp4", signLang: "ethiopian", load: "error" });
    expect(failed.showVideo).toBe(false);
    expect(failed.heading).toBe(ASL_GLOSS_LABEL);
    expect(failed.missingNotice).toBe(MISSING_SIGN_NOTICE);

    const undeclared = presentSign({ src: "/media/esl/lesson-1.mp4", signLang: "", load: "ready" });
    expect(undeclared.showVideo).toBe(true);
    expect(undeclared.heading).toBe(ASL_GLOSS_LABEL);
    expect(undeclared.videoLabel).toBe(PLACEHOLDER_SIGN_LABEL);
  });
});

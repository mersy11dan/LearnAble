import { ASL_GLOSS_LABEL } from "../embed/signs";

export const MISSING_SIGN_NOTICE = "No Ethiopian Sign Language recording is available for this lesson yet";
export const PLACEHOLDER_SIGN_LABEL = "Placeholder, not a sign language recording";
export const ETHIOPIAN_SIGN_HEADING = "Ethiopian Sign Language";

export type SignLoad = "idle" | "loading" | "ready" | "missing" | "error";

export type SignPresentation = {
  /** Full accessible name. Ethiopian Sign Language only when the clip is real and declared. */
  heading: string;
  /** Short visible heading. The embed keeps "ASL" unless the recording is Ethiopian Sign Language. */
  shortHeading: string;
  videoLabel: string | null;
  missingNotice: string | null;
  showVideo: boolean;
};

export function isPlaceholderSignSrc(src: string | null | undefined): boolean {
  if (!src) return false;
  const path = src.split("?")[0].split("#")[0].toLowerCase();
  return path.endsWith("/esl-placeholder.mp4") || path.endsWith("esl-placeholder.mp4");
}

export function presentSign(options: {
  src: string | null | undefined;
  signLang: string | null | undefined;
  load: SignLoad;
}): SignPresentation {
  const srcValue = (options.src || "").trim();
  const lang = (options.signLang || "").trim().toLowerCase();
  const placeholder = srcValue === "" || srcValue === "false" || isPlaceholderSignSrc(srcValue);
  const failed = options.load === "error" || options.load === "missing";
  const showVideo = !placeholder && !failed;
  const ethiopian = lang === "ethiopian" && showVideo && options.load === "ready";
  const undeclared = lang === "";
  return {
    heading: ethiopian ? ETHIOPIAN_SIGN_HEADING : ASL_GLOSS_LABEL,
    shortHeading: ethiopian ? ETHIOPIAN_SIGN_HEADING : "ASL",
    videoLabel: !ethiopian && (placeholder || undeclared || failed) ? PLACEHOLDER_SIGN_LABEL : null,
    missingNotice: placeholder || failed ? MISSING_SIGN_NOTICE : null,
    showVideo,
  };
}

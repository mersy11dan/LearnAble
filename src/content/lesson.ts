import lessonJson from "./lesson.json";

export type LessonSegment = {
  start: number;
  end: number;
  en: string;
  am: string;
  ad: string;
  gloss: string;
};

export type ChatLine = {
  time: number;
  speaker: string;
  text: string;
};

export type Lesson = {
  id: string;
  title: string;
  voiceNote: string;
  video: { en: string; am: string; poster: string };
  audio: { en: string; am: string };
  captions: { en: string; am: string; descriptions: string };
  signVideo: string;
  signPoster: string;
  figure: { src: string; alt: string; long: string };
  segments: LessonSegment[];
  chat: ChatLine[];
};

export const demoLesson = lessonJson as Lesson;

export function transcript(language: "en" | "am"): string {
  return demoLesson.segments.map((segment) => (language === "en" ? segment.en : segment.am)).join("\n");
}

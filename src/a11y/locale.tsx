import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type UiLang = "en" | "am";

const STRINGS = {
  en: {
    skip: "Skip to content",
    menu: "Menu",
    close: "Close menu",
    lesson: "Lesson",
    pack: "Pack",
    session: "Session",
    jobs: "Jobs",
    larger: "Larger text",
    contrast: "High contrast",
    stop: "Stop motion",
    language: "Language",
    text: "Text version",
    certificate: "Check a certificate",
    pipeline: "Transcript pipeline",
    tracks: "Tracks",
    savanna: "Savanna pages",
    demo: "Before / with",
    embed: "Embed",
    accessibility: "Accessibility",
    display: "Display",
  },
  am: {
    skip: "ወደ ዋናው ይዘት ዝለል",
    menu: "ምናሌ",
    close: "ምናሌውን ዝጋ",
    lesson: "ትምህርት",
    pack: "ጥቅል",
    session: "ክፍለ ጊዜ",
    jobs: "ስራዎች",
    larger: "ትልቅ ጽሑፍ",
    contrast: "ከፍተኛ ንጽጽር",
    stop: "እንቅስቃሴ አቁም",
    language: "ቋንቋ",
    text: "የጽሑፍ ቅጂ",
    certificate: "ምስክር ወረቀት አረጋግጥ",
    pipeline: "የጽሑፍ መስመር",
    tracks: "መስመሮች",
    savanna: "የሳቫና ገጾች",
    demo: "ከዚህ በፊት / ከዚህ ጋር",
    embed: "አካትት",
    accessibility: "ተደራሽነት",
    display: "ማሳያ",
  },
} as const;

export type ChromeCopy = { [Key in keyof (typeof STRINGS)["en"]]: string };

const KEY = "learnable-ui-lang";

type LocaleValue = {
  lang: UiLang;
  chrome: ChromeCopy;
  setLang: (lang: UiLang) => void;
};

const LocaleContext = createContext<LocaleValue | null>(null);

function storedLang(): UiLang {
  try {
    return localStorage.getItem(KEY) === "am" ? "am" : "en";
  } catch {
    return "en";
  }
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<UiLang>(storedLang);

  useEffect(() => {
    const root = document.documentElement;
    const previous = root.lang;
    root.lang = lang === "am" ? "am" : "en";
    try {
      localStorage.setItem(KEY, lang);
    } catch {
      /* private mode */
    }
    return () => {
      root.lang = previous;
    };
  }, [lang]);

  const value = useMemo<LocaleValue>(
    () => ({
      lang,
      chrome: STRINGS[lang],
      setLang: setLangState,
    }),
    [lang],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLocale(): LocaleValue {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("Interface language is missing.");
  return value;
}

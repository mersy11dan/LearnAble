export type GuidePage = {
  id: string;
  path: string;
  title: string;
  aliases: string[];
  summary: string;
  nextHint: string;
};

export type GuideResult =
  | { kind: "navigate"; path: string; reply: string }
  | { kind: "back"; reply: string }
  | { kind: "stay"; reply: string }
  | { kind: "chat" };

export const COURSE_ORDER = [
  "/",
  "/lesson/slow-connection",
  "/lesson/slow-connection/read",
  "/offline",
  "/sessions/studio",
  "/careers",
  "/verify",
  "/accessibility",
] as const;

export const HELP_REPLY =
  "Say a page: home, lesson, text version, pack, sessions, jobs, or verify. You can also say where am I, next, or back.";

export const GUIDE_PAGES: GuidePage[] = [
  {
    id: "home",
    path: "/",
    title: "Home",
    aliases: ["home", "start", "opening", "main", "beginning"],
    summary: "You are on the home page.",
    nextHint: "Say lesson to open the video, or sessions to hear a recorded class.",
  },
  {
    id: "lesson",
    path: "/lesson/slow-connection",
    title: "Lesson player",
    aliases: ["lesson", "video", "player", "watch", "slow connection"],
    summary: "You are on the lesson player. Press C for captions, D for description, or Space to play.",
    nextHint: "Say text version to read it, or sessions to open the recorded class.",
  },
  {
    id: "read",
    path: "/lesson/slow-connection/read",
    title: "Text version",
    aliases: ["read", "text", "text version", "reading", "braille", "pdf"],
    summary: "You are on the text version of the lesson. You can download a tagged PDF and a braille file.",
    nextHint: "Say pack for the 3G download, or lesson to return to the player.",
  },
  {
    id: "offline",
    path: "/offline",
    title: "3G pack",
    aliases: ["offline", "pack", "3g", "zip", "offline pack", "download"],
    summary: "You are on the offline pack page.",
    nextHint: "Say sessions to open the recorded class, or jobs for career cards.",
  },
  {
    id: "session",
    path: "/sessions/studio",
    title: "Recorded session",
    aliases: ["session", "sessions", "studio", "class", "recorded", "recorded session"],
    summary: "You are on the recorded session page. Captions follow the lesson, and chat lines appear as they were sent.",
    nextHint: "Say jobs to hear career cards, or lesson to return to the player.",
  },
  {
    id: "jobs",
    path: "/careers",
    title: "Jobs",
    aliases: ["jobs", "job", "careers", "career", "work"],
    summary: "You are on the jobs page. Each card has a spoken summary you can play.",
    nextHint: "Say verify to check a certificate, or sessions to go back.",
  },
  {
    id: "verify",
    path: "/verify",
    title: "Certificate check",
    aliases: ["verify", "certificate", "badge", "credentials"],
    summary: "You are on the certificate check page.",
    nextHint: "Say home to start again, or jobs to return to careers.",
  },
  {
    id: "pipeline",
    path: "/pipeline",
    title: "Transcript pipeline",
    aliases: ["pipeline", "transcript"],
    summary: "You are on the transcript pipeline page.",
    nextHint: "Say home to return to the start.",
  },
  {
    id: "tracks",
    path: "/tracks",
    title: "Tracks",
    aliases: ["tracks", "track"],
    summary: "You are on the tracks page.",
    nextHint: "Say jobs for career cards, or home to start again.",
  },
  {
    id: "savanna",
    path: "/savanna",
    title: "Savanna",
    aliases: ["savanna", "reference"],
    summary: "You are on the Savanna page.",
    nextHint: "Say demo to compare pages with and without the plug-in.",
  },
  {
    id: "demo",
    path: "/demo",
    title: "Demo",
    aliases: ["demo"],
    summary: "You are on the demo page.",
    nextHint: "Say home to return to the start.",
  },
  {
    id: "integrate",
    path: "/integrate",
    title: "Embed",
    aliases: ["integrate", "embed", "plugin", "plug in"],
    summary: "You are on the integrate page.",
    nextHint: "Say home to return to the start.",
  },
  {
    id: "accessibility",
    path: "/accessibility",
    title: "Accessibility",
    aliases: ["accessibility", "a11y"],
    summary: "You are on the accessibility page.",
    nextHint: "Say lesson to return to the player, or home to start again.",
  },
];

export function normalizeUtterance(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function pageAt(pathname: string): GuidePage | null {
  const path = pathname.replace(/\/$/, "") || "/";
  return (
    GUIDE_PAGES.find((page) => page.path === path) ??
    GUIDE_PAGES.find((page) => page.path !== "/" && path.startsWith(`${page.path}/`)) ??
    null
  );
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function rankedPages(): GuidePage[] {
  return [...GUIDE_PAGES].sort((a, b) => {
    const aLen = Math.max(...a.aliases.map((alias) => alias.length));
    const bLen = Math.max(...b.aliases.map((alias) => alias.length));
    return bLen - aLen;
  });
}

function pageFromUtterance(normalized: string): GuidePage | null {
  for (const page of rankedPages()) {
    for (const alias of page.aliases) {
      const aliasPattern = escapeRegExp(alias);
      if (
        normalized === alias ||
        normalized === `the ${alias}` ||
        normalized === `please ${alias}` ||
        new RegExp(
          `\\b(?:go to|open|show(?: me)?|take me to|navigate to|find|where(?: is| s)?(?: the)?)\\s+(?:the )?${aliasPattern}\\b`,
        ).test(normalized)
      ) {
        return page;
      }
    }
  }
  return null;
}

function describe(page: GuidePage, alreadyThere: boolean): string {
  if (alreadyThere) return `${page.summary} ${page.nextHint}`;
  return `Opening ${page.title}. ${page.summary} ${page.nextHint}`;
}

function nextPage(pathname: string): GuidePage | null {
  const path = pathname.replace(/\/$/, "") || "/";
  const index = COURSE_ORDER.indexOf(path as (typeof COURSE_ORDER)[number]);
  if (index === -1) return pageAt("/");
  if (index >= COURSE_ORDER.length - 1) return pageAt(COURSE_ORDER[COURSE_ORDER.length - 1]);
  return pageAt(COURSE_ORDER[index + 1]);
}

function previousPage(pathname: string): GuidePage | null {
  const path = pathname.replace(/\/$/, "") || "/";
  const index = COURSE_ORDER.indexOf(path as (typeof COURSE_ORDER)[number]);
  if (index <= 0) return pageAt("/");
  return pageAt(COURSE_ORDER[index - 1]);
}

export function interpretGuideCommand(utterance: string, currentPath: string): GuideResult {
  const normalized = normalizeUtterance(utterance);
  if (!normalized) return { kind: "chat" };

  const here = pageAt(currentPath);
  const hereTitle = here?.title ?? "a page that is not in the main course path";

  if (/^(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(normalized)) {
    return { kind: "stay", reply: `Hello. You are on ${hereTitle}. ${here?.nextHint ?? HELP_REPLY}` };
  }

  if (/\b(where am i|what page|current page|where is this)\b/.test(normalized)) {
    return { kind: "stay", reply: here ? `${here.summary} ${here.nextHint}` : `You are on ${hereTitle}. ${HELP_REPLY}` };
  }

  if (/\b(what(?: is|'s|s)? (?:on )?(?:this|the) page|describe(?: this)?(?: page)?|what can i do(?: here)?)\b/.test(normalized)) {
    return { kind: "stay", reply: here ? `${here.summary} ${here.nextHint}` : HELP_REPLY };
  }

  if (
    /^(help|commands|what can i say|what can you do|voice (?:search|nav|navigation|guide)?|how (?:do i )?(?:use )?voice)\b/.test(
      normalized,
    )
  ) {
    return { kind: "stay", reply: HELP_REPLY };
  }

  if (/^(next|continue|what(?:'s| is) next|go forward)$/.test(normalized) || /\b(next page|continue the course)\b/.test(normalized)) {
    const destination = nextPage(currentPath);
    if (!destination) return { kind: "stay", reply: HELP_REPLY };
    if (destination.path === (currentPath.replace(/\/$/, "") || "/")) {
      return { kind: "stay", reply: `This is the last stop on the course path. ${destination.summary} Say home to start again.` };
    }
    return { kind: "navigate", path: destination.path, reply: describe(destination, false) };
  }

  if (/^(back|previous|go back|go backwards)$/.test(normalized) || /\b(previous page|last page)\b/.test(normalized)) {
    const destination = previousPage(currentPath);
    if (destination && destination.path !== (currentPath.replace(/\/$/, "") || "/")) {
      return { kind: "navigate", path: destination.path, reply: describe(destination, false) };
    }
    return { kind: "back", reply: "Going back one page." };
  }

  const askingHow =
    /^(how|what|why|explain|tell me about)\b/.test(normalized) &&
    !/\b(how do i (?:get to|open|find|go to)|where(?: is|'s)?)\b/.test(normalized);
  if (askingHow) return { kind: "chat" };

  const page = pageFromUtterance(normalized);
  if (!page) return { kind: "chat" };

  const alreadyThere = page.path === (currentPath.replace(/\/$/, "") || "/");
  if (alreadyThere) return { kind: "stay", reply: describe(page, true) };
  return { kind: "navigate", path: page.path, reply: describe(page, false) };
}

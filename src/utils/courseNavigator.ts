export interface CourseLocation {
  id: string;
  path: string;
  title: string;
  titleAm: string;
  description: string;
  descriptionAm: string;
  keywords: string[];
  keywordsAm: string[];
}

export interface NavigationResult {
  action: "navigate" | "describe" | "help" | "repeat" | "unknown";
  message: string;
  path?: string;
}

const COURSE_LOCATIONS: CourseLocation[] = [
  {
    id: "home",
    path: "/",
    title: "Home",
    titleAm: "መነሻ",
    description: "Welcome to LearnAble. This is the home page where you can start your learning journey.",
    descriptionAm: "ወደ LearnAble እንኳን ደህና መጡ። ይህ የመነሻ ገጽ ሲሆን የመማር ጉዞዎን ከዚህ ማስጀመር ይችላሉ።",
    keywords: ["home", "start", "beginning", "main", "welcome"],
    keywordsAm: ["መነሻ", "ጀምር", "ማስጀመሪያ", "ዋና", "እንኳን ደህና መጣችሁ"],
  },
  {
    id: "lesson",
    path: "/lesson/slow-connection",
    title: "Lesson",
    titleAm: "ትምህርት",
    description: "This is the lesson page with video player. Press C for captions, D for description, Space to play.",
    descriptionAm: "ይህ የቪዲዮ ማጫወቻ ያለው የትምህርት ገጽ ነው። C ለክፍሎች፣ D ለመግለጫ፣ Space ለማጫወት ይጫኑ።",
    keywords: ["lesson", "video", "player", "watch", "learn", "course", "class"],
    keywordsAm: ["ትምህርት", "ቪዲዮ", "ማጫወቻ", "ተመልከት", "ተማር", "ኮርስ", "ክፍል"],
  },
  {
    id: "read",
    path: "/lesson/slow-connection/read",
    title: "Text Version",
    titleAm: "የፅሁፍ ስሪት",
    description: "Read the lesson text. You can download PDF and Braille files from here.",
    descriptionAm: "የትምህርቱን ጽሁፍ ያንብቡ። ከዚህ PDF እና Braille ፋይሎችን ማውረድ ይችላሉ።",
    keywords: ["read", "text", "pdf", "braille", "download", "reading"],
    keywordsAm: ["አንብብ", "ጽሁፍ", "ፒዲኤፍ", "ብራይል", "አውርድ", "ማንበብ"],
  },
  {
    id: "offline",
    path: "/offline",
    title: "Offline Pack",
    titleAm: "ከመስመር ውጭ ፓኬት",
    description: "Download the 3G offline pack for learning without internet connection.",
    descriptionAm: "ያለ ኢንተርኔት ግንኙነት ለመማር የ3G ከመስመር ውጭ ፓኬት ያውርዱ።",
    keywords: ["offline", "pack", "download", "3g", "zip"],
    keywordsAm: ["ከመስመር ውጭ", "ፓኬት", "አውርድ", "ሶስትጂ", "ዚፕ"],
  },
  {
    id: "session",
    path: "/sessions/studio",
    title: "Recorded Session",
    titleAm: "የተቀዳ ክፍለ ጊዜ",
    description: "View the recorded class session with captions and chat history.",
    descriptionAm: "በማብራሪያ እና የውይይት ታሪክ የተቀዳውን የክፍል ክፍለ ጊዜ ይመልከቱ።",
    keywords: ["session", "recorded", "class", "studio", "history"],
    keywordsAm: ["ክፍለ ጊዜ", "የተቀዳ", "ክፍል", "ስቱዲዮ", "ታሪክ"],
  },
  {
    id: "jobs",
    path: "/careers",
    title: "Career Opportunities",
    titleAm: "የስራ እድሎች",
    description: "Explore job opportunities and career paths. Each card has a spoken summary.",
    descriptionAm: "የስራ እድሎችን እና የሙያ መንገዶችን ያስሱ። እያንዳንዱ ካርድ የተነገረ ማጠቃለያ አለው።",
    keywords: ["job", "jobs", "career", "work", "opportunity", "employment"],
    keywordsAm: ["ስራ", "ስራዎች", "ሙያ", "ስራ", "እድል", "ቅጥር"],
  },
  {
    id: "verify",
    path: "/verify",
    title: "Certificate Verification",
    titleAm: "የምስክር ወረቀት ማረጋገጫ",
    description: "Verify your course certificate and badges here.",
    descriptionAm: "የኮርስዎን ምስክር ወረቀት እና ባጆች ከዚህ ያረጋግጡ።",
    keywords: ["verify", "certificate", "badge", "credential", "check"],
    keywordsAm: ["አረጋግጥ", "ምስክር ወረቀት", "ባጅ", "ምስክር", "ፈትሽ"],
  },
  {
    id: "pipeline",
    path: "/pipeline",
    title: "Transcript Pipeline",
    titleAm: "የጽሑፍ ቧንቧ መስመር",
    description: "Access the transcript and translation services.",
    descriptionAm: "የጽሑፍ እና የትርጉም አገልግሎቶችን ይድረሱ።",
    keywords: ["pipeline", "transcript", "translation", "service"],
    keywordsAm: ["ቧንቧ መስመር", "ግልባጭ", "ትርጉም", "አገልግሎት"],
  },
  {
    id: "accessibility",
    path: "/accessibility",
    title: "Accessibility Features",
    titleAm: "የተደራሽነት ባህሪዎች",
    description: "Learn about all accessibility features available in LearnAble.",
    descriptionAm: "በLearnAble ውስጥ ስላሉት የተደራሽነት ባህሪዎች ሁሉ ይወቁ።",
    keywords: ["accessibility", "a11y", "features", "help", "support"],
    keywordsAm: ["ተደራሽነት", "ባህሪዎች", "እገዛ", "ድጋፍ"],
  },
];

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function containsKeyword(text: string, keywords: string[]): boolean {
  const normalized = normalizeText(text);
  return keywords.some(keyword => {
    const normalizedKeyword = normalizeText(keyword);
    return normalized.includes(normalizedKeyword) || 
           normalized.split(" ").some(word => word === normalizedKeyword);
  });
}

function findLocationByCommand(command: string, language: "en" | "am"): CourseLocation | null {
  const normalized = normalizeText(command);
  
  for (const location of COURSE_LOCATIONS) {
    const keywords = language === "am" ? location.keywordsAm : location.keywords;
    
    if (containsKeyword(normalized, keywords)) {
      return location;
    }
    
    const titleMatch = language === "am" 
      ? normalizeText(location.titleAm) 
      : normalizeText(location.title);
    
    if (normalized.includes(titleMatch)) {
      return location;
    }
  }
  
  return null;
}

function isNavigationCommand(command: string, language: "en" | "am"): boolean {
  const normalized = normalizeText(command);
  
  const navPhrases = language === "am" 
    ? ["ሂድ", "ወደ", "ክፈት", "አሳይ", "እፈልጋለሁ", "እፈልግ", "እንሂድ"]
    : ["go to", "open", "show", "navigate", "take me", "i want", "let's go", "go"];
  
  return navPhrases.some(phrase => normalized.includes(normalizeText(phrase)));
}

function isWhereAmI(command: string, language: "en" | "am"): boolean {
  const normalized = normalizeText(command);
  
  const wherePatterns = language === "am"
    ? ["የት ነኝ", "የት ነን", "ይህ የት ነው", "አሁን የት", "ድግሞ ንገረኝ"]
    : ["where am i", "where are we", "current location", "current page", "repeat"];
  
  return wherePatterns.some(pattern => normalized.includes(normalizeText(pattern)));
}

function isHelpCommand(command: string, language: "en" | "am"): boolean {
  const normalized = normalizeText(command);
  
  const helpPatterns = language === "am"
    ? ["እገዛ", "ትእዛዞች", "ምን ማድረግ", "ምን መናገር", "አማራጮች"]
    : ["help", "commands", "what can", "options", "assistance"];
  
  return helpPatterns.some(pattern => normalized.includes(normalizeText(pattern)));
}

export class CourseNavigator {
  static getCurrentLocation(pathname: string): CourseLocation | null {
    const normalized = pathname.replace(/\/$/, "") || "/";
    return COURSE_LOCATIONS.find(loc => loc.path === normalized) || null;
  }

  static processCommand(command: string, currentPath: string, language: "en" | "am"): NavigationResult {
    const normalized = normalizeText(command);
    
    if (!normalized) {
      return {
        action: "unknown",
        message: language === "am" 
          ? "እባክዎ ትእዛዝ ይናገሩ።" 
          : "Please say a command.",
      };
    }

    if (isHelpCommand(normalized, language)) {
      return {
        action: "help",
        message: this.getHelpMessage(language),
      };
    }

    if (isWhereAmI(normalized, language)) {
      const current = this.getCurrentLocation(currentPath, language);
      if (current) {
        return {
          action: "repeat",
          message: language === "am"
            ? `እርስዎ አሁን ${current.titleAm} ገጽ ላይ ነዎት። ${current.descriptionAm}`
            : `You are currently on the ${current.title} page. ${current.description}`,
        };
      }
      return {
        action: "repeat",
        message: language === "am"
          ? "የአሁኑ ቦታ ያልታወቀ ነው።"
          : "Current location is unknown.",
      };
    }

    const targetLocation = findLocationByCommand(normalized, language);
    
    if (targetLocation) {
      const isCurrent = targetLocation.path === (currentPath.replace(/\/$/, "") || "/");
      
      if (isCurrent) {
        return {
          action: "describe",
          message: language === "am"
            ? `እርስዎ አስቀድሞ ${targetLocation.titleAm} ገጽ ላይ ነዎት። ${targetLocation.descriptionAm}`
            : `You are already on the ${targetLocation.title} page. ${targetLocation.description}`,
        };
      }

      return {
        action: "navigate",
        path: targetLocation.path,
        message: language === "am"
          ? `ወደ ${targetLocation.titleAm} እየሄድኩ ነው። ${targetLocation.descriptionAm}`
          : `Navigating to ${targetLocation.title}. ${targetLocation.description}`,
      };
    }

    if (isNavigationCommand(normalized, language)) {
      return {
        action: "unknown",
        message: language === "am"
          ? "ይቅርታ፣ ያንን ቦታ አላገኘሁትም። እባክዎ እንደገና ይሞክሩ ወይም 'እገዛ' ይበሉ።"
          : "Sorry, I couldn't find that location. Please try again or say 'help'.",
      };
    }

    return {
      action: "unknown",
      message: language === "am"
        ? "ይቅርታ፣ ያንን ትእዛዝ አልተረዳሁትም። 'እገዛ' ለአማራጮች ይበሉ።"
        : "Sorry, I didn't understand that command. Say 'help' for options.",
    };
  }

  static getHelpMessage(language: "en" | "am"): string {
    if (language === "am") {
      return `የሚከተሉትን ትእዛዞች መጠቀም ይችላሉ:
• ወደ ትምህርት - የቪዲዮ ትምህርት ይመልከቱ
• ወደ ስራዎች - የስራ እድሎችን ይመልከቱ
• ወደ ምስክር ወረቀት - ምስክር ወረቀት ያረጋግጡ
• ወደ መነሻ - ወደ መነሻ ገጽ ይመለሱ
• የት ነኝ - የአሁኑን ቦታ ይድገሙ
• እገዛ - ይህንን መልእክት ያሳያል`;
    }

    return `You can use these commands:
• Go to lesson - Watch the video lesson
• Go to jobs - View career opportunities
• Go to verify - Check certificates
• Go to home - Return to home page
• Where am I - Repeat current location
• Help - Show this message`;
  }

  static getAllLocations(): CourseLocation[] {
    return [...COURSE_LOCATIONS];
  }

  static getLocationById(id: string): CourseLocation | null {
    return COURSE_LOCATIONS.find(loc => loc.id === id) || null;
  }
}

const FALLBACK_COURSES = [
  {
    id: "cs-foundations",
    title_en: "Computer science, spoken slowly",
    title_am: "የኮምፒውተር ሳይንስ በቀስታ",
    level: "Week 1 · 12 minutes · 3G pack 4.8 MB",
    blurb_en: "Hirut walks through what a computer remembers, without assuming you can see the slides.",
    blurb_am: "ሂሩት ኮምፒውተር ምን እንደሚያስታውስ ታስረዳለች።",
    offline_mb: 4.8,
  },
  {
    id: "market-safety",
    title_en: "Keeping a phone safe in Merkato",
    title_am: "ስልክን በመርካቶ መጠበቅ",
    level: "Week 2 · 9 minutes · 3G pack 3.1 MB",
    blurb_en: "Dawit signs and speaks a short lesson on PINs and asking for help.",
    blurb_am: "ዳዊት ስለ ፒን ያስረዳል።",
    offline_mb: 3.1,
  },
  {
    id: "ethsl-greetings",
    title_en: "Ethiopian Sign Language greetings",
    title_am: "የኢትዮጵያ የምልክት ቋንቋ ሰላምታ",
    level: "Family pack · 6 minutes · 2.4 MB",
    blurb_en: "Five everyday signs. Confirm later with a Deaf teacher.",
    blurb_am: "አምስት ምልክቶች። ከደፍ መምህር ጋር ያረጋግጡ።",
    offline_mb: 2.4,
  },
];

export async function getJson(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(path);
  return res.json();
}

export async function postJson(path, body) {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(path);
  return res.json();
}

export async function loadCourses() {
  try {
    const data = await getJson("/api/courses");
    localStorage.setItem("la-courses", JSON.stringify(data.courses));
    return data.courses;
  } catch {
    const cached = localStorage.getItem("la-courses");
    return cached ? JSON.parse(cached) : FALLBACK_COURSES;
  }
}

export { FALLBACK_COURSES };

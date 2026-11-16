export type Job = {
  id: string;
  title: string;
  titleAm: string;
  org: string;
  place: string;
  time: string;
  access: string;
  summary: string;
  /** Amharic audio summary. Needs native-speaker review. See UI_NOTES.md. */
  summaryAm: string;
};

function employmentType(time: string): string {
  const value = time.toLowerCase();
  if (value.includes("part")) return "PART_TIME";
  if (value.includes("intern") || value.includes("stipend")) return "INTERN";
  if (value.includes("contract")) return "CONTRACTOR";
  return "OTHER";
}

/** schema.org JobPosting for a fictional demo card. The description says it is not a real posting. */
export function jobPosting(job: Job): Record<string, unknown> {
  const remote = job.place.toLowerCase().includes("remote");
  const posting: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: `${job.summary} Fictional demo data, not a real job posting.`,
    hiringOrganization: { "@type": "Organization", name: job.org },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: job.place, addressCountry: "ET" },
    },
    employmentType: employmentType(job.time),
    datePosted: "2026-11-14",
    validThrough: "2026-12-31",
    applicantLocationRequirements: { "@type": "Country", name: "Ethiopia" },
  };
  if (remote) posting.jobLocationType = "TELECOMMUTE";
  return posting;
}

export const jobs: Job[] = [
  {
    id: "caption-partner",
    title: "Caption partner",
    titleAm: "የንዑስ ጽሑፍ አጋር",
    org: "Bole Open Classroom",
    place: "Addis Ababa",
    time: "Part time",
    access: "The summary is on the card, and the same words can be spoken. This card is a fictional demo.",
    summary:
      "Bole Open Classroom is hiring a caption partner in Addis Ababa. The work is part time. You write English and Amharic captions for short lessons. You need a careful ear and a phone that can play audio. This card is a fictional demo for the hackathon, so an employer can hear how a job summary sounds.",
    summaryAm:
      "ቦሌ ክፍት ክፍል በአዲስ አበባ የንዑስ ጽሑፍ አጋር ይፈልጋል። ሥራው የትርፍ ሰዓት ነው። ለአጭር ትምህርቶች የእንግሊዝኛ እና የአማርኛ መግለጫ ይጻፋል። ይህ ካርድ ልብ ወለድ ማሳያ ነው፣ እውነተኛ ቅጥር አይደለም።",
  },
  {
    id: "caption-intern",
    title: "Caption intern",
    titleAm: "የንዑስ ጽሑፍ ልምምድ",
    org: "Community radio",
    place: "Bahir Dar",
    time: "Sample stipend",
    access: "Deaf applicants are welcome in this story. Ethiopian Sign Language is used in the newsroom two days a week. Fictional demo.",
    summary:
      "Turn recorded Amharic shows into captions. A senior editor checks every file. This card is a fictional demo, so the stipend is not a real offer.",
    summaryAm:
      "የተቀዳ የአማርኛ ፕሮግራም ወደ መግለጫ ይቀየራል። ከፍተኛ አርታኢ እያንዳንዱን ፋይል ይመለከታል። ይህ ካርድ ልብ ወለድ ማሳያ ነው፣ እውነተኛ ደመወዝ አይደለም።",
  },
  {
    id: "pdf-maker",
    title: "Accessible PDF maker",
    titleAm: "ተደራሽ ፒዲኤፍ አዘጋጅ",
    org: "Training desk",
    place: "Remote, sized for 3G",
    time: "Sample contract",
    access: "The work can be done from a downloaded pack. Live video meetings are not required. Fictional demo.",
    summary:
      "Add image descriptions and tags to training documents that already exist. This card is a fictional demo, so the contract is not a real offer.",
    summaryAm:
      "ቀድሞ ላለው የስልጠና ሰነድ የምስል መግለጫ እና መለያ ይጨመራል። ይህ ካርድ ልብ ወለድ ማሳያ ነው፣ እውነተኛ ውል አይደለም።",
  },
];

export type Job = {
  id: string;
  title: string;
  titleAm: string;
  org: string;
  place: string;
  time: string;
  access: string;
  summary: string;
};

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
  },
];

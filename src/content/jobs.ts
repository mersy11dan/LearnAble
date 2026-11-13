export type Job = {
  id: string;
  title: string;
  org: string;
  place: string;
  time: string;
  summary: string;
};

export const jobs: Job[] = [
  {
    id: "caption-partner",
    title: "Caption partner",
    org: "Bole Open Classroom",
    place: "Addis Ababa",
    time: "Part time",
    summary:
      "Bole Open Classroom is hiring a caption partner in Addis Ababa. The work is part time. You write English and Amharic captions for short lessons. You need a careful ear and a phone that can play audio. This card is a fictional demo for the hackathon, so an employer can hear how a job summary sounds.",
  },
];

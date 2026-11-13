export type TrackStatus = "ready" | "reserved";

export type Track = {
  id: string;
  name: string;
  status: TrackStatus;
  summary: string;
  href?: string;
};

export const tracks: Track[] = [
  {
    id: "onboarding",
    name: "Accessible onboarding",
    status: "reserved",
    summary:
      "Track 1 is reserved. The public note mentions refugees, returnees, and identification. Kony will send the fuller brief. Add a module under src/content and a route in src/App.tsx.",
  },
  {
    id: "media",
    name: "Accessible learning media",
    status: "ready",
    summary: "Track 2 is this build: the player, captions, sign window, audio description, offline pack, and tagged documents.",
    href: "/lesson/slow-connection",
  },
  {
    id: "assistant",
    name: "Multilingual assistant",
    status: "reserved",
    summary:
      "Track 3 is reserved for a Tigrinya and Arabic assistant with a one-click handoff to a person. The transcript service in server/app.py is the place to add that handoff later.",
  },
  {
    id: "career",
    name: "Career gateway",
    status: "ready",
    summary: "The career add-on is a job card with an audio summary, and a certificate link an employer can check.",
    href: "/careers",
  },
];

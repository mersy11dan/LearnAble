export const CUES = {
  en: [
    [0.0, 4.2, "Hello. My name is Hirut. I am your teacher for this short lesson."],
    [4.2, 9.0, "You do not need to see the screen. I will say everything that matters."],
    [9.0, 14.5, "A computer is a patient clerk. It keeps what you give it."],
    [14.5, 22.0, "Memory is like a wooden shelf in a small shop. Each jar has a name."],
    [22.0, 30.0, "When you save a photo of your sister, the clerk writes a label."],
    [30.0, 38.0, "When you open it later, the clerk brings the same jar back."],
    [38.0, 46.0, "If the shelf is full, the clerk asks you to make space."],
    [46.0, 55.0, "A file is a box. A folder is a bigger box that holds smaller boxes."],
    [55.0, 64.0, "On a phone, the gallery is one big box of pictures."],
    [64.0, 74.0, "If you cannot hear me: Selam is signing on the right. Captions sit under the picture."],
    [74.0, 84.0, "Save this lesson, turn on aeroplane mode, and play it again."],
    [84.0, 92.0, "When you finish, mark yourself present. See you tomorrow."],
  ],
  am: [
    [0.0, 4.2, "ሰላም። ስሜ ሂሩት ነው።"],
    [4.2, 9.0, "ስክሪኑን ማየት አያስፈልግዎትም።"],
    [9.0, 14.5, "ኮምፒውተር ታጋሽ ጸሐፊ ነው።"],
    [14.5, 22.0, "ማስታወስ እንደ የሱቅ መደርደሪያ ነው።"],
    [22.0, 30.0, "የእህትዎን ፎቶ ሲያስቀምጡ ስም ይጻፋል።"],
    [30.0, 38.0, "በኋላ ሲከፍቱት ያንኑ ማሰሮ ይመለሳል።"],
    [38.0, 46.0, "መደርደሪያው ሲሞላ ቦታ ይጠይቃል።"],
    [46.0, 55.0, "ፋይል ሳጥን ነው። ፎልደር ትልቅ ሳጥን ነው።"],
    [55.0, 64.0, "በስልክ ጋለሪ አንድ የምስል ሳጥን ነው።"],
    [64.0, 74.0, "ሰላም በቀኝ ትተረጉማለች። ንዑስ ጽሑፍ ከታች ነው።"],
    [74.0, 84.0, "ትምህርቱን አስቀምጡና አውሮፕላን ሁነታን ያብሩ።"],
    [84.0, 92.0, "ሲጨርሱ መገኘትዎን ምልክት ያድርጉ።"],
  ],
  ad: [
    [0.0, 5.0, "Hirut sits at a wooden table. A blue notebook is open."],
    [18.0, 24.0, "A shelf of labelled jars. One label reads sister, Sunday."],
    [46.0, 52.0, "A small cardboard box slides into a larger box."],
    [64.0, 72.0, "Selam signs slowly against a green cloth."],
  ],
};

export const SIGNS = [
  { at: 0, en: "Hello", am: "ሰላም" },
  { at: 14, en: "Computer / clerk", am: "ኮምፒውተር" },
  { at: 22, en: "Memory / shelf", am: "ማስታወስ" },
  { at: 46, en: "Box / file", am: "ሳጥን" },
  { at: 64, en: "Look here", am: "እዚህ ተመልከት" },
  { at: 84, en: "See you", am: "እንገናኛለን" },
];

export function cueAt(list, t) {
  return list.find((c) => t >= c[0] && t < c[1]) || list[list.length - 1];
}

"""Ethiopian inclusive demo content — consented, classroom-scale, bilingual."""

from __future__ import annotations

COURSES = [
    {
        "id": "cs-foundations",
        "title_en": "Computer science, spoken slowly",
        "title_am": "የኮምፒውተር ሳይንስ በቀስታ",
        "level": "Week 1 · 12 minutes · 3G pack 4.8 MB",
        "for_who": "Blind, low vision, Deaf, hard of hearing, slow connection",
        "blurb_en": "Hirut walks through what a computer actually does, without assuming you can see the slides.",
        "blurb_am": "ሂሩት ኮምፒውተር ምን እንደሚሰራ ታስረዳለች፤ ስላይዱን ማየት አያስፈልግም።",
        "offline_mb": 4.8,
        "has_esl": True,
        "has_ad": True,
        "has_am_captions": True,
    },
    {
        "id": "market-safety",
        "title_en": "Keeping a phone safe in Merkato",
        "title_am": "ስልክን በመርካቶ መጠበቅ",
        "level": "Week 2 · 9 minutes · 3G pack 3.1 MB",
        "for_who": "Deaf sellers, screen-reader users",
        "blurb_en": "Dawit signs and speaks a short lesson on PINs, sharing screens, and asking for help.",
        "blurb_am": "ዳዊት ስለ ፒን እና ስለ እርዳታ መጠየቅ በቋንቋ እና በኢትዮጵያ የምልክት ቋንቋ ያስረዳል።",
        "offline_mb": 3.1,
        "has_esl": True,
        "has_ad": True,
        "has_am_captions": True,
    },
    {
        "id": "ethsl-greetings",
        "title_en": "Ethiopian Sign Language greetings",
        "title_am": "የኢትዮጵያ የምልክት ቋንቋ ሰላምታ",
        "level": "Family pack · 6 minutes · 2.4 MB",
        "for_who": "Hearing families of Deaf learners",
        "blurb_en": "Five everyday signs. Practise with a Deaf teacher afterwards — this is a helper, not a replacement.",
        "blurb_am": "አምስት የዕለት ተዕለት ምልክቶች። ከዚህ በኋላ ከደፍ መምህር ጋር ይለማመዱ።",
        "offline_mb": 2.4,
        "has_esl": True,
        "has_ad": True,
        "has_am_captions": True,
    },
]

LESSONS = {
    "cs-foundations": {
        "id": "cs-1",
        "course_id": "cs-foundations",
        "title_en": "What a computer remembers",
        "title_am": "ኮምፒውተር የሚያስታውሰው",
        "duration_sec": 92,
        "chapters": [
            {"t": 0, "en": "Welcome", "am": "እንኳን ደህና መጡ"},
            {"t": 18, "en": "Memory is a shelf", "am": "ማስታወስ መደርደሪያ ነው"},
            {"t": 48, "en": "Files are labelled boxes", "am": "ፋይሎች ሳጥኖች ናቸው"},
            {"t": 78, "en": "Try it on your phone", "am": "በስልክዎ ይሞክሩ"},
        ],
        "transcript_en": [
            (0.0, 4.2, "Hello. My name is Hirut. I am your teacher for this short lesson."),
            (4.2, 9.0, "You do not need to see the screen. I will say everything that matters."),
            (9.0, 14.5, "A computer is a patient clerk. It keeps what you give it, in the order you give it."),
            (14.5, 22.0, "Memory is like a wooden shelf in a small shop. Each jar has a name."),
            (22.0, 30.0, "When you save a photo of your sister, the clerk writes a label: sister, Sunday, Merkato."),
            (30.0, 38.0, "When you open it later, the clerk reads the label and brings the same jar back."),
            (38.0, 46.0, "If the shelf is full, the clerk asks you to make space. That is storage, not magic."),
            (46.0, 55.0, "A file is a box. A folder is a bigger box that holds smaller boxes."),
            (55.0, 64.0, "On a phone, the gallery is one big box of pictures. Messages sit in another box."),
            (64.0, 74.0, "For classmates who cannot hear me: look at Selam signing on the right. Captions are under the video."),
            (74.0, 84.0, "Try this: save this lesson for offline. Then turn on aeroplane mode and play it again."),
            (84.0, 92.0, "When you finish, mark yourself present so we know you came to class. See you tomorrow."),
        ],
        "transcript_am": [
            (0.0, 4.2, "ሰላም። ስሜ ሂሩት ነው። ለዚህ አጭር ትምህርት መምህር ነኝ።"),
            (4.2, 9.0, "ስክሪኑን ማየት አያስፈልግዎትም። የሚያስፈልገውን ሁሉ እናገራለሁ።"),
            (9.0, 14.5, "ኮምፒውተር ታጋሽ ጸሐፊ ነው። የሰጡትን በሰጡት ቅደም ተከተል ይይዛል።"),
            (14.5, 22.0, "ማስታወስ እንደ የሱቅ መደርደሪያ ነው። እያንዳንዱ ማሰሮ ስም አለው።"),
            (22.0, 30.0, "የእህትዎን ፎቶ ሲያስቀምጡ ጸሐፊው ስም ይጽፋል።"),
            (30.0, 38.0, "በኋላ ሲከፍቱት ያንኑ ማሰሮ ይመልሳል።"),
            (38.0, 46.0, "መደርደሪያው ሲሞላ ቦታ እንዲያደርጉ ይጠይቃል።"),
            (46.0, 55.0, "ፋይል ሳጥን ነው። ፎልደር ትልቅ ሳጥን ነው።"),
            (55.0, 64.0, "በስልክ ጋለሪ አንድ ትልቅ የምስል ሳጥን ነው።"),
            (64.0, 74.0, "ለማይሰሙት፦ ሰላም በቀኝ ትተረጉማለች። ንዑስ ጽሑፍ ከቪዲዮ በታች ነው።"),
            (74.0, 84.0, "ይህን ትምህርት ከመስመር ውጭ ያስቀምጡ። ከዚያ አውሮፕላን ሁነታን ያብሩ።"),
            (84.0, 92.0, "ሲጨርሱ መገኘትዎን ምልክት ያድርጉ። ነገ እንገናኛለን።"),
        ],
        "audio_description_en": [
            (0.0, 5.0, "Hirut sits at a wooden table. A blue school notebook is open. Her hands rest on the page."),
            (18.0, 24.0, "Cut to a shelf of labelled jars. One label reads sister, Sunday."),
            (46.0, 52.0, "Two cardboard boxes. The small one slides into the large one."),
            (64.0, 72.0, "Selam appears in the sign window, wearing a black shirt, signing slowly against a green cloth."),
        ],
        "diagram_alt": "A shelf with three jars labelled photo, message, and song. A hand places the photo jar on the middle shelf.",
    }
}

ETHSL = [
    {"id": "hello", "en": "Hello", "am": "ሰላም", "how": "Open hand near the temple, then a small arc forward. Confirm with a Deaf teacher."},
    {"id": "thank-you", "en": "Thank you", "am": "አመሰግናለሁ", "how": "Flat hand from the chin, moving forward and down."},
    {"id": "school", "en": "School", "am": "ትምህርት ቤት", "how": "Clap the hands twice, then point toward a place in front of you."},
    {"id": "water", "en": "Water", "am": "ውሃ", "how": "Index finger taps the chin, then a W-shape near the mouth — verify locally."},
    {"id": "help", "en": "Help", "am": "እርዳታ", "how": "Closed fist on an open palm, both rising together."},
]

JOBS = [
    {
        "id": "job-1",
        "title_en": "Customer voice assistant — Ethio telecom partner shop",
        "title_am": "የደንበኛ ድምጽ ረዳት",
        "city": "Addis Ababa · Piassa",
        "pay": "ETB 8,400 / month · part time",
        "access_en": "Screen reader tested. No visual-only training. Audio summary available.",
        "access_am": "በስክሪን አንባቢ ተፈትኗል። የድምጽ ማጠቃለያ አለ።",
        "summary_en": "Sit with customers who cannot see the counter. Read plans aloud. The shop already has a quiet room.",
        "zoom_ok": True,
    },
    {
        "id": "job-2",
        "title_en": "Caption intern — community radio",
        "title_am": "የንዑስ ጽሑፍ ልምምድ",
        "city": "Bahir Dar",
        "pay": "ETB 6,000 stipend",
        "access_en": "Deaf applicants welcome. Ethiopian Sign Language used in the newsroom two days a week.",
        "access_am": "ደፍ አመልካቾች እንኳን ደህና መጡ።",
        "summary_en": "Turn recorded Amharic shows into captions. A senior editor checks every file.",
        "zoom_ok": True,
    },
    {
        "id": "job-3",
        "title_en": "Accessible PDF maker — ministry training desk",
        "title_am": "ተደራሽ ፒዲኤፍ አዘጋጅ",
        "city": "Remote · 3G friendly",
        "pay": "Contract",
        "access_en": "Work from a downloaded pack. No live video meetings required.",
        "access_am": "ከተወረደ ጥቅል መስራት ይቻላል።",
        "summary_en": "Add image descriptions and tags to existing training PDFs.",
        "zoom_ok": True,
    },
]

DOCUMENTS = [
    {
        "id": "doc-shelf",
        "title_en": "Lesson diagram: the memory shelf",
        "title_am": "የማስታወስ መደርደሪያ",
        "html": "<p>Three jars sit on a wooden shelf. Left jar: Photo of sister. Middle jar: Voice note. Right jar: Song.</p>",
        "image_desc_en": "A mid-tone wooden shelf, eye height. Three glass jars with paper labels in large print.",
        "image_desc_am": "የእንጨት መደርደሪያ ከሶስት ማሰሮዎች ጋር።",
        "tagged": True,
    }
]

EVENTS = [
    {"id": "tue-live", "when": "Tuesday 16:00 East Africa Time", "title_en": "Live revision with Selam signing", "title_am": "ከሰላም ጋር የቀጥታ ክለሳ"},
    {"id": "thu-clinic", "when": "Thursday 09:00", "title_en": "Screen-reader clinic", "title_am": "የስክሪን አንባቢ ክሊኒክ"},
]

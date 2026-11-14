import { useState } from "react";
import { demoLesson, transcript } from "../content/lesson";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { toBrf } from "../lib/braille";
import { buildTaggedPdf } from "../lib/taggedPdf";
import { saveFile } from "../lib/pack";

export function ReadPage() {
  const [message, setMessage] = useState("");

  async function downloadPdf() {
    const shipped = await fetch("/media/learnable-lesson.pdf");
    if (shipped.ok) {
      saveFile(new Uint8Array(await shipped.arrayBuffer()), "learnable-lesson.pdf", "application/pdf");
      setMessage("Tagged PDF downloaded. It includes the English, the Amharic, and the picture description.");
      return;
    }
    const pdf = buildTaggedPdf({
      title: demoLesson.title,
      paragraphs: [...demoLesson.segments.map((segment) => segment.en), demoLesson.figure.long],
      figureAlt: demoLesson.figure.alt,
    });
    saveFile(pdf, "learnable-lesson.pdf", "application/pdf");
    setMessage("Tagged PDF downloaded. Amharic is on this page. The fallback file has the English and the picture description.");
  }

  function downloadBrf(language: "en" | "am") {
    const text = language === "en" ? transcript("en") : transcript("am");
    const bytes = new TextEncoder().encode(toBrf(text));
    saveFile(bytes, language === "en" ? "lesson-en.brf" : "lesson-am.brf", "text/plain");
    setMessage(language === "en" ? "English braille file downloaded." : "Amharic braille file downloaded.");
  }

  return (
    <div className="page">
      <Breadcrumbs
        items={[
          { to: "/", label: "LearnAble" },
          { to: `/lesson/${demoLesson.id}`, label: "Lesson" },
          { label: "Text" },
        ]}
      />
      <article className="document">
        <h1>{demoLesson.title}</h1>
        <p className="measure" lang="am">
          ይህ የትምህርቱ ጽሑፍ ቅጂ ነው። ሥዕሉ መግለጫ አለው። ፋይሉን ያለ ቪዲዮ ማንበብ ይቻላል።
        </p>
        <figure>
          <img src={demoLesson.figure.src} alt={demoLesson.figure.alt} />
          <figcaption id="figure-long">{demoLesson.figure.long}</figcaption>
        </figure>
        {demoLesson.segments.map((segment) => (
          <section key={segment.start}>
            <h2 lang="en">{segment.en}</h2>
            <p lang="am">{segment.am}</p>
            <p>Picture: {segment.ad}</p>
            <p>Corrected by hand. ASL gloss (English → ASL), not Ethiopian Sign Language: {segment.gloss}</p>
          </section>
        ))}
      </article>
      <div className="actions">
        <button type="button" onClick={downloadPdf}>
          Download tagged PDF
        </button>
        <button type="button" onClick={() => downloadBrf("en")}>
          Download English braille
        </button>
        <button type="button" onClick={() => downloadBrf("am")}>
          Download Amharic braille
        </button>
      </div>
      {message ? <p role="status">{message}</p> : null}
      <p className="measure">
        The PDF has a document title, marked structure, a figure with a text alternative, English in Helvetica, and
        Amharic in Noto Sans Ethiopic. This page has the same words and the same picture description. The braille
        files are uncontracted grade 1, in Braille ASCII (.brf).
      </p>
    </div>
  );
}

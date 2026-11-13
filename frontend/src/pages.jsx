import { useEffect, useRef, useState } from "react";
import { loadCourses, postJson } from "./api.js";
import { downloadedIds, speak } from "./offline.js";

export function Home({ t, lang, setHash, consistency }) {
  const [courses, setCourses] = useState([]);
  const saved = downloadedIds();
  useEffect(() => {
    loadCourses().then(setCourses);
  }, []);
  return (
    <section>
      <p className="kicker">{t.tag}</p>
      <h1>{t.greeting}</h1>
      <p className="lede">{t.lede}</p>
      {consistency && (
        <div className={`banner ${consistency.tone === "ok" ? "" : "warn"}`} role="status">
          {lang === "am" ? consistency.message_am : consistency.message_en}
          {consistency.action && (
            <div style={{ marginTop: "0.5rem" }}>
              <button type="button" onClick={() => setHash("lesson")}>
                {consistency.action}
              </button>
            </div>
          )}
        </div>
      )}
      <h2>{t.continue}</h2>
      <div className="cards">
        {courses.map((c) => (
          <article className="card" key={c.id}>
            <p className="meta">{c.level}</p>
            <h2>{lang === "am" ? c.title_am : c.title_en}</h2>
            <p>{lang === "am" ? c.blurb_am : c.blurb_en}</p>
            {saved.includes(c.id) && <p className="meta">{t.downloaded}</p>}
            <button type="button" onClick={() => setHash("lesson")}>
              Open lesson
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Vision({ t, lang }) {
  const videoRef = useRef(null);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [on, setOn] = useState(false);

  async function start() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false });
    videoRef.current.srcObject = stream;
    await videoRef.current.play();
    setOn(true);
  }

  function localDescribe(canvas) {
    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;
    const data = ctx.getImageData(0, 0, width, height).data;
    let r = 0, g = 0, b = 0, n = 0;
    for (let i = 0; i < data.length; i += 16) {
      r += data[i]; g += data[i + 1]; b += data[i + 2]; n += 1;
    }
    r /= n; g /= n; b /= n;
    const bright = (r + g + b) / 3;
    const en = `Classroom view, ${width} by ${height}. Average light ${Math.round(bright)}. This is a learning description, not a walking guide.`;
    const am = `የክፍል እይታ። ብርሃን ${Math.round(bright)}። ለመንገድ አይደለም።`;
    return { en, am };
  }

  async function capture() {
    setBusy(true);
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 320;
    canvas.height = video.videoHeight || 240;
    canvas.getContext("2d").drawImage(video, 0, 0);
    const local = localDescribe(canvas);
    let summary = lang === "am" ? local.am : local.en;
    try {
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.6));
      const fd = new FormData();
      fd.append("file", blob, "view.jpg");
      fd.append("hint", "classroom diagram");
      const res = await fetch("/api/vision/describe", { method: "POST", body: fd });
      if (res.ok) {
        const data = await res.json();
        summary = lang === "am" ? data.summary_am : data.summary_en;
      }
    } catch {
      /* keep local */
    }
    setText(summary);
    speak(summary, lang);
    setBusy(false);
  }

  return (
    <section>
      <h1>{t.vision}</h1>
      <p className="lede">{t.visionLead}</p>
      <video ref={videoRef} className="camera" playsInline muted aria-label="Camera preview" />
      <div className="row" style={{ marginTop: "0.7rem" }}>
        <button type="button" onClick={start}>{on ? "Camera on" : "Open camera"}</button>
        <button type="button" onClick={capture} disabled={!on || busy}>{busy ? "Looking…" : t.capture}</button>
      </div>
      {text && <p className="banner" role="status">{text}</p>}
      <p className="meta">Future: same pipeline can accept a Meta glasses still. Ethiopia is not on the Be My Eyes glasses list yet, so the phone is the product.</p>
    </section>
  );
}

export function Career({ t, lang }) {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    fetch("/api/jobs")
      .then((r) => r.json())
      .then((d) => setJobs(d.jobs))
      .catch(() =>
        setJobs([
          {
            id: "job-1",
            title_en: "Customer voice assistant — Piassa",
            title_am: "የደንበኛ ድምጽ ረዳት",
            city: "Addis Ababa",
            pay: "ETB 8,400",
            access_en: "Screen reader tested. Works at 200% zoom.",
            access_am: "በስክሪን አንባቢ ተፈትኗል።",
            summary_en: "Read plans aloud in a quiet room.",
          },
        ])
      );
  }, []);
  return (
    <section>
      <h1>{t.jobs}</h1>
      <p className="lede">Job cards stay readable at 200% zoom. Each one has an audio summary.</p>
      <div className="cards">
        {jobs.map((j) => (
          <article className="job" key={j.id} style={{ zoom: 1 }}>
            <p className="meta">{j.city} · {j.pay}</p>
            <h2>{lang === "am" ? j.title_am : j.title_en}</h2>
            <p>{lang === "am" ? j.access_am : j.access_en}</p>
            <button className="ghost" type="button" onClick={() => speak(j.summary_en, "en")}>
              Play audio summary
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Documents({ t, lang }) {
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    fetch("/api/documents")
      .then((r) => r.json())
      .then((d) => setDocs(d.documents))
      .catch(() =>
        setDocs([
          {
            id: "doc-shelf",
            title_en: "The memory shelf",
            title_am: "የማስታወስ መደርደሪያ",
            html: "<p>Three jars sit on a wooden shelf.</p>",
            image_desc_en: "A wooden shelf with three labelled jars.",
            image_desc_am: "ከሶስት ማሰሮዎች ጋር የእንጨት መደርደሪያ።",
          },
        ])
      );
  }, []);
  return (
    <section>
      <h1>{t.docs}</h1>
      {docs.map((d) => (
        <article className="card" key={d.id} style={{ marginBottom: "1rem" }}>
          <h2>{lang === "am" ? d.title_am : d.title_en}</h2>
          <div dangerouslySetInnerHTML={{ __html: d.html }} />
          <p><strong>Image:</strong> {lang === "am" ? d.image_desc_am : d.image_desc_en}</p>
        </article>
      ))}
    </section>
  );
}

export function Attendance({ t, lang, consistency, reload }) {
  async function here() {
    try {
      await postJson("/api/attendance", { learner_id: "hirut-01", lesson_id: "cs-1", status: "present" });
    } catch {
      const { queueEvent } = await import("./offline.js");
      queueEvent({ type: "attendance", lesson_id: "cs-1", status: "present" });
    }
    speak(lang === "am" ? "መጥተሃል" : "You are here", lang);
    reload();
  }
  return (
    <section>
      <h1>{t.attend}</h1>
      <p className="lede">Python on the server watches whether you still come to class, then reminds you in Amharic or English.</p>
      {consistency && (
        <div className="banner">
          <p>{lang === "am" ? consistency.message_am : consistency.message_en}</p>
          <p className="meta">Hours since last seen: {consistency.hours_since_seen}</p>
        </div>
      )}
      <button type="button" onClick={here}>{t.present}</button>
      {consistency?.history?.length > 0 && (
        <ul>
          {consistency.history.map((h) => (
            <li key={h.id}>{h.status} · {h.at}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

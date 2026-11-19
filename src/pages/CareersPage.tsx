import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocale } from "../a11y/locale";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { jobPosting, jobs, type Job } from "../content/jobs";
import { speak, stopSpeaking, whenVoice } from "../lib/speech";

export function CareersPage() {
  const { lang } = useLocale();
  const [voiceNote, setVoiceNote] = useState("");

  async function play(job: Job) {
    if (lang === "am") {
      const voice = await whenVoice("am");
      if (voice !== "ready") {
        setVoiceNote("No Amharic voice is available on this device. The Amharic summary stays on this page.");
        return;
      }
      setVoiceNote("");
      speak(job.summaryAm, "am");
      return;
    }
    setVoiceNote("");
    speak(job.summary, "en");
  }

  return (
    <div className="page">
      <Breadcrumbs items={[{ to: "/", label: "LearnAble" }, { label: "Jobs" }]} />
      <h1>Jobs</h1>
      <p className="measure">
        A job card has to stay readable when the page is zoomed to 200 percent. The summary is on the card, and the
        same words can be spoken. These cards are fictional demo data.
      </p>
      {voiceNote ? (
        <p className="notice" role="status">
          {voiceNote}
        </p>
      ) : null}
      {jobs.map((job) => (
        <article key={job.id} className="job">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPosting(job)) }} />
          <h2>{job.title}</h2>
          <p lang="am">{job.titleAm}</p>
          <p>
            {job.org}, {job.place}, {job.time}
          </p>
          <p>{job.access}</p>
          <p id={`${job.id}-summary`}>{job.summary}</p>
          <p lang="am">{job.summaryAm}</p>
          <div className="actions">
            <button type="button" onClick={() => void play(job)}>
              Play audio summary
            </button>
            <button type="button" onClick={() => stopSpeaking()}>
              Stop audio
            </button>
            <Link to="/verify">Verifiable certificate</Link>
          </div>
        </article>
      ))}
      <p className="next">
        <Link to="/verify">Next: check a certificate</Link>
      </p>
    </div>
  );
}

import { Link } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { jobs } from "../content/jobs";
import { speak, stopSpeaking } from "../lib/speech";

export function CareersPage() {
  return (
    <div className="page">
      <Breadcrumbs items={[{ to: "/", label: "LearnAble" }, { label: "Jobs" }]} />
      <h1>Jobs</h1>
      <p className="measure">
        A job card has to stay readable when the page is zoomed to 200 percent. The summary is on the card, and the
        same words can be spoken.
      </p>
      {jobs.map((job) => (
        <article key={job.id} className="job">
          <h2>{job.title}</h2>
          <p lang="am">{job.titleAm}</p>
          <p>
            {job.org}, {job.place}, {job.time}
          </p>
          <p>{job.access}</p>
          <p id={`${job.id}-summary`}>{job.summary}</p>
          <div className="actions">
            <button type="button" onClick={() => speak(job.summary, "en")}>
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

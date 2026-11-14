import { useState } from "react";
import { Link } from "react-router-dom";
import { AccessiblePlayer } from "../components/AccessiblePlayer";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { demoLesson } from "../content/lesson";
import { dualDate } from "../lib/calendar";
import { formatTime } from "../lib/time";

export function SessionPage() {
  const [time, setTime] = useState(0);
  const visible = demoLesson.chat.filter((line) => line.time <= time + 0.05);

  return (
    <div className="page">
      <Breadcrumbs items={[{ to: "/", label: "LearnAble" }, { label: "Session" }]} />
      <h1>Recorded session: captions on a slow phone</h1>
      <p className="measure">
        This is a sample of a live class that was recorded. Captions follow the lesson. Chat lines appear at the
        moment they were sent. Recorded {dualDate("2026-11-14")}. Nothing here is a recording of a real class.
      </p>
      <div className="session-grid">
        <AccessiblePlayer
          title="Recorded session"
          video={demoLesson.video}
          segments={demoLesson.segments}
          tracks={demoLesson.captions}
          signVideo={demoLesson.signVideo}
          signPoster={demoLesson.signPoster}
          onTime={setTime}
        />
        <section className="chat" aria-label="Chat log">
          <h2>Chat log</h2>
          <ol aria-live="polite" aria-relevant="additions">
            {visible.map((line) => (
              <li key={`${line.time}-${line.speaker}`}>
                <span className="stamp">{formatTime(line.time)}</span>
                <strong>{line.speaker}</strong>
                <span>{line.text}</span>
              </li>
            ))}
          </ol>
          {visible.length === 0 ? <p className="notice notice-wait">Chat appears as the recording plays.</p> : null}
        </section>
      </div>
      <p className="next">
        <Link to="/careers">Next: the job card</Link>
      </p>
    </div>
  );
}

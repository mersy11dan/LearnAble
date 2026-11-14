import { Link } from "react-router-dom";
import { demoLesson } from "../content/lesson";

export function HomePage() {
  const first = demoLesson.segments[0];
  return (
    <section className="opening">
      <figure className="frame">
        <img
          src={demoLesson.video.poster}
          width={1280}
          height={720}
          alt="A drawn phone on paper, the first frame of the lesson."
        />
        <figcaption>
          <p lang="en">{first.en}</p>
          <p lang="am">{first.am}</p>
        </figcaption>
      </figure>
      <div className="opening-copy">
        <h1>{demoLesson.title}</h1>
        <p>
          The caption under that frame is the lesson. English, Amharic, a sign window, and a spoken description of the
          picture. The sound and the text can leave with you.
        </p>
        <p className="actions">
          <Link className="button" to="/lesson/slow-connection">
            Open the lesson
          </Link>
          <Link to="/offline">Get the 3G pack</Link>
        </p>
        <nav aria-label="In this lesson">
          <ul className="route-line">
            <li>
              <Link to="/lesson/slow-connection">Player</Link>
            </li>
            <li>
              <Link to="/lesson/slow-connection/read">Text</Link>
            </li>
            <li>
              <Link to="/offline">Pack</Link>
            </li>
            <li>
              <Link to="/sessions/studio">Session</Link>
            </li>
            <li>
              <Link to="/careers">Job card</Link>
            </li>
          </ul>
        </nav>
        <p>
          The Savanna learner pages sit beside this, unchanged. <Link to="/savanna">Open them</Link>.
        </p>
      </div>
    </section>
  );
}

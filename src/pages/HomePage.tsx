import { Link } from "react-router-dom";
import { demoLesson } from "../content/lesson";

export function HomePage() {
  const first = demoLesson.segments[0];
  return (
    <section className="opening">
      <figure className="preview">
        <div className="preview-stage" aria-hidden="true">
          <div className="preview-phone" />
          <div className="preview-sign">
            <span>Ethiopian Sign Language</span>
            <strong>{first.gloss}</strong>
          </div>
        </div>
        <figcaption className="preview-captions">
          <p lang="en">{first.en}</p>
          <p lang="am">{first.am}</p>
        </figcaption>
      </figure>
      <div className="opening-copy">
        <h1>{demoLesson.title}</h1>
        <p>
          English under the picture, Amharic in yellow, and the sign gloss beside the phone. Open the lesson to play it,
          resize the captions, and keep a copy for a slow connection.
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

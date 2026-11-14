import { Link } from "react-router-dom";
import { useLocale } from "../a11y/locale";
import { demoLesson } from "../content/lesson";
import { rememberedLesson } from "../lib/resume";

export function HomePage() {
  const { chrome } = useLocale();
  const first = demoLesson.segments[0];
  const resume = rememberedLesson();
  return (
    <section className="opening">
      <figure className="preview">
        <div className="preview-stage" aria-hidden="true">
          <div className="preview-phone" />
          <div className="preview-sign">
            <span>ASL gloss (English → ASL), not Ethiopian Sign Language</span>
            <span>Corrected by hand</span>
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
        {resume ? (
          <p className="notice" role="status">
            <Link to={`/lesson/${resume}`}>{chrome.continue}</Link>
          </p>
        ) : null}
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
          LearnAble is a plug-in. The Savanna pages stay as they were. <Link to="/demo">See them before and with one script tag</Link>.
        </p>
      </div>
    </section>
  );
}

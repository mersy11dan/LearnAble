import { Link } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { tracks } from "../content/tracks";

export function TracksPage() {
  return (
    <div className="page">
      <Breadcrumbs items={[{ to: "/", label: "LearnAble" }, { label: "Tracks" }]} />
      <h1>Tracks</h1>
      <p className="measure">
        Track 2 and the career gateway are built. Tracks 1 and 3 are named so the next brief can land in the same app
        without a rewrite.
      </p>
      <ul className="plain">
        {tracks.map((track) => (
          <li key={track.id}>
            <h2>
              {track.name} <span className="stamp">{track.status === "ready" ? "Ready" : "Reserved"}</span>
            </h2>
            <p>{track.summary}</p>
            {track.href ? <Link to={track.href}>Open</Link> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

import { Link, useParams } from "react-router-dom";
import { AccessiblePlayer } from "../components/AccessiblePlayer";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { demoLesson } from "../content/lesson";

export function LessonPage() {
  const { lessonId } = useParams();
  if (lessonId !== demoLesson.id) {
    return (
      <div className="page">
        <h1>That lesson is not in this demo</h1>
        <p>
          <Link to={`/lesson/${demoLesson.id}`}>Open the demo lesson</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="page">
      <Breadcrumbs items={[{ to: "/", label: "LearnAble" }, { label: "Lesson" }]} />
      <h1>{demoLesson.title}</h1>
      <p className="measure">{demoLesson.voiceNote}</p>
      <p className="actions">
        <a href="#player">Skip to player</a>
        <Link to={`/lesson/${demoLesson.id}/read`}>Read the text version</Link>
        <Link to="/offline">Download the 3G pack</Link>
      </p>
      <AccessiblePlayer
        title={demoLesson.title}
        video={demoLesson.video}
        segments={demoLesson.segments}
        tracks={demoLesson.captions}
        signVideo={demoLesson.signVideo}
        signPoster={demoLesson.signPoster}
      />
      <p className="next">
        <Link to="/offline">Next: keep the 3G pack</Link>
      </p>
    </div>
  );
}

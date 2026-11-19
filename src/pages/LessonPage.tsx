import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AccessiblePlayer } from "../components/AccessiblePlayer";
import { SignVideoRead } from "../components/SignVideoRead";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { CertificateOffer } from "../components/CertificateOffer";
import { demoLesson } from "../content/lesson";
import { isLessonComplete, markLessonComplete } from "../lib/completion";
import { rememberLesson } from "../lib/resume";

export function LessonPage() {
  const { lessonId } = useParams();
  const [done, setDone] = useState(() => (lessonId ? isLessonComplete(lessonId) : false));
  const finish = useCallback(() => {
    if (!lessonId) return;
    markLessonComplete(lessonId);
    setDone(true);
  }, [lessonId]);
  useEffect(() => {
    if (lessonId === demoLesson.id) rememberLesson(demoLesson.id);
    setDone(lessonId ? isLessonComplete(lessonId) : false);
  }, [lessonId]);
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
      <p className="measure">
        The sign window is a placeholder for a recorded interpreter. A Deaf teacher still owns the language. A short
        list of signs is a helper, and it does not replace that teacher.
      </p>
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
        onComplete={finish}
      />
      <SignVideoRead />
      {done ? <CertificateOffer courseId={demoLesson.id} /> : null}
      <p className="next">
        <Link to="/offline">Next: keep the 3G pack</Link>
      </p>
    </div>
  );
}

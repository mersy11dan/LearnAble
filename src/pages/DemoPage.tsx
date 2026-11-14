import { useState } from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";

const BEFORE = "/reference/savanna/pages/concept-with-navigation.html";
const WITH = "/with-learnable/pages/concept-with-navigation.html";

export function DemoPage() {
  const [mode, setMode] = useState<"before" | "with">("with");
  const src = mode === "before" ? BEFORE : WITH;
  return (
    <div className="page">
      <Breadcrumbs items={[{ to: "/", label: "LearnAble" }, { label: "Savanna demo" }]} />
      <h1>Savanna before, then with one script tag</h1>
      <p className="measure">
        The original pages are unchanged. The with pages are those same files plus a script tag and a{" "}
        <code>learnable-player</code> element.
      </p>
      <div className="actions" role="group" aria-label="Which version">
        <button type="button" aria-pressed={mode === "before"} onClick={() => setMode("before")}>
          Before
        </button>
        <button type="button" aria-pressed={mode === "with"} onClick={() => setMode("with")}>
          With LearnAble
        </button>
      </div>
      <p>
        <a href={BEFORE}>Open the original page</a>
        {" · "}
        <a href={WITH}>Open the page with LearnAble</a>
      </p>
      <iframe className="demo-frame" title={mode === "before" ? "Savanna before LearnAble" : "Savanna with LearnAble"} src={src} />
      <p className="next">
        <Link to="/integrate">Next: copy the embed snippet</Link>
      </p>
    </div>
  );
}

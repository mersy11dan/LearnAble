import { Link } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";

export function AccessibilityPage() {
  return (
    <div className="page">
      <Breadcrumbs items={[{ to: "/", label: "LearnAble" }, { label: "Accessibility" }]} />
      <h1>Accessibility</h1>
      <p className="measure">
        LearnAble is built for a learner who is Deaf or hard of hearing, blind or with low vision, or on a slow
        connection. The page can be used from the keyboard. Captions can change size and colour. Motion can be stopped.
        Text can be larger, and the layout is meant to hold together at 200 percent zoom.
      </p>
      <h2>What works without a key</h2>
      <ul>
        <li>English and Amharic captions for the demo lesson</li>
        <li>A device voice for narration, audio description, and the job summary</li>
        <li>The sign window, with a labelled placeholder rather than a fake signer</li>
        <li>The light pack, the tagged PDF, and braille files</li>
      </ul>
      <h2>What a key adds</h2>
      <p>
        Hasab can transcribe, translate, and speak. Hugging Face can run the models named on the{" "}
        <Link to="/pipeline">pipeline page</Link>. If a service fails, the sample lesson stays in place.
      </p>
      <h2>Known limits</h2>
      <ul>
        <li>The sign window shows precomputed ASL gloss for English captions. It is not Ethiopian Sign Language. Amharic captions are not glossed. There is still no recorded signer.</li>
        <li>Braille is uncontracted grade 1, not a full liblouis contraction.</li>
        <li>The tagged PDF is English. Amharic is in the HTML text version.</li>
        <li>eSpeak is the offline voice. It is intelligible and clearly a device voice.</li>
      </ul>
    </div>
  );
}

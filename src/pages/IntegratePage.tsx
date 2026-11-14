import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";

const htmlSnippet = `<script src="https://your-host/learnable.js" defer></script>
<learnable-player
  src="/media/lesson-en.mp4"
  captions-en="/media/captions-en.vtt"
  captions-am="/media/captions-am.vtt"
  sign="/media/esl-placeholder.mp4"
  describe="/media/descriptions.vtt"
  offline
  braille
  docs>
</learnable-player>
<script>
  LearnAble.init({
    lang: "am",
    features: { toolbar: true, signWindow: true, audioDescription: true, offlinePack: true, braille: true, taggedDocs: true }
  });
</script>`;

const reactSnippet = `import { useEffect, useRef } from "react";

export function LearnAblePlayer({ src, captionsEn, captionsAm }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    node.setAttribute("src", src);
    node.setAttribute("captions-en", captionsEn);
    node.setAttribute("captions-am", captionsAm);
    node.setAttribute("describe", "/media/descriptions.vtt");
  }, [src, captionsEn, captionsAm]);
  return <learnable-player ref={ref} />;
}`;

const wordpressSnippet = `function learnable_assets() {
  wp_enqueue_script("learnable", "https://your-host/learnable.js", array(), null, true);
}
add_action("wp_enqueue_scripts", "learnable_assets");

add_shortcode("learnable", function () {
  return '<learnable-player src="/media/lesson-en.mp4" captions-en="/media/captions-en.vtt" captions-am="/media/captions-am.vtt" describe="/media/descriptions.vtt"></learnable-player>';
});`;

const iframeSnippet = `<iframe title="LearnAble lesson" src="https://your-host/lesson/slow-connection" style="width:100%;height:40rem;border:0"></iframe>`;

export function IntegratePage() {
  const playerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = playerRef.current;
    if (!node) return;
    node.setAttribute("src", "/media/lesson-en.mp4");
    node.setAttribute("captions-en", "/media/captions-en.vtt");
    node.setAttribute("captions-am", "/media/captions-am.vtt");
    node.setAttribute("sign", "/media/esl-placeholder.mp4");
    node.setAttribute("describe", "/media/descriptions.vtt");
    node.setAttribute("offline", "");
    node.setAttribute("braille", "");
  }, []);

  return (
    <div className="page">
      <Breadcrumbs items={[{ to: "/", label: "LearnAble" }, { label: "Embed" }]} />
      <h1>Add LearnAble to a page you already have</h1>
      <p className="measure">
        One script on a Savanna page turns on enhance mode. The toolbar sits on that page, and a plain video in the lesson is upgraded in place. Captions, the sign window, the pack, braille, and the text file are built in the browser when no API is running.
      </p>
      <h2>Whole page</h2>
      <pre className="snippet">{`<script src="/learnable/learnable.js" defer data-learnable-enhance="true"></script>
<video controls playsinline src="/media/lesson-en.mp4"
  data-learnable-captions-en="/media/captions-en.vtt"
  data-learnable-captions-am="/media/captions-am.vtt"
  data-learnable-sign="/media/esl-placeholder.mp4"
  data-learnable-describe="/media/descriptions.vtt"></video>`}</pre>
      <h2>Install</h2>
      <ol>
        <li>Install Node.js 22 and Python 3.12. No API key is required.</li>
        <li>Clone the repo, check out this branch, then run npm install, npm test, npm run build, and npm run dev.</li>
        <li>Open the lesson at http://127.0.0.1:5173. Captions and the sign window are already on.</li>
        <li>For the transcript service, create a virtualenv, pip install -r server/requirements.txt, copy .env.example to .env, and run python server/app.py.</li>
        <li>Or run docker compose up --build. The site is on port 8080 and the API is on port 5050.</li>
      </ol>
      <h2>API</h2>
      <p className="measure">
        With the service running, open <a href="http://127.0.0.1:5050/api/docs">the API notes</a>. The machine-readable spec is server/openapi.yaml. Captions, translation, speech recognition, image description, the offline pack, braille, and certificate verification are listed there. Nothing is sent to Hasab or Hugging Face until the request includes the consent header.
      </p>
      <h2>If it does not start</h2>
      <ul>
        <li>Empty captions mean the caption file paths are wrong for the host page.</li>
        <li>A message that the service is offline means Flask is not running on port 5050.</li>
        <li>Leave HF_MT_MODEL empty. NLLB-200 is non-commercial and off unless you opt in.</li>
      </ul>
      <learnable-player ref={playerRef} />
      <h2>HTML</h2>
      <pre className="snippet">{htmlSnippet}</pre>
      <h2>React</h2>
      <pre className="snippet">{reactSnippet}</pre>
      <h2>WordPress</h2>
      <pre className="snippet">{wordpressSnippet}</pre>
      <h2>iframe, if a script tag is not allowed</h2>
      <pre className="snippet">{iframeSnippet}</pre>
      <p className="next">
        <Link to="/demo">See Savanna before and with the script</Link>
      </p>
    </div>
  );
}

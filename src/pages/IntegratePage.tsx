import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";

const htmlSnippet = `<script src="https://your-host/learnable.js" defer data-learnable-voice="on"></script>
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
    voice: "on",
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

function bookmarklet(src: string): string {
  const code = `(function(){if(window.LearnAble)return;var s=document.createElement("script");s.src=${JSON.stringify(src)};s.defer=true;document.documentElement.appendChild(s);})();`;
  return `javascript:${encodeURIComponent(code)}`;
}

export function IntegratePage() {
  const playerRef = useRef<HTMLElement>(null);
  const [scriptUrl, setScriptUrl] = useState("https://your-host/learnable/learnable.js");

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
      <pre className="snippet">{`<script src="/learnable/learnable.js" defer data-learnable-enhance="true" data-learnable-voice="on"></script>
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
      <h2>Keyboard</h2>
      <p className="measure">
        These keys are on for the whole page. Single letters do nothing while a text field, list, or editable region is focused. The Keyboard shortcuts button turns them off. Question mark opens the same list, and the fields in that dialog change the letters. NVDA and JAWS browse mode take H and L before the page sees them.
      </p>
      <ul>
        <li>Tab and Shift+Tab move in page order. A skip link is first.</li>
        <li>H and Shift+H move between headings. L and Shift+L move between landmarks.</li>
        <li>Question mark opens keyboard help. Escape closes that dialog and returns focus. Escape also closes an open Savanna panel.</li>
        <li>Alt+Shift+S toggles LearnAble voice. The LearnAble voice button does the same. It is not an NVDA, JAWS, Orca, VoiceOver, or Chrome shortcut. The button is the alternative when a Mac layout would type a character instead.</li>
        <li>Picture frame, while it is focused: Space or K play, C captions, D audio description, S sign panel, arrows seek, J and L move further. L is a landmark key only outside the picture frame.</li>
        <li>Sign panel grip, while it is focused: arrows change the width, Home and End jump to the ends.</li>
      </ul>
      <h2>Voice</h2>
      <p className="measure">
        Spoken navigation starts on, unless the script says data-learnable-voice="off" or LearnAble.init is called with voice: "off". A saved choice in this browser wins over that default. The first visit asks whether to keep the voice or turn it off for a screen reader. Some browsers speak only after that click or the next key. Audio description starts on with the voice, has its own button, and pauses the video when a description is longer than the gap. See docs/VOICE.md.
      </p>
      <h2>Any page</h2>
      <p className="measure">
        Savanna is the test bed. The same script looks for a header, a navigation region, a main area, and a footer on any site, adds a skip link when the page has none, and repairs empty names, lists, and weak contrast one element at a time. Site-only behaviour, such as the Savanna menu button, lives in an optional profile and runs only on that site. LearnAble.clearRepairs() removes the attributes this script added.
      </p>
      <h2>Bookmarklet</h2>
      <p className="measure">
        Drag this link to the bookmark bar. It injects the script from the address below. A strict content-security policy can block that injection. The extension does not, because the script is inside the package.
      </p>
      <label>
        Script address
        <input value={scriptUrl} onChange={(event) => setScriptUrl(event.target.value)} />
      </label>
      <p>
        <a ref={(node) => node?.setAttribute("href", bookmarklet(scriptUrl))}>LearnAble</a>
      </p>
      <h2>Extension</h2>
      <p className="measure">
        The folder extension/ is a Manifest V3 package. It asks only for the active tab and scripting. It injects the packaged learnable.js when you click the icon. It does not ask for every website, and it does not load code from the network. In Chrome or Edge, open Extensions, turn on developer mode, choose Load unpacked, and select that folder. Build the project first so extension/learnable.js is present.
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

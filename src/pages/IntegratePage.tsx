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
        One script defines the elements. The toolbar floats on the host page. The player stays inside its shadow tree, so the host stylesheet does not restyle it.
      </p>
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

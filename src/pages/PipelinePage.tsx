import { useEffect, useState } from "react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { demoLesson } from "../content/lesson";
import { getHealth, translateText, type PipelineHealth, type TranslateResult } from "../lib/api";
import { speak } from "../lib/speech";

export function PipelinePage() {
  const [health, setHealth] = useState<PipelineHealth | null | undefined>(undefined);
  const [source, setSource] = useState<"en" | "am">("en");
  const [text, setText] = useState(demoLesson.segments[0].en);
  const [result, setResult] = useState<TranslateResult | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void getHealth().then(setHealth);
  }, []);

  async function onTranslate(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    const target = source === "en" ? "am" : "en";
    const next = await translateText(text, source, target);
    setResult(
      next ?? {
        source: "unavailable",
        translation: null,
        message: "The transcript service is not running. The lesson page still has the sample captions.",
      },
    );
    setBusy(false);
  }

  const target = source === "en" ? "am" : "en";

  return (
    <div className="page">
      <Breadcrumbs items={[{ to: "/", label: "LearnAble" }, { label: "Pipeline" }]} />
      <h1>Transcript pipeline</h1>
      <p className="measure">
        When a key is set, this service can call Hasab or Hugging Face. With no key, a known lesson sentence returns
        its paired caption and is marked as a sample. Other sentences are left untranslated rather than invented.
      </p>
      <p className={health === null ? "notice notice-error" : "notice notice-wait"} role="status">
        {health === undefined
          ? "Looking for the transcript service…"
          : health === null
            ? "The transcript service is offline. Sample captions in the lesson still work."
            : `Service online. Hasab ${health.hasab ? "key present" : "not configured"}. Hugging Face ${health.huggingface ? "token present" : "not configured"}.`}
      </p>
      {health ? (
        <ul>
          <li>Speech model: {health.asrModel}</li>
          <li>Translation model: {health.mtModel}</li>
          <li>Image model: {health.captionModel}</li>
        </ul>
      ) : null}
      <form className="stack" onSubmit={(event) => void onTranslate(event)}>
        <label>
          From
          <select name="source" autoComplete="off" value={source} onChange={(event) => setSource(event.target.value === "am" ? "am" : "en")}>
            <option value="en">English</option>
            <option value="am">Amharic</option>
          </select>
        </label>
        <label>
          Text
          <textarea name="text" autoComplete="off" spellCheck value={text} onChange={(event) => setText(event.target.value)} rows={4} />
        </label>
        <button type="submit" disabled={busy}>
          {busy ? "Translating…" : `Translate to ${target === "am" ? "Amharic" : "English"}`}
        </button>
      </form>
      {result ? (
        <div className={result.source === "unavailable" ? "notice notice-error" : "notice"} role="status">
          <p>Source: {result.source}</p>
          <p>{result.message}</p>
          {result.translation ? (
            <>
              <p lang={target}>{result.translation}</p>
              <button type="button" onClick={() => speak(result.translation ?? "", target === "am" ? "am-ET" : "en")}>
                Speak with this device
              </button>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

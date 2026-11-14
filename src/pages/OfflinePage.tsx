import { useState } from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { demoLesson, transcript } from "../content/lesson";
import { buildOfflinePack, saveFile } from "../lib/pack";

export function OfflinePage() {
  const [message, setMessage] = useState("The pack is text, two sound files, captions, and a picture description.");
  const [busy, setBusy] = useState(false);

  async function downloadZip() {
    setBusy(true);
      setMessage("Preparing the pack…");
    try {
      const zip = await buildOfflinePack(transcript("en"), transcript("am"));
      saveFile(zip, "learnable-3g-pack.zip", "application/zip");
      setMessage("Pack downloaded. Unzip it and open index.html. It does not need this site, or a network.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "The pack could not be built.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="page">
      <Breadcrumbs items={[{ to: "/", label: "LearnAble" }, { label: "Pack" }]} />
      <h1>A pack for a 3G phone</h1>
      <p className="measure">
        The video stays on this site. The pack keeps the lesson as sound, captions, braille, and one light page. Open
        the page from the phone’s files when the signal drops.
      </p>
      <p className={busy ? "notice notice-wait" : "notice"} role="status">{message}</p>
      <div className="actions">
        <button type="button" onClick={() => void downloadZip()} disabled={busy}>
          {busy ? "Preparing…" : "Download the pack"}
        </button>
        <a href="/packs/demo/index.html">Open the light page</a>
        <a href={demoLesson.audio.en}>English sound</a>
        <a href={demoLesson.audio.am}>Amharic sound</a>
      </div>
      <h2>What is inside</h2>
      <ul>
        <li>index.html, a page that works without the app</li>
        <li>English and Amharic narration</li>
        <li>Caption and audio-description files</li>
        <li>The picture, with a description</li>
        <li>Braille files added when you download the zip</li>
      </ul>
      <p>
        After you have visited this site once on a network, the service worker keeps the app shell for the next visit.{" "}
        <Link to={`/lesson/${demoLesson.id}`}>Return to the lesson</Link>
      </p>
    </div>
  );
}

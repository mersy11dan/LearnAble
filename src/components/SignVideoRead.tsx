import { useState, type FormEvent } from "react";
import { signVideo } from "../lib/api";

const HONEST = "Computer-generated. ASL, not Ethiopian Sign Language.";
const UNAVAILABLE = "Video-to-text is unavailable. No sign-recognition model is installed, and none is downloaded.";

export function SignVideoRead() {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = event.currentTarget.elements.namedItem("video");
    const file = input instanceof HTMLInputElement ? input.files?.[0] : undefined;
    if (!file) {
      setMessage("Choose a short sign video. No model was downloaded.");
      return;
    }
    setBusy(true);
    const result = await signVideo(file);
    setMessage(result?.message || UNAVAILABLE);
    setBusy(false);
  }

  return (
    <form className="measure" onSubmit={onSubmit} aria-labelledby="sign-video-title">
      <h2 id="sign-video-title">Read a sign video</h2>
      <p>{HONEST} Nothing is downloaded until you choose a video, and no recognition model ships with LearnAble.</p>
      <p>
        <label htmlFor="sign-video">Sign video, up to 1.5 MB</label>
      </p>
      <p>
        <input id="sign-video" name="video" type="file" accept="video/mp4,video/webm" />
      </p>
      <p>
        <button type="submit" disabled={busy}>
          {busy ? "Reading the sign video" : "Read this sign video"}
        </button>
      </p>
      <p role="status">{message}</p>
    </form>
  );
}

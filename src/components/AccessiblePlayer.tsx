import { useEffect, useId, useRef, useState } from "react";
import { usePreferences } from "../a11y/preferences";
import type { LessonSegment } from "../content/lesson";
import { commandForKey, type PlayerCommand } from "../lib/commands";
import { speak, stopSpeaking } from "../lib/speech";
import { formatTime } from "../lib/time";
import { cueAt } from "../lib/vtt";
import { SignWindow } from "./SignWindow";

type CaptionMode = "off" | "en" | "am";
type Narration = "en" | "am";
type Engine = "video" | "clock";

const PRESETS = {
  white: { label: "White on black", fg: "#ffffff", bg: "#000000" },
  yellow: { label: "Yellow on black", fg: "#ffee00", bg: "#000000" },
  black: { label: "Black on white", fg: "#000000", bg: "#ffffff" },
  cyan: { label: "Cyan on black", fg: "#00ffff", bg: "#000000" },
} as const;

type PresetName = keyof typeof PRESETS;

type AccessiblePlayerProps = {
  title: string;
  video: { en: string; am: string; poster: string };
  segments: LessonSegment[];
  tracks: { en: string; am: string; descriptions: string };
  signVideo: string;
  signPoster: string;
  engine?: Engine;
  onTime?: (time: number) => void;
};

const NEXT_CAPTION: Record<CaptionMode, CaptionMode> = { off: "en", en: "am", am: "off" };

export function AccessiblePlayer({
  title,
  video,
  segments,
  tracks,
  signVideo,
  signPoster,
  engine: engineProp = "video",
  onTime,
}: AccessiblePlayerProps) {
  const { highContrast, stopMotion } = usePreferences();
  const videoRef = useRef<HTMLVideoElement>(null);
  const helpRef = useRef<HTMLDialogElement>(null);
  const pendingSeek = useRef<number | null>(null);
  const timeRef = useRef(0);
  const lastAd = useRef("");
  const [clockEpoch, setClockEpoch] = useState(0);
  const captionGroup = useId();
  const [engine, setEngine] = useState<Engine>(engineProp);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(segments.at(-1)?.end ?? 0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [captions, setCaptions] = useState<CaptionMode>("en");
  const [captionScale, setCaptionScale] = useState(1.15);
  const [preset, setPreset] = useState<PresetName | null>(null);
  const [adOn, setAdOn] = useState(false);
  const [signOn, setSignOn] = useState(true);
  const [narration, setNarration] = useState<Narration>("en");
  const [status, setStatus] = useState("Paused. English captions on.");

  const resolvedPreset = preset ?? (highContrast ? "yellow" : "white");
  const colors = PRESETS[resolvedPreset];
  const current = cueAt(segments, time);
  const captionText = captions === "off" ? "" : captions === "en" ? current?.en : current?.am;

  useEffect(() => {
    onTime?.(time);
  }, [onTime, time]);

  useEffect(() => {
    if (engine !== "clock" || !playing) return;
    const startedAt = performance.now();
    const startedTime = timeRef.current;
    let frame = 0;
    const tick = (now: number) => {
      const next = Math.min(duration, startedTime + (now - startedAt) / 1000);
      timeRef.current = next;
      setTime(next);
      if (next >= duration) {
        setPlaying(false);
        setStatus("Ended.");
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [clockEpoch, duration, engine, playing]);

  useEffect(() => {
    if (!adOn) {
      stopSpeaking();
      lastAd.current = "";
      return;
    }
    if (current && current.ad !== lastAd.current) {
      lastAd.current = current.ad;
      speak(current.ad, "en", stopMotion ? 1 : 1);
    }
  }, [adOn, current, stopMotion]);

  function announce(message: string) {
    setStatus(message);
  }

  function seek(next: number) {
    const bounded = Math.min(duration, Math.max(0, next));
    timeRef.current = bounded;
    setTime(bounded);
    const media = videoRef.current;
    if (engine === "video" && media) media.currentTime = bounded;
    if (engine === "clock" && playing) setClockEpoch((value) => value + 1);
  }

  async function togglePlay() {
    if (engine === "clock") {
      setPlaying((value) => {
        announce(value ? "Paused." : "Playing.");
        return !value;
      });
      return;
    }
    const media = videoRef.current;
    if (!media) return;
    try {
      if (media.paused) {
        await media.play();
        announce("Playing.");
      } else {
        media.pause();
        announce("Paused.");
      }
    } catch {
      setEngine("clock");
      setPlaying(true);
      announce("The video file did not play. Captions are running on a timer.");
    }
  }

  function apply(command: PlayerCommand) {
    if (command.type === "toggle-play") void togglePlay();
    if (command.type === "cycle-captions") {
      const next = NEXT_CAPTION[captions];
      setCaptions(next);
      announce(next === "off" ? "Captions off." : next === "en" ? "English captions." : "Amharic captions.");
    }
    if (command.type === "toggle-ad") {
      setAdOn((value) => {
        announce(value ? "Audio description off." : "Audio description on.");
        return !value;
      });
    }
    if (command.type === "toggle-sign") {
      setSignOn((value) => {
        announce(value ? "Sign window closed." : "Sign window open.");
        return !value;
      });
    }
    if (command.type === "seek") seek(time + command.by);
    if (command.type === "seek-to") seek(command.to === "start" ? 0 : duration);
    if (command.type === "volume") {
      const next = Math.min(1, Math.max(0, volume + command.by));
      setVolume(next);
      if (videoRef.current) videoRef.current.volume = next;
      announce(`Volume ${Math.round(next * 100)} percent.`);
    }
    if (command.type === "mute") {
      setMuted((value) => {
        if (videoRef.current) videoRef.current.muted = !value;
        announce(value ? "Sound on." : "Sound off.");
        return !value;
      });
    }
    if (command.type === "fullscreen") {
      const stage = videoRef.current?.parentElement;
      if (!stage) return;
      if (document.fullscreenElement) void document.exitFullscreen();
      else void stage.requestFullscreen().catch(() => announce("Full screen is not available."));
    }
    if (command.type === "help") helpRef.current?.showModal();
  }

  function onStageKeyDown(event: React.KeyboardEvent) {
    const command = commandForKey(event);
    if (!command) return;
    event.preventDefault();
    apply(command);
  }

  function chooseNarration(next: Narration) {
    if (next === narration) return;
    pendingSeek.current = time;
    setNarration(next);
    const media = videoRef.current;
    if (engine === "video" && media) {
      media.src = video[next];
      media.load();
    }
    announce(next === "en" ? "English narration." : "Amharic narration.");
  }

  return (
    <section className="player" id="player" aria-label={title}>
      <div
        className="stage"
        role="region"
        tabIndex={0}
        onKeyDown={onStageKeyDown}
        aria-label="Lesson picture. Press question mark for keyboard shortcuts."
      >
        <video
          ref={videoRef}
          src={engine === "video" ? video[narration] : undefined}
          poster={video.poster}
          preload="metadata"
          playsInline
          onTimeUpdate={(event) => {
            if (engine === "video") {
              timeRef.current = event.currentTarget.currentTime;
              setTime(event.currentTarget.currentTime);
            }
          }}
          onLoadedMetadata={(event) => {
            const media = event.currentTarget;
            setDuration(Number.isFinite(media.duration) ? media.duration : duration);
            media.volume = volume;
            media.muted = muted;
            if (pendingSeek.current != null) {
              media.currentTime = pendingSeek.current;
              pendingSeek.current = null;
            }
          }}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => {
            setPlaying(false);
            announce("Ended.");
          }}
          onError={() => {
            if (engine === "video") {
              setEngine("clock");
              announce("The video file did not load. Captions are running on a timer.");
            }
          }}
        >
          <track kind="captions" srcLang="en" label="English" src={tracks.en} />
          <track kind="captions" srcLang="am" label="Amharic" src={tracks.am} />
          <track kind="descriptions" srcLang="en" label="Audio description" src={tracks.descriptions} />
        </video>
        {captionText ? (
          <p
            className="caption-line"
            aria-hidden="true"
            lang={captions === "am" ? "am" : "en"}
            style={{ color: colors.fg, background: colors.bg, fontSize: `${captionScale}rem` }}
          >
            {captionText}
          </p>
        ) : null}
      </div>
      <p className="status" aria-live="polite">
        {status} {formatTime(time)} of {formatTime(duration)}.
      </p>
      {engine === "clock" ? (
        <p className="note">The picture file is not playing. Caption timing is still running, and the transcript below is complete.</p>
      ) : null}

      <div className="controls">
        <button type="button" onClick={() => void togglePlay()}>
          {playing ? "Pause" : "Play"}
        </button>
        <label className="grow">
          Position
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={Math.min(time, duration || 0)}
            aria-valuetext={`${formatTime(time)} of ${formatTime(duration)}`}
            onChange={(event) => seek(Number(event.target.value))}
          />
        </label>
        <label>
          Volume
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={muted ? 0 : volume}
            aria-valuetext={muted ? "Muted" : `${Math.round(volume * 100)} percent`}
            onChange={(event) => {
              const next = Number(event.target.value);
              setVolume(next);
              setMuted(next === 0);
              if (videoRef.current) {
                videoRef.current.volume = next;
                videoRef.current.muted = next === 0;
              }
            }}
          />
        </label>
        <button type="button" aria-pressed={muted} onClick={() => apply({ type: "mute" })}>
          {muted ? "Unmute" : "Mute"}
        </button>
        <button type="button" onClick={() => apply({ type: "fullscreen" })}>
          Full screen
        </button>
        <button type="button" onClick={() => helpRef.current?.showModal()}>
          Keyboard shortcuts
        </button>
      </div>

      <div className="choice-row">
        <fieldset>
          <legend>Narration</legend>
          <label>
            <input
              type="radio"
              name="narration"
              checked={narration === "en"}
              onChange={() => chooseNarration("en")}
            />
            English device voice
          </label>
          <label>
            <input
              type="radio"
              name="narration"
              checked={narration === "am"}
              onChange={() => chooseNarration("am")}
            />
            <span lang="am">የአማርኛ ድምጽ</span>
          </label>
        </fieldset>
        <fieldset>
          <legend id={captionGroup}>Captions</legend>
          {(["off", "en", "am"] as const).map((mode) => (
            <label key={mode}>
              <input
                type="radio"
                name="captions"
                checked={captions === mode}
                onChange={() => {
                  setCaptions(mode);
                  announce(mode === "off" ? "Captions off." : mode === "en" ? "English captions." : "Amharic captions.");
                }}
              />
              {mode === "off" ? "Off" : mode === "en" ? "English" : "አማርኛ"}
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend>Caption size</legend>
          <label>
            Scale
            <input
              type="range"
              min={1}
              max={2.4}
              step={0.1}
              value={captionScale}
              aria-valuetext={`${Math.round(captionScale * 100)} percent`}
              onChange={(event) => setCaptionScale(Number(event.target.value))}
            />
          </label>
        </fieldset>
        <fieldset>
          <legend>Caption colours</legend>
          {(Object.keys(PRESETS) as PresetName[]).map((name) => (
            <label key={name}>
              <input
                type="radio"
                name="caption-colour"
                checked={resolvedPreset === name}
                onChange={() => setPreset(name)}
              />
              {PRESETS[name].label}
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend>More access</legend>
          <button type="button" aria-pressed={adOn} onClick={() => apply({ type: "toggle-ad" })}>
            {adOn ? "Audio description on" : "Audio description off"}
          </button>
          <button type="button" aria-pressed={signOn} onClick={() => apply({ type: "toggle-sign" })}>
            {signOn ? "Sign window open" : "Sign window closed"}
          </button>
        </fieldset>
      </div>

      <div className="transcript-layout">
        <div>
          <h2>Transcript</h2>
          <ol className="transcript">
            {segments.map((segment) => {
              const active = current === segment;
              return (
                <li key={segment.start} aria-current={active ? "true" : undefined}>
                  <button type="button" onClick={() => seek(segment.start)}>
                    <span className="stamp">{formatTime(segment.start)}</span>
                    <span lang="en">{segment.en}</span>
                  </button>
                  <p lang="am">{segment.am}</p>
                </li>
              );
            })}
          </ol>
        </div>
        <div>
          <h2>Audio description</h2>
          <ol className="transcript">
            {segments.map((segment) => (
              <li key={`ad-${segment.start}`}>
                <button type="button" onClick={() => seek(segment.start)}>
                  <span className="stamp">{formatTime(segment.start)}</span>
                  {segment.ad}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {signOn ? (
        <SignWindow
          gloss={current?.gloss ?? "OPEN"}
          videoSrc={signVideo}
          poster={signPoster}
          onClose={() => setSignOn(false)}
        />
      ) : null}

      <dialog ref={helpRef} className="help" aria-labelledby="shortcut-title">
        <h2 id="shortcut-title">Keyboard shortcuts</h2>
        <p>Select the lesson picture first. These keys then work there. They do not run while you are on a button or a slider.</p>
        <ul>
          <li>Space or K, play or pause</li>
          <li>C, cycle captions off, English, Amharic</li>
          <li>D, audio description</li>
          <li>S, sign window</li>
          <li>Left and right, move 5 seconds. J and L move 10 seconds</li>
          <li>Up and down, volume. M, mute</li>
          <li>Home and End, start and end. F, full screen</li>
          <li>Question mark, this list</li>
        </ul>
        <form method="dialog">
          <button type="submit">Close shortcuts</button>
        </form>
      </dialog>
    </section>
  );
}

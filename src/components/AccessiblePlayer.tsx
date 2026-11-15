import { useEffect, useId, useRef, useState } from "react";
import { usePreferences } from "../a11y/preferences";
import type { LessonSegment } from "../content/lesson";
import { commandForKey, type PlayerCommand } from "../lib/commands";
import { cueToDeliver, needsExtendedDescription, scheduleDescriptions, spokenSeconds } from "../lib/describe";
import { speak, stopSpeaking } from "../lib/speech";
import { formatTime } from "../lib/time";
import { cueAt, parseVtt, type Cue } from "../lib/vtt";
import { signPanel } from "../embed/signs";
import { SignWindow } from "./SignWindow";

type CaptionMode = "off" | "en" | "am";
type Narration = "en" | "am";
type Engine = "video" | "clock";
type AdMode = "off" | "spoken" | "text";

const AD_KEY = "learnable-ad-mode";

function storedAdMode(): AdMode {
  try {
    const value = localStorage.getItem(AD_KEY);
    if (value === "spoken" || value === "text" || value === "off") return value;
  } catch {
    /* Storage can be blocked. The choice still works for this visit. */
  }
  return "off";
}

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
  tracks: { en: string; am: string; descriptions: string; descriptionsAm?: string };
  signVideo: string;
  signPoster: string;
  signLang?: string;
  signOffset?: number;
  engine?: Engine;
  onTime?: (time: number) => void;
  onComplete?: () => void;
};

const NEXT_CAPTION: Record<CaptionMode, CaptionMode> = { off: "en", en: "am", am: "off" };

export function AccessiblePlayer({
  title,
  video,
  segments,
  tracks,
  signVideo,
  signPoster,
  signLang = "",
  signOffset = 0,
  engine: engineProp = "video",
  onTime,
  onComplete,
}: AccessiblePlayerProps) {
  const { highContrast, stopMotion } = usePreferences();
  const videoRef = useRef<HTMLVideoElement>(null);
  const helpRef = useRef<HTMLDialogElement>(null);
  const pendingSeek = useRef<number | null>(null);
  const timeRef = useRef(0);
  const completed = useRef(false);
  const heldForAd = useRef(false);
  const adLock = useRef<{ text: string; start: number; holdUntil: number } | null>(null);
  const textTimer = useRef(0);
  const seenAdMode = useRef<AdMode>(storedAdMode());
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
  const [adMode, setAdMode] = useState<AdMode>(storedAdMode);
  const [adText, setAdText] = useState("");
  const [adCues, setAdCues] = useState<Cue[]>([]);
  const [adAm, setAdAm] = useState<Cue[]>([]);
  const [signOn, setSignOn] = useState(true);
  const [narration, setNarration] = useState<Narration>("en");
  const [status, setStatus] = useState("Paused.");

  const resolvedPreset = preset ?? (highContrast ? "yellow" : "white");
  const colors = PRESETS[resolvedPreset];
  const current = cueAt(segments, time);
  const captionText = captions === "off" ? "" : captions === "en" ? current?.en : current?.am;

  useEffect(() => {
    onTime?.(time);
  }, [onTime, time]);

  useEffect(() => {
    if (completed.current || duration <= 1 || time < duration - 0.25) return;
    completed.current = true;
    onComplete?.();
  }, [duration, onComplete, time]);

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
    try {
      localStorage.setItem(AD_KEY, adMode);
    } catch {
      /* The choice still applies for this visit. */
    }
  }, [adMode]);

  useEffect(() => {
    let cancelled = false;
    async function load(url: string | undefined, apply: (cues: Cue[]) => void) {
      if (!url) return;
      try {
        const { safeFetch } = await import("../lib/guard");
        const response = await safeFetch(url);
        if (!response.ok) return;
        const cues = parseVtt(await response.text());
        if (!cancelled) apply(cues);
      } catch {
        /* Segment text stays available when the description file cannot be fetched. */
      }
    }
    void load(tracks.descriptions, setAdCues);
    void load(tracks.descriptionsAm, setAdAm);
    return () => {
      cancelled = true;
    };
  }, [tracks.descriptions, tracks.descriptionsAm]);

  useEffect(() => {
    if (seenAdMode.current !== adMode) {
      seenAdMode.current = adMode;
      adLock.current = null;
      stopSpeaking();
      setAdText("");
      window.clearTimeout(textTimer.current);
    }
    if (adMode === "off") return;
    if (!playing && !heldForAd.current) return;
    const amharic = narration === "am" && adAm.length > 0;
    const source = amharic
      ? adAm
      : adCues.length
        ? adCues
        : segments.map((segment) => ({ start: segment.start, end: segment.end, text: segment.ad }));
    const planned = scheduleDescriptions(source, 1);
    const cue = cueToDeliver(planned, time, adLock.current);
    if (!cue) return;
    adLock.current = { text: cue.text, start: cue.start, holdUntil: cue.holdUntil };
    const extended = needsExtendedDescription(cue.text, Math.max(0, cue.end - cue.start), 1);
    const release = () => {
      if (!heldForAd.current) return;
      heldForAd.current = false;
      if (engine === "clock") setPlaying(true);
      else void videoRef.current?.play().catch(() => undefined);
    };
    if (extended && playing) {
      heldForAd.current = true;
      if (engine === "video") videoRef.current?.pause();
      else setPlaying(false);
    }
    if (adMode === "text") {
      stopSpeaking();
      setAdText(cue.text);
      if (extended) {
        window.clearTimeout(textTimer.current);
        textTimer.current = window.setTimeout(release, spokenSeconds(cue.text, 1) * 1000);
      }
      return;
    }
    setAdText("");
    speak(cue.text, amharic ? "am" : "en", stopMotion ? 1 : 1, { onend: release, oncancel: release });
  }, [adAm, adCues, adMode, engine, narration, playing, segments, stopMotion, time]);

  function announce(message: string) {
    setStatus(message);
  }

  function seek(next: number) {
    adLock.current = null;
    heldForAd.current = false;
    window.clearTimeout(textTimer.current);
    stopSpeaking();
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
      announce(next === "off" ? "Captions off." : next === "en" ? "English captions on." : "Amharic captions on.");
    }
    if (command.type === "toggle-ad") {
      const next: AdMode = adMode === "off" ? "spoken" : adMode === "spoken" ? "text" : "off";
      setAdMode(next);
      announce(next === "off" ? "Audio description off." : next === "text" ? "Audio description as text." : "Audio description on.");
    }
    if (command.type === "toggle-sign") {
      setSignOn((value) => {
        announce(value ? "Sign window closed." : "Sign window opened.");
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
          {tracks.descriptionsAm ? <track kind="descriptions" srcLang="am" label="Amharic audio description" src={tracks.descriptionsAm} /> : null}
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
        {status}
      </p>
      <p className="ad-live" aria-live="polite" lang={narration === "am" ? "am" : "en"}>
        {adMode === "text" ? adText : ""}
      </p>
      {engine === "clock" ? (
        <p className="note">The picture file is not playing. Caption timing is still running, and the transcript below is complete.</p>
      ) : null}

      <div className="controls">
        <button type="button" onClick={() => void togglePlay()}>
          {playing ? "Pause" : "Play"}
        </button>
        <div className="slider-group">
          <label className="grow">
            <span className="sr-only">Position</span>
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
          <span className="time-display">
            {formatTime(time)} of {formatTime(duration)}
          </span>
        </div>
        <div className="volume-group">
          <label>
            <span className="sr-only">Volume</span>
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
        </div>
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
                  announce(mode === "off" ? "Captions off." : mode === "en" ? "English captions on." : "Amharic captions on.");
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
          <legend>Audio description</legend>
          {(
            [
              ["off", "Off"],
              ["spoken", "Spoken"],
              ["text", "Text for my screen reader"],
            ] as const
          ).map(([value, label]) => (
            <label key={value}>
              <input
                type="radio"
                name="audio-description"
                checked={adMode === value}
                onChange={() => {
                  setAdMode(value);
                  announce(value === "off" ? "Audio description off." : value === "text" ? "Audio description as text." : "Audio description on.");
                }}
              />
              {label}
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend>More access</legend>
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
            {(adCues.length ? adCues : segments.map((segment) => ({ start: segment.start, end: segment.end, text: segment.ad }))).map((cue, index) => (
              <li key={`ad-${cue.start}`}>
                <button type="button" onClick={() => seek(cue.start)}>
                  <span className="stamp">{formatTime(cue.start)}</span>
                  {cue.text}
                </button>
                {adAm[index] ? <p lang="am">{adAm[index].text}</p> : null}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {signOn ? (
        <SignWindow
          {...signPanel(captions === "en" ? current?.en ?? "" : "", captions === "am" ? "am" : captions === "en" ? "en" : "off")}
          videoSrc={signVideo}
          poster={signPoster}
          signLang={signLang}
          signOffset={signOffset}
          mainRef={engine === "video" ? videoRef : undefined}
          playing={playing}
          mainTime={time}
          onClose={() => setSignOn(false)}
        />
      ) : null}

      <dialog ref={helpRef} className="help" aria-labelledby="shortcut-title">
        <h2 id="shortcut-title">Keyboard shortcuts</h2>
        <p>Select the lesson picture first. These keys then work there. They do not run while you are on a button or a slider.</p>
        <ul>
          <li>Space or K, play or pause</li>
          <li>C, cycle captions off, English, Amharic</li>
          <li>D, audio description: off, spoken, or text</li>
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

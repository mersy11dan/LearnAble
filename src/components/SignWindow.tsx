import { useEffect, useId, useRef, useState, type RefObject } from "react";
import { visualsFor } from "../embed/signs";
import {
  DEFAULT_FRAME,
  NUDGE_PX,
  NUDGE_SHIFT_PX,
  REACT_SIGN_FRAME_KEY,
  RESIZE_STEP_PX,
  boundsFromRect,
  clampFrame,
  mediaMatches,
  movedAnnouncement,
  nudgeFrame,
  readStoredFrame,
  resizeFrame,
  writeStoredFrame,
  type Bounds,
  type Frame,
} from "../lib/signFrame";
import { presentSign, type SignLoad } from "../lib/signLabel";
import { attachSignSync, signTargetTime } from "../lib/signSync";

type SignWindowProps = {
  gloss: string;
  model: string;
  note: string;
  spell: string;
  videoSrc: string;
  poster: string;
  signLang?: string;
  signOffset?: number;
  mainRef?: RefObject<HTMLMediaElement | null>;
  playing?: boolean;
  mainTime?: number;
  onClose: () => void;
};

function currentBounds(): Bounds {
  const player = document.getElementById("player");
  return boundsFromRect(player?.getBoundingClientRect() ?? null, {
    width: window.innerWidth || 0,
    height: window.innerHeight || 0,
  });
}

export function SignWindow({
  gloss,
  model,
  note,
  spell,
  videoSrc,
  poster,
  signLang = "",
  signOffset = 0,
  mainRef,
  playing = false,
  mainTime = 0,
  onClose,
}: SignWindowProps) {
  const headingId = useId();
  const signRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<Frame>(DEFAULT_FRAME);
  const [frame, setFrame] = useState<Frame>(DEFAULT_FRAME);
  const [moving, setMoving] = useState(false);
  const [moved, setMoved] = useState("");
  const [load, setLoad] = useState<SignLoad>("idle");
  const [stacked, setStacked] = useState(false);
  const moveTimer = useRef<number | undefined>(undefined);
  const presentation = presentSign({ src: videoSrc, signLang, load });

  function commit(next: Frame, announce = false) {
    const clamped = clampFrame(next, currentBounds());
    frameRef.current = clamped;
    setFrame(clamped);
    writeStoredFrame(safeStorage(), REACT_SIGN_FRAME_KEY, clamped);
    if (announce) setMoved(movedAnnouncement(clamped));
  }

  function rememberMove(next: Frame) {
    commit(next, false);
    window.clearTimeout(moveTimer.current);
    moveTimer.current = window.setTimeout(() => setMoved(movedAnnouncement(frameRef.current)), 800);
  }

  function exitMove() {
    window.clearTimeout(moveTimer.current);
    setMoving(false);
    setMoved(movedAnnouncement(frameRef.current));
  }

  useEffect(() => {
    const stored = readStoredFrame(safeStorage(), REACT_SIGN_FRAME_KEY);
    commit(stored ?? DEFAULT_FRAME);
    const onResize = () => {
      setStacked(mediaMatches("(max-width: 62rem)"));
      commit(frameRef.current);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(moveTimer.current);
    };
    // The stored frame is read once. Later moves go through commit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const view = presentSign({ src: videoSrc, signLang, load: "idle" });
    setLoad(view.showVideo ? "loading" : "idle");
  }, [signLang, videoSrc]);

  useEffect(() => {
    const main = mainRef?.current;
    const sign = signRef.current;
    if (!sign || !presentation.showVideo || !main) return;
    return attachSignSync(main, sign, () => (Number.isFinite(signOffset) ? signOffset : 0));
  }, [load, mainRef, presentation.showVideo, signOffset]);

  useEffect(() => {
    const sign = signRef.current;
    if (!sign || !presentation.showVideo || mainRef?.current) return;
    const target = signTargetTime(mainTime, signOffset);
    if (Math.abs(sign.currentTime - target) > 0.3) {
      try {
        sign.currentTime = target;
      } catch {
        /* Clock mode still shows captions if the sign file cannot seek. */
      }
    }
    if (playing) void sign.play().catch(() => undefined);
    else sign.pause();
  }, [mainRef, mainTime, playing, presentation.showVideo, signOffset]);

  function onMoveKey(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      if (moving) exitMove();
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (moving) exitMove();
      else setMoving(true);
      return;
    }
    if (!moving) return;
    const step = event.shiftKey ? NUDGE_SHIFT_PX : NUDGE_PX;
    let dx = 0;
    let dy = 0;
    if (event.key === "ArrowLeft") dx = -step;
    else if (event.key === "ArrowRight") dx = step;
    else if (event.key === "ArrowUp") dy = -step;
    else if (event.key === "ArrowDown") dy = step;
    else return;
    event.preventDefault();
    rememberMove(nudgeFrame(frameRef.current, dx, dy, currentBounds()));
  }

  function onDragStart(event: React.PointerEvent<HTMLElement>) {
    if (stacked || event.button !== 0) return;
    const startX = event.clientX;
    const startY = event.clientY;
    const origin = frameRef.current;
    event.currentTarget.setPointerCapture(event.pointerId);
    const onMove = (ev: PointerEvent) => {
      commit(nudgeFrame(origin, ev.clientX - startX, ev.clientY - startY, currentBounds()));
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      setMoved(movedAnnouncement(frameRef.current));
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

  function onResizeStart(event: React.PointerEvent<HTMLButtonElement>) {
    if (event.button !== 0) return;
    event.stopPropagation();
    const startX = event.clientX;
    const startY = event.clientY;
    const origin = frameRef.current;
    event.currentTarget.setPointerCapture(event.pointerId);
    const onMove = (ev: PointerEvent) => {
      commit(resizeFrame(origin, ev.clientX - startX, ev.clientY - startY, currentBounds()));
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

  const frames = visualsFor(gloss).slice(0, 24);

  return (
    <section
      className="sign-window"
      style={{ left: frame.x, top: frame.y, width: frame.width, height: frame.height }}
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className="sign-handle sign-drag-handle" onPointerDown={onDragStart}>
        {presentation.heading}
      </h2>
      <div className="sign-body">
        {presentation.missingNotice ? <p className="sign-missing">{presentation.missingNotice}</p> : null}
        {presentation.videoLabel ? <p className="sign-video-label">{presentation.videoLabel}</p> : null}
        {presentation.showVideo ? (
          <video
            ref={signRef}
            src={videoSrc}
            poster={poster || undefined}
            muted
            playsInline
            preload="metadata"
            aria-label={presentation.heading}
            onLoadedData={() => setLoad("ready")}
            onError={() => setLoad("error")}
          />
        ) : null}
        <p className="sign-slot-title">ASL fingerspelling fallback</p>
        <div className="hands">
          {frames.map((frameItem, index) =>
            frameItem.src ? (
              <img key={`${frameItem.alt}-${index}`} src={frameItem.src} alt={frameItem.alt} width={48} height={48} />
            ) : (
              <span key={`${frameItem.alt}-${index}`} role="img" aria-label={frameItem.alt}>
                {frameItem.caption}
              </span>
            ),
          )}
        </div>
        <dl className="gloss-lines">
          {gloss ? (
            <>
              <dt>{model ? "Corrected by hand" : "Offline fallback"}</dt>
              <dd className="gloss" lang="en">
                {gloss}
              </dd>
            </>
          ) : null}
          {model ? (
            <>
              <dt>Model output (Suyash2205/signbridge-t5-base-asl-gloss)</dt>
              <dd className="gloss" lang="en">
                {model}
              </dd>
            </>
          ) : null}
        </dl>
        {spell ? <p className="sign-note">{spell}</p> : null}
        <p className="sign-note">
          {note}
          {videoSrc ? (
            <>
              {" "}
              A recording can be added at <code>{videoSrc}</code>.
            </>
          ) : null}
        </p>
      </div>
      <p className="sign-moved" aria-live="polite">
        {moved}
      </p>
      <div className="sign-actions">
        {stacked ? null : (
          <span className="sign-move-controls">
            <button type="button" aria-pressed={moving} onClick={() => (moving ? exitMove() : setMoving(true))} onKeyDown={onMoveKey}>
              Move
            </button>
          </span>
        )}
        <button type="button" onClick={() => commit(resizeFrame(frameRef.current, -RESIZE_STEP_PX, -RESIZE_STEP_PX, currentBounds()))}>
          Smaller
        </button>
        <button type="button" onClick={() => commit(resizeFrame(frameRef.current, RESIZE_STEP_PX, RESIZE_STEP_PX, currentBounds()))}>
          Larger
        </button>
        <button type="button" onClick={() => commit(clampFrame(DEFAULT_FRAME, currentBounds()))}>
          Reset
        </button>
        <button type="button" className="sign-resize-grip" aria-label="Resize sign window" onPointerDown={onResizeStart}>
          Resize
        </button>
        <button type="button" onClick={onClose}>
          Close sign window
        </button>
      </div>
    </section>
  );
}

function safeStorage(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

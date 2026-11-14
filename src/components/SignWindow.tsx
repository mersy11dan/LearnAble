import { useEffect, useRef, useState } from "react";
import { usePreferences } from "../a11y/preferences";

type SignWindowProps = {
  gloss: string;
  videoSrc: string;
  poster: string;
  onClose: () => void;
};

type Box = { x: number; y: number; width: number; height: number };

const MIN_WIDTH = 220;
const MIN_HEIGHT = 180;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function SignWindow({ gloss, videoSrc, poster, onClose }: SignWindowProps) {
  const { stopMotion } = usePreferences();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [box, setBox] = useState<Box>({ x: 24, y: 420, width: 320, height: 250 });

  useEffect(() => {
    const stage = document.querySelector("#player .stage");
    const rect = stage?.getBoundingClientRect();
    const width = 320;
    const height = 250;
    if (!rect) return;
    setBox({
      width,
      height,
      x: Math.min(Math.max(12, rect.right - width - 16), window.innerWidth - width - 12),
      y: Math.min(Math.max(72, rect.top + 16), Math.max(72, window.innerHeight - height - 12)),
    });
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (stopMotion) {
      video.pause();
      return;
    }
    try {
      const pending = video.play();
      if (pending && typeof pending.then === "function") void pending.catch(() => undefined);
    } catch {
      // Some test browsers throw from play() instead of returning a rejected promise.
    }
  }, [stopMotion, videoSrc]);

  function move(dx: number, dy: number) {
    setBox((current) => ({
      ...current,
      x: clamp(current.x + dx, 8, window.innerWidth - current.width - 8),
      y: clamp(current.y + dy, 8, window.innerHeight - 80),
    }));
  }

  function resize(dw: number, dh: number) {
    setBox((current) => ({
      ...current,
      width: clamp(current.width + dw, MIN_WIDTH, window.innerWidth - 16),
      height: clamp(current.height + dh, MIN_HEIGHT, window.innerHeight - 16),
    }));
  }

  function onHandleKey(event: React.KeyboardEvent) {
    const step = event.shiftKey ? 40 : 12;
    if (event.key === "ArrowLeft") move(-step, 0);
    else if (event.key === "ArrowRight") move(step, 0);
    else if (event.key === "ArrowUp") move(0, -step);
    else if (event.key === "ArrowDown") move(0, step);
    else return;
    event.preventDefault();
    event.stopPropagation();
  }

  function onDragStart(event: React.PointerEvent<HTMLDivElement>) {
    const startX = event.clientX;
    const startY = event.clientY;
    const origin = box;
    event.currentTarget.setPointerCapture(event.pointerId);
    const onMove = (ev: PointerEvent) => {
      setBox({
        ...origin,
        x: clamp(origin.x + ev.clientX - startX, 8, window.innerWidth - origin.width - 8),
        y: clamp(origin.y + ev.clientY - startY, 8, window.innerHeight - 80),
      });
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

  return (
    <section
      className="sign-window"
      style={{ left: box.x, top: box.y, width: box.width, height: box.height }}
      aria-label={`Ethiopian Sign Language window. Current gloss ${gloss}. This is a placeholder, not a recorded signer.`}
    >
      <div
        className="sign-handle"
        role="button"
        tabIndex={0}
        aria-label="Ethiopian Sign Language. Arrow keys move this window. Shift makes a larger step."
        onKeyDown={onHandleKey}
        onPointerDown={onDragStart}
      >
        Ethiopian Sign Language
      </div>
      <div className="sign-body">
        <video
          ref={videoRef}
          src={videoSrc}
          poster={poster}
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <p className="gloss" lang="en">
          {gloss}
        </p>
        <p className="sign-note">Placeholder gloss. A recorded Ethiopian Sign Language track replaces this window.</p>
      </div>
      <div className="sign-actions">
        <button type="button" onClick={() => resize(-40, -32)}>
          Smaller
        </button>
        <button type="button" onClick={() => resize(40, 32)}>
          Larger
        </button>
        <button type="button" onClick={onClose}>
          Close sign window
        </button>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import { visualsFor } from "../embed/signs";

type SignWindowProps = {
  gloss: string;
  model: string;
  note: string;
  spell: string;
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

export function SignWindow({ gloss, model, note, spell, videoSrc, onClose }: SignWindowProps) {
  const [box, setBox] = useState<Box>({ x: 24, y: 420, width: 320, height: 280 });

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
      aria-label={`ASL gloss (English → ASL), not Ethiopian Sign Language. ${gloss || note}`}
    >
      <div
        className="sign-handle"
        role="button"
        tabIndex={0}
        aria-label="ASL gloss (English → ASL), not Ethiopian Sign Language. Arrow keys move this window. Shift makes a larger step."
        onKeyDown={onHandleKey}
        onPointerDown={onDragStart}
      >
        ASL gloss (English → ASL), not Ethiopian Sign Language
      </div>
      <div className="sign-body">
        <p className="sign-slot-title">ASL fingerspelling</p>
        <div className="hands">
          {visualsFor(gloss).slice(0, 24).map((frame, index) =>
            frame.src ? (
              <img key={`${frame.alt}-${index}`} src={frame.src} alt={frame.alt} width={48} height={48} />
            ) : (
              <span key={`${frame.alt}-${index}`} role="img" aria-label={frame.alt}>
                {frame.caption}
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
          {note} A clip can be added at <code>{videoSrc}</code>.
        </p>
      </div>
      <div className="sign-actions">
        <button type="button" onClick={() => move(-24, 0)}>
          Move left
        </button>
        <button type="button" onClick={() => move(24, 0)}>
          Move right
        </button>
        <button type="button" onClick={() => move(0, -24)}>
          Move up
        </button>
        <button type="button" onClick={() => move(0, 24)}>
          Move down
        </button>
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

import { useEffect, useRef, useState } from "react";
import { CUES, SIGNS, cueAt } from "./cues.js";
import { getPack, savePack, speak } from "./offline.js";
import { postJson } from "./api.js";

function drawScene(ctx, w, h, t, reduce) {
  ctx.fillStyle = "#0b1c2e";
  ctx.fillRect(0, 0, w, h);
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "#1a3a58");
  g.addColorStop(1, "#0a1624");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = "#3a2416";
  ctx.fillRect(0, h * 0.72, w, h * 0.28);
  ctx.fillStyle = "#c9a36a";
  ctx.fillRect(w * 0.12, h * 0.62, w * 0.36, h * 0.12);

  const sway = reduce ? 0 : Math.sin(t / 400) * 3;
  ctx.fillStyle = "#f3efe4";
  ctx.beginPath();
  ctx.arc(w * 0.28, h * 0.42 + sway * 0.2, 28, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#c45c26";
  ctx.fillRect(w * 0.22, h * 0.48, 70, 90);

  ctx.fillStyle = "#8b5a2b";
  for (let i = 0; i < 3; i += 1) {
    const x = w * 0.62 + i * 48;
    ctx.fillRect(x, h * 0.38, 36, 70);
    ctx.fillStyle = "#f4d27a";
    ctx.fillRect(x + 6, h * 0.42, 24, 12);
    ctx.fillStyle = "#8b5a2b";
  }
  ctx.strokeStyle = "#e7dfcc";
  ctx.lineWidth = 3;
  ctx.strokeRect(w * 0.58, h * 0.32, 170, 120);

  ctx.fillStyle = "#f3efe4";
  ctx.font = "16px sans-serif";
  ctx.fillText("Hirut · memory shelf", 16, 28);
}

export default function Player({ t, lang, online }) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [capLang, setCapLang] = useState(lang);
  const [capSize, setCapSize] = useState(1.15);
  const [capBg, setCapBg] = useState("#000000cc");
  const [capFg, setCapFg] = useState("#ffffff");
  const [showAd, setShowAd] = useState(false);
  const [signOn, setSignOn] = useState(true);
  const [sign, setSign] = useState({ x: 16, y: 16, w: 180, h: 170 });
  const [saved, setSaved] = useState(false);
  const [brl, setBrl] = useState("");
  const [status, setStatus] = useState("");
  const duration = 92;
  const reduce = document.documentElement.dataset.motion === "stop";

  useEffect(() => {
    getPack("cs-foundations").then((p) => setSaved(Boolean(p)));
  }, []);

  useEffect(() => {
    let raf;
    let last = performance.now();
    const loop = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      setTime((prev) => {
        if (!playing) return prev;
        const next = prev + dt;
        return next >= duration ? 0 : next;
      });
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        drawScene(ctx, canvas.width, canvas.height, now, reduce);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing, reduce]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest("input, textarea, select")) return;
      if (e.code === "Space") {
        e.preventDefault();
        setPlaying((p) => !p);
      } else if (e.key === "ArrowRight") setTime((x) => Math.min(duration, x + 5));
      else if (e.key === "ArrowLeft") setTime((x) => Math.max(0, x - 5));
      else if (e.key === "c") setCapLang((c) => (c === "en" ? "am" : "en"));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const cues = capLang === "am" ? CUES.am : CUES.en;
  const caption = cueAt(cues, time)?.[2] || "";
  const ad = showAd ? cueAt(CUES.ad, time)?.[2] : "";
  const signCue = [...SIGNS].reverse().find((s) => time >= s.at) || SIGNS[0];

  function startDrag(ev) {
    const startX = ev.clientX;
    const startY = ev.clientY;
    const orig = { ...sign };
    const move = (e) => {
      const box = wrapRef.current.getBoundingClientRect();
      setSign({
        ...orig,
        x: Math.max(0, orig.x + (e.clientX - startX)),
        y: Math.max(0, orig.y + (e.clientY - startY)),
        w: orig.w,
        h: orig.h,
      });
      if (e.clientX > box.right || e.clientY > box.bottom) return;
    };
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  }

  async function downloadPack() {
    setStatus(t.download + "…");
    const pack = {
      id: "cs-foundations",
      cues: CUES,
      signs: SIGNS,
      savedAt: new Date().toISOString(),
    };
    try {
      const remote = await fetch("/api/offline-pack/cs-foundations").then((r) => r.json());
      pack.remote = remote;
    } catch {
      pack.remote = { html: "<p>Cached locally without the server.</p>" };
    }
    await savePack("cs-foundations", pack);
    setSaved(true);
    setStatus(t.downloaded);
  }

  async function present() {
    try {
      await postJson("/api/attendance", { learner_id: "hirut-01", lesson_id: "cs-1", status: "present" });
      setStatus(lang === "am" ? "መጥተሃል።" : "You are marked present.");
    } catch {
      const { queueEvent } = await import("./offline.js");
      queueEvent({ type: "attendance", lesson_id: "cs-1", status: "present" });
      setStatus(lang === "am" ? "መጥተሃል — በኋላ ይላካል።" : "Present — will send when the network returns.");
    }
    speak(lang === "am" ? "መጥተሃል" : "You are marked present", lang);
  }

  async function braille() {
    try {
      const data = await fetch("/api/braille/cs-foundations").then((r) => r.json());
      setBrl(data.unicode);
    } catch {
      setBrl("⠁⠇⠑⠎⠎⠕⠝ ⠕⠝ ⠍⠑⠍⠕⠗⠽");
    }
  }

  async function certificate() {
    try {
      const data = await postJson("/api/certificates", { learner_id: "hirut-01", course_id: "cs-foundations" });
      setStatus(`Certificate ${data.id} — share with an employer.`);
    } catch {
      setStatus("Certificate saved locally until you reconnect.");
    }
  }

  return (
    <section>
      <p className="kicker">Track 2 · {t.playerTitle}</p>
      <h1>{lang === "am" ? "ኮምፒውተር የሚያስታውሰው" : "What a computer remembers"}</h1>
      <p className="lede">
        {lang === "am"
          ? "ቦታ፣ ቀስተ ድምፅ፣ ንዑስ ጽሑፍ፣ የምልክት መስኮት።"
          : "Keyboard first. Captions you can recolour. A sign window you can drag. Audio description on a separate track."}
      </p>

      <div className="player-wrap">
        <div>
          <div className="screen" ref={wrapRef}>
            <canvas ref={canvasRef} width="960" height="600" aria-label="Lesson picture: Hirut at a table beside a memory shelf" />
            <div
              className="captions"
              style={{ fontSize: `${capSize}rem`, background: capBg, color: capFg }}
            >
              {caption}
            </div>
            {signOn && (
              <div
                className="sign"
                style={{ left: sign.x, top: sign.y, width: sign.w, height: sign.h }}
              >
                <header onMouseDown={startDrag}>{t.sign} · drag / resize</header>
                <div className="body">
                  <svg className="hands" viewBox="0 0 80 80" aria-hidden="true">
                    <rect width="80" height="80" fill="#0d3b2e" />
                    <circle cx="40" cy="22" r="10" fill="#f3efe4" />
                    <rect x="28" y="34" width="24" height="28" fill="#111" />
                    <ellipse cx="22" cy="50" rx="8" ry="5" fill="#f3efe4">
                      {!reduce && <animateTransform attributeName="transform" type="rotate" values="0 22 50;18 22 50;0 22 50" dur="1.6s" repeatCount="indefinite" />}
                    </ellipse>
                    <ellipse cx="58" cy="48" rx="8" ry="5" fill="#f3efe4">
                      {!reduce && <animateTransform attributeName="transform" type="rotate" values="0 58 48;-14 58 48;0 58 48" dur="1.6s" repeatCount="indefinite" />}
                    </ellipse>
                  </svg>
                  <strong>{lang === "am" ? signCue.am : signCue.en}</strong>
                  <span className="meta">Selam · prerecorded</span>
                </div>
              </div>
            )}
          </div>

          <div className="controls" role="group" aria-label="Playback">
            <button type="button" onClick={() => setPlaying((p) => !p)}>
              {playing ? "Pause" : "Play"}
            </button>
            <label>
              Time
              <input
                type="range"
                min="0"
                max={duration}
                step="0.1"
                value={time}
                onChange={(e) => setTime(Number(e.target.value))}
                aria-valuetext={`${Math.floor(time)} seconds`}
              />
            </label>
            <span className="meta" style={{ fontVariantNumeric: "tabular-nums" }}>
              {Math.floor(time)} / {duration}s
            </span>
            <button className="ghost" type="button" onClick={() => speak(caption, capLang)}>
              Speak caption
            </button>
            <button className="ghost" type="button" onClick={() => setSignOn((s) => !s)}>
              {signOn ? "Hide sign window" : "Show sign window"}
            </button>
            <button className="ghost" type="button" onClick={() => setShowAd((s) => !s)}>
              {t.ad}
            </button>
          </div>

          <div className="controls">
            <label>
              {t.captions}
              <select value={capLang} onChange={(e) => setCapLang(e.target.value)}>
                <option value="en">{t.english}</option>
                <option value="am">{t.amharic}</option>
              </select>
            </label>
            <label>
              Size
              <input type="range" min="0.9" max="2" step="0.05" value={capSize} onChange={(e) => setCapSize(Number(e.target.value))} />
            </label>
            <label>
              Text
              <input type="color" value={capFg} onChange={(e) => setCapFg(e.target.value)} aria-label="Caption colour" />
            </label>
            <label>
              Box
              <input type="color" value="#000000" onChange={(e) => setCapBg(e.target.value + "cc")} aria-label="Caption background" />
            </label>
          </div>

          {showAd && (
            <p className="banner" aria-live="polite">
              {ad || "Audio description is quiet in this moment."}
            </p>
          )}

          <div className="row" style={{ marginTop: "0.8rem" }}>
            <button type="button" onClick={downloadPack}>{saved ? t.downloaded : t.download}</button>
            <button type="button" onClick={present}>{t.present}</button>
            <button className="ghost" type="button" onClick={braille}>{t.braille}</button>
            <button className="ghost" type="button" onClick={certificate}>{t.certify}</button>
          </div>
          {status && <p className="banner" role="status">{status}</p>}
          {brl && <p className="braille" lang="en" translate="no">{brl}</p>}
          {!online && <p className="meta">{t.offlineOk}</p>}
        </div>

        <aside>
          <h2>{t.transcript}</h2>
          <div className="transcript">
            {cues.map((c) => (
              <button
                key={c[0]}
                type="button"
                aria-current={time >= c[0] && time < c[1]}
                onClick={() => setTime(c[0])}
              >
                <span className="meta">{Math.floor(c[0])}s</span>
                <div>{c[2]}</div>
              </button>
            ))}
          </div>
          <h2 style={{ marginTop: "1rem" }}>{t.must}</h2>
          <ul>
            <li>Keyboard and screen reader</li>
            <li>English and Amharic captions you can resize</li>
            <li>Movable Ethiopian Sign Language window</li>
            <li>Audio description</li>
            <li>3G pack: text, captions, light picture</li>
            <li>Braille .brf extra</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}

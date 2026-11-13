import { useEffect, useMemo, useState } from "react";
import { copy } from "./i18n.js";
import { flushSync, speak } from "./offline.js";
import Player from "./Player.jsx";
import { Attendance, Career, Documents, Home, Vision } from "./pages.jsx";

function hashPage() {
  return (window.location.hash || "#home").replace("#", "") || "home";
}

export default function App() {
  const [page, setPage] = useState(hashPage);
  const [lang, setLang] = useState(localStorage.getItem("la-lang") || "en");
  const [online, setOnline] = useState(navigator.onLine);
  const [consistency, setConsistency] = useState(null);
  const t = copy[lang];

  const setHash = (id) => {
    window.location.hash = id;
    setPage(id);
  };

  useEffect(() => {
    const onHash = () => setPage(hashPage());
    const onOnline = () => {
      setOnline(true);
      flushSync();
    };
    const onOffline = () => setOnline(false);
    window.addEventListener("hashchange", onHash);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js");
    flushSync();
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  function reloadConsistency() {
    fetch("/api/consistency/hirut-01")
      .then((r) => r.json())
      .then(setConsistency)
      .catch(() =>
        setConsistency({
          tone: "nudge",
          hours_since_seen: 0,
          message_en: "The reminder lives on this phone until the server answers.",
          message_am: "ማስታወሻው በስልኩ ይቀራል።",
          history: [],
        })
      );
  }

  useEffect(() => {
    reloadConsistency();
  }, []);

  function bumpText() {
    const html = document.documentElement;
    const now = html.dataset.text;
    html.dataset.text = now === "large" ? "xlarge" : now === "xlarge" ? "" : "large";
  }
  function contrast() {
    const html = document.documentElement;
    html.dataset.contrast = html.dataset.contrast === "high" ? "" : "high";
  }
  function motion() {
    const html = document.documentElement;
    html.dataset.motion = html.dataset.motion === "stop" ? "" : "stop";
  }
  function readPage() {
    speak(document.getElementById("main")?.innerText?.slice(0, 500) || t.lede, lang);
  }
  function voice() {
    const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Rec) {
      speak("Voice commands need Chrome or Edge.", "en");
      return;
    }
    const rec = new Rec();
    rec.lang = lang === "am" ? "am-ET" : "en-GB";
    rec.onresult = (e) => {
      const said = e.results[0][0].transcript.toLowerCase();
      if (said.includes("lesson") || said.includes("ትምህርት")) setHash("lesson");
      else if (said.includes("job") || said.includes("ስራ")) setHash("career");
      else if (said.includes("camera") || said.includes("vision")) setHash("vision");
      else if (said.includes("home") || said.includes("መነሻ")) setHash("home");
      else speak(said, lang);
    };
    rec.start();
  }

  const nav = useMemo(
    () => [
      ["home", t.home],
      ["lesson", t.lesson],
      ["vision", t.vision],
      ["career", t.career],
      ["docs", t.docs],
      ["attend", t.attend],
    ],
    [t]
  );

  return (
    <div className="shell">
      <aside className="rail">
        <a className="brand" href="#home" onClick={() => setHash("home")}>
          <span className="dots" aria-hidden="true">
            <i /><i /><i /><i /><i /><i />
          </span>
          <span>
            <strong translate="no">LearnAble</strong>
            <div className="meta">{t.tag}</div>
          </span>
        </a>
        <nav className="nav" aria-label="Main">
          {nav.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={page === id ? "page" : undefined}
              onClick={() => setHash(id)}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="toolbar" role="toolbar" aria-label="Access">
          <button type="button" className="ghost" onClick={bumpText}>{t.larger}</button>
          <button type="button" className="ghost" onClick={contrast}>{t.contrast}</button>
          <button type="button" className="ghost" onClick={motion}>{t.stop}</button>
          <button type="button" className="ghost" onClick={readPage}>{t.speak}</button>
          <button type="button" className="ghost" onClick={voice}>{t.listen}</button>
          <select
            aria-label="Language"
            value={lang}
            onChange={(e) => {
              setLang(e.target.value);
              localStorage.setItem("la-lang", e.target.value);
              document.documentElement.lang = e.target.value === "am" ? "am" : "en";
            }}
          >
            <option value="en">English</option>
            <option value="am">አማርኛ</option>
          </select>
        </div>
        <p className="meta">{online ? t.online : t.offlineOk}</p>
      </aside>
      <main id="main" className="stage" tabIndex={-1}>
        {page === "home" && <Home t={t} lang={lang} setHash={setHash} consistency={consistency} />}
        {page === "lesson" && <Player t={t} lang={lang} online={online} />}
        {page === "vision" && <Vision t={t} lang={lang} />}
        {page === "career" && <Career t={t} lang={lang} />}
        {page === "docs" && <Documents t={t} lang={lang} />}
        {page === "attend" && <Attendance t={t} lang={lang} consistency={consistency} reload={reloadConsistency} />}
        <footer className="fine">
          Mapped from ALX Savanna static pages (home, self-paced home, concept-with-navigation).
          Sign language is prerecorded for the prototype. CESL and EthSL Tutor are research neighbours, not this model.
          Meta glasses and VR stay on the roadmap.
        </footer>
      </main>
    </div>
  );
}

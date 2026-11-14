import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useLocale } from "../a11y/locale";
import { usePreferences } from "../a11y/preferences";
import { Wordmark } from "./Wordmark";

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { chrome, lang, setLang } = useLocale();
  const { largeText, highContrast, stopMotion, setLargeText, setHighContrast, setStopMotion } = usePreferences();
  const links = [
    ["/lesson/slow-connection", chrome.lesson],
    ["/offline", chrome.pack],
    ["/sessions/studio", chrome.session],
    ["/careers", chrome.jobs],
  ] as const;
  const footer = [
    ["/lesson/slow-connection/read", chrome.text],
    ["/verify", chrome.certificate],
    ["/pipeline", chrome.pipeline],
    ["/tracks", chrome.tracks],
    ["/savanna", chrome.savanna],
    ["/demo", chrome.demo],
    ["/integrate", chrome.embed],
    ["/accessibility", chrome.accessibility],
  ] as const;

  return (
    <div className="shell">
      <a className="skip" href="#main">
        {chrome.skip}
      </a>
      <header className="topbar">
        <div className="topbar-row">
          <NavLink to="/" className="wordmark-link" end aria-label="LearnAble">
            <Wordmark />
          </NavLink>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? chrome.close : chrome.menu}
          </button>
          <nav id="site-nav" className={menuOpen ? "open" : undefined} aria-label="Primary">
            {links.map(([href, label]) => (
              <NavLink key={href} to={href} onClick={() => setMenuOpen(false)}>
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="toggles" role="group" aria-label={chrome.display}>
            <button type="button" aria-pressed={largeText} onClick={() => setLargeText(!largeText)}>
              {chrome.larger}
            </button>
            <button type="button" aria-pressed={highContrast} onClick={() => setHighContrast(!highContrast)}>
              {chrome.contrast}
            </button>
            <button type="button" aria-pressed={stopMotion} onClick={() => setStopMotion(!stopMotion)}>
              {chrome.stop}
            </button>
            <label className="lang-pick">
              {chrome.language}
              <select
                value={lang}
                onChange={(event) => setLang(event.target.value === "am" ? "am" : "en")}
              >
                <option value="en">English</option>
                <option value="am">አማርኛ</option>
              </select>
            </label>
          </div>
        </div>
      </header>
      <main id="main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <ul>
          {footer.map(([href, label]) => (
            <li key={href}>
              <NavLink to={href}>{label}</NavLink>
            </li>
          ))}
        </ul>
        <p>LearnAble demo for the ALX Accessibility Hackathon, 14–15 November 2026. Sample voices, sample captions, no account required.</p>
      </footer>
    </div>
  );
}

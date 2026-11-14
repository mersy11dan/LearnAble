import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { usePreferences } from "../a11y/preferences";
import { Wordmark } from "./Wordmark";

const LINKS = [
  ["/lesson/slow-connection", "Lesson"],
  ["/offline", "Pack"],
  ["/sessions/studio", "Session"],
  ["/careers", "Jobs"],
] as const;

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { largeText, highContrast, stopMotion, setLargeText, setHighContrast, setStopMotion } = usePreferences();

  return (
    <div className="shell">
      <a className="skip" href="#main">
        Skip to content
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
            {menuOpen ? "Close menu" : "Menu"}
          </button>
          <nav id="site-nav" className={menuOpen ? "open" : undefined} aria-label="Primary">
            {LINKS.map(([href, label]) => (
              <NavLink key={href} to={href} onClick={() => setMenuOpen(false)}>
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="toggles" role="group" aria-label="Display">
            <button type="button" aria-pressed={largeText} onClick={() => setLargeText(!largeText)}>
              Larger text
            </button>
            <button type="button" aria-pressed={highContrast} onClick={() => setHighContrast(!highContrast)}>
              High contrast
            </button>
            <button type="button" aria-pressed={stopMotion} onClick={() => setStopMotion(!stopMotion)}>
              Stop motion
            </button>
          </div>
        </div>
      </header>
      <main id="main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <ul>
          <li>
            <NavLink to="/lesson/slow-connection/read">Text version</NavLink>
          </li>
          <li>
            <NavLink to="/verify">Check a certificate</NavLink>
          </li>
          <li>
            <NavLink to="/pipeline">Transcript pipeline</NavLink>
          </li>
          <li>
            <NavLink to="/tracks">Tracks</NavLink>
          </li>
          <li>
            <NavLink to="/savanna">Savanna pages</NavLink>
          </li>
          <li>
            <NavLink to="/demo">Before / with</NavLink>
          </li>
          <li>
            <NavLink to="/integrate">Embed</NavLink>
          </li>
          <li>
            <NavLink to="/accessibility">Accessibility</NavLink>
          </li>
        </ul>
        <p>LearnAble demo for the ALX Accessibility Hackathon, 14–15 November 2026. Sample voices, sample captions, no account required.</p>
      </footer>
    </div>
  );
}

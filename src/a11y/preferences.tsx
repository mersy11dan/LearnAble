import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type DisplayState = {
  largeText: boolean;
  highContrast: boolean;
  stopMotion: boolean;
};

type Preferences = DisplayState & {
  setLargeText: (value: boolean) => void;
  setHighContrast: (value: boolean) => void;
  setStopMotion: (value: boolean) => void;
};

const STORAGE_KEY = "learnable-display";

const PreferencesContext = createContext<Preferences | null>(null);

function prefers(query: string): boolean {
  try {
    return window.matchMedia(query).matches;
  } catch {
    return false;
  }
}

function loadDisplay(): DisplayState {
  const fallback: DisplayState = {
    largeText: false,
    highContrast: prefers("(prefers-contrast: more)"),
    stopMotion: prefers("(prefers-reduced-motion: reduce)"),
  };
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return fallback;
    const parsed = JSON.parse(saved) as Partial<DisplayState>;
    return {
      largeText: Boolean(parsed.largeText),
      highContrast: Boolean(parsed.highContrast),
      stopMotion: parsed.stopMotion === undefined ? fallback.stopMotion : Boolean(parsed.stopMotion),
    };
  } catch {
    return fallback;
  }
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [display, setDisplay] = useState<DisplayState>(loadDisplay);

  useEffect(() => {
    document.documentElement.dataset.text = display.largeText ? "large" : "default";
    document.documentElement.dataset.contrast = display.highContrast ? "high" : "default";
    document.documentElement.dataset.motion = display.stopMotion ? "reduce" : "allow";
    localStorage.setItem(STORAGE_KEY, JSON.stringify(display));
  }, [display]);

  const value = useMemo<Preferences>(
    () => ({
      ...display,
      setLargeText: (largeText) => setDisplay((current) => ({ ...current, largeText })),
      setHighContrast: (highContrast) => setDisplay((current) => ({ ...current, highContrast })),
      setStopMotion: (stopMotion) => setDisplay((current) => ({ ...current, stopMotion })),
    }),
    [display],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

// The provider and this hook live together so the context stays private.
// eslint-disable-next-line react-refresh/only-export-components
export function usePreferences(): Preferences {
  const value = useContext(PreferencesContext);
  if (!value) throw new Error("Display settings are missing.");
  return value;
}

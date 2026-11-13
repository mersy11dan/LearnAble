import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PreferencesProvider } from "./a11y/preferences";
import { App } from "./App";
import "./styles/tokens.css";
import "@fontsource/literata/500.css";
import "@fontsource/literata/600.css";
import "@fontsource/atkinson-hyperlegible/400.css";
import "@fontsource/atkinson-hyperlegible/700.css";
import "./styles/global.css";

const root = document.getElementById("root");
if (!root) throw new Error("Root element missing.");

createRoot(root).render(
  <StrictMode>
    <PreferencesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PreferencesProvider>
  </StrictMode>,
);

if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    void navigator.serviceWorker.register("/sw.js").catch(() => undefined);
  });
}

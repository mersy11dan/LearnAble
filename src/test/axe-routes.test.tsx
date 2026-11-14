import { cleanup, render } from "@testing-library/react";
import { axe } from "jest-axe";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { PreferencesProvider } from "../a11y/preferences";
import { App } from "../App";
import "../embed";

const routes = [
  "/",
  "/lesson/slow-connection",
  "/lesson/slow-connection/read",
  "/offline",
  "/sessions/studio",
  "/careers",
  "/verify",
  "/pipeline",
  "/savanna",
  "/demo",
  "/integrate",
  "/tracks",
  "/accessibility",
  "/missing-page",
];

function renderAt(path: string) {
  return render(
    <PreferencesProvider>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </PreferencesProvider>,
  );
}

async function seriousOrCritical(path: string) {
  const results = await axe(document.body, {
    preload: false,
    iframes: false,
    rules: { "color-contrast": { enabled: false } },
  });
  const blocking = results.violations.filter((item) => item.impact === "critical" || item.impact === "serious");
  const summary = blocking.map((item) => `${item.id} (${item.impact}) ${item.nodes.length}`).join("; ");
  expect(summary, `${path}: ${summary}`).toBe("");
}

describe("axe on every route", () => {
  afterEach(() => {
    cleanup();
    document.body.querySelectorAll("learnable-toolbar").forEach((node) => node.remove());
  });

  it.each(routes)("has no serious or critical issues on %s", async (path) => {
    renderAt(path);
    await seriousOrCritical(path);
  });

  it("has no serious or critical issues in high contrast", async () => {
    localStorage.setItem(
      "learnable-display",
      JSON.stringify({ largeText: false, highContrast: true, stopMotion: true }),
    );
    renderAt("/lesson/slow-connection");
    document.documentElement.dataset.contrast = "high";
    await seriousOrCritical("high-contrast lesson");
    localStorage.removeItem("learnable-display");
  });

  it("has no serious or critical issues with the embed toolbar mounted", async () => {
    renderAt("/integrate");
    if (!document.querySelector("learnable-toolbar")) {
      document.body.append(document.createElement("learnable-toolbar"));
    }
    await seriousOrCritical("toolbar open");
  });
});

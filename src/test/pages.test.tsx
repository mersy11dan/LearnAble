import { fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { PreferencesProvider } from "../a11y/preferences";
import { App } from "../App";

function renderAt(path: string) {
  return render(
    <PreferencesProvider>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </PreferencesProvider>,
  );
}

async function expectClean(container: HTMLElement) {
  const results = await axe(container, {
    preload: false,
    rules: {
      "color-contrast": { enabled: false },
      region: { enabled: false },
    },
  });
  expect(results).toHaveNoViolations();
}

describe("pages", () => {
  it("opens on the lesson promise", async () => {
    const { container } = renderAt("/");
    expect(screen.getByRole("heading", { level: 1, name: /still plays/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Open the lesson" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "LearnAble" })).toBeInTheDocument();
    await expectClean(container);
  });

  it("renders the player controls and both caption languages", async () => {
    const { container } = renderAt("/lesson/slow-connection");
    expect(screen.getByRole("button", { name: "Play" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "English device voice" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "አማርኛ" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Keyboard shortcuts" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    await expectClean(container);
  }, 20000);

  it("switches the primary menu into Amharic", async () => {
    const { container } = renderAt("/");
    fireEvent.change(screen.getByRole("combobox", { name: "Language" }), { target: { value: "am" } });
    expect(screen.getByRole("link", { name: "ትምህርት" })).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("am");
    await expectClean(container);
  });

  it("keeps the job summary in the page, next to the audio control", async () => {
    const { container } = renderAt("/careers");
    expect(screen.getByRole("button", { name: "Play audio summary" })).toBeInTheDocument();
    expect(screen.getByText(/fictional demo/i)).toBeInTheDocument();
    await expectClean(container);
  });
});

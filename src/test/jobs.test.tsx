import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { LocaleProvider } from "../a11y/locale";
import { PreferencesProvider } from "../a11y/preferences";
import { App } from "../App";
import { jobPosting, jobs } from "../content/jobs";

function renderAt(path: string) {
  return render(
    <PreferencesProvider>
      <MemoryRouter initialEntries={[path]}>
        <LocaleProvider>
          <App />
        </LocaleProvider>
      </MemoryRouter>
    </PreferencesProvider>,
  );
}

describe("job cards", () => {
  it("parses JobPosting JSON-LD from each card", () => {
    const { container } = renderAt("/careers");
    const scripts = [...container.querySelectorAll('script[type="application/ld+json"]')];
    expect(scripts).toHaveLength(jobs.length);
    scripts.forEach((script, index) => {
      const data = JSON.parse(script.textContent || "") as Record<string, unknown>;
      const expected = jobPosting(jobs[index]);
      expect(data["@type"]).toBe("JobPosting");
      expect(data.title).toBe(expected.title);
      expect(data.description).toBe(expected.description);
      expect(String(data.description).toLowerCase()).toContain("not a real job posting");
      expect(data.hiringOrganization).toEqual(expected.hiringOrganization);
      expect(data.jobLocation).toEqual(expected.jobLocation);
      expect(data.employmentType).toBe(expected.employmentType);
      expect(data.datePosted).toBe("2026-11-14");
      expect(data.validThrough).toBe("2026-12-31");
      expect(data.applicantLocationRequirements).toEqual(expected.applicantLocationRequirements);
    });
    expect(JSON.parse(scripts[2].textContent || "").jobLocationType).toBe("TELECOMMUTE");
  });

  it("keeps the Amharic summary on screen and says when no Amharic voice is installed", async () => {
    renderAt("/careers");
    expect(screen.getByText(/ቦሌ ክፍት ክፍል/)).toBeInTheDocument();
    fireEvent.change(screen.getByRole("combobox", { name: "Language" }), { target: { value: "am" } });
    fireEvent.click(screen.getAllByRole("button", { name: "Play audio summary" })[0]);
    expect(await screen.findByText(/No Amharic voice is available on this device/)).toBeInTheDocument();
    expect(screen.getByText(/ቦሌ ክፍት ክፍል/)).toBeInTheDocument();
  });
});

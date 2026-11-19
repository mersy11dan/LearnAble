import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SignVideoRead } from "../components/SignVideoRead";

describe("sign video", () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows the honest label before any request", () => {
    render(<SignVideoRead />);
    expect(screen.getByRole("heading", { name: "Read a sign video" })).toBeInTheDocument();
    expect(screen.getByText(/Computer-generated. ASL, not Ethiopian Sign Language/)).toBeInTheDocument();
    expect(screen.getByLabelText("Sign video, up to 1.5 MB")).toBeInTheDocument();
  });

  it("asks the transcript service and shows the unavailable reply without a key", async () => {
    const fetchMock = vi.fn(
      async () =>
        new Response(
          JSON.stringify({
            source: "unavailable",
            text: null,
            label: "Computer-generated. ASL, not Ethiopian Sign Language.",
            message: "Video-to-text is unavailable. No sign-recognition model is installed, and none is downloaded.",
          }),
          { status: 200, headers: { "content-type": "application/json" } },
        ),
    );
    vi.stubGlobal("fetch", fetchMock);
    render(<SignVideoRead />);
    const file = new File([new Uint8Array([1, 2, 3])], "sign.mp4", { type: "video/mp4" });
    fireEvent.change(screen.getByLabelText("Sign video, up to 1.5 MB"), { target: { files: [file] } });
    fireEvent.click(screen.getByRole("button", { name: "Read this sign video" }));
    expect(await screen.findByText(/Video-to-text is unavailable/)).toBeInTheDocument();
    const init = fetchMock.mock.calls[0][1] as RequestInit;
    const headerText = JSON.stringify(init.headers ?? {});
    expect(headerText.toLowerCase()).not.toContain("gemini");
    expect(headerText.toLowerCase()).not.toContain("api-key");
    expect(String(fetchMock.mock.calls[0][0])).toContain("/api/sign-video");
  });
});

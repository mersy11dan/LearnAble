import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);
import { ChatSupport } from "../components/ChatSupport";

Element.prototype.scrollIntoView = vi.fn();

vi.mock("../utils/gemini", () => ({
  generateResponse: vi.fn().mockResolvedValue({
    text: "This is a test response",
    source: "saved",
    note: "The transcript service is not running. This is a saved answer. No model is running.",
  }),
}));

vi.mock("../utils/speechRecognition", () => ({
  useSpeechRecognition: () => ({
    startListening: vi.fn(),
    stopListening: vi.fn(),
    transcript: "",
    interimTranscript: "",
    error: null,
    isSupported: true,
    isListening: false,
  }),
}));

vi.mock("../utils/speechSynthesis", () => ({
  useSpeechSynthesis: () => ({
    speak: vi.fn(),
    stop: vi.fn(),
    isSpeaking: false,
    isSupported: true,
  }),
}));


function renderChat(path = "/") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <ChatSupport />
    </MemoryRouter>,
  );
}

describe("ChatSupport", () => {
  it("renders the floating action button when closed", () => {
    renderChat();
    expect(screen.getByLabelText("Open support chat")).toBeInTheDocument();
  });

  it("opens the chat when clicking the FAB", () => {
    renderChat();
    fireEvent.click(screen.getByLabelText("Open support chat"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("LearnAble guide")).toBeInTheDocument();
  });

  it("displays the initial welcome once", () => {
    renderChat();
    fireEvent.click(screen.getByLabelText("Open support chat"));
    expect(screen.getByText(/I can take you around LearnAble/)).toBeInTheDocument();
  });

  it("has accessible input field", () => {
    renderChat();
    fireEvent.click(screen.getByLabelText("Open support chat"));
    const input = screen.getByLabelText("Type your message");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  it("can type and submit a message", async () => {
    renderChat();
    fireEvent.click(screen.getByLabelText("Open support chat"));
    const input = screen.getByLabelText("Type your message");
    fireEvent.change(input, { target: { value: "How do I use captions?" } });
    fireEvent.click(screen.getByLabelText("Send message"));
    await waitFor(() => {
      expect(screen.getByText("How do I use captions?")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("This is a test response")).toBeInTheDocument();
    });
    expect(screen.getAllByText("Saved answer. No model is running.").length).toBeGreaterThanOrEqual(2);
  });

  it("does not echo the intro when the user says hello", async () => {
    renderChat("/");
    fireEvent.click(screen.getByLabelText("Open support chat"));
    fireEvent.change(screen.getByLabelText("Type your message"), { target: { value: "hello" } });
    fireEvent.click(screen.getByLabelText("Send message"));
    await waitFor(() => {
      expect(screen.getByText(/Hello\. You are on Home/)).toBeInTheDocument();
    });
    expect(screen.queryByText(/You can ask me about/)).not.toBeInTheDocument();
  });

  it("navigates to sessions from a typed command", async () => {
    renderChat("/");
    fireEvent.click(screen.getByLabelText("Open support chat"));
    fireEvent.change(screen.getByLabelText("Type your message"), { target: { value: "go to sessions" } });
    fireEvent.click(screen.getByLabelText("Send message"));
    await waitFor(() => {
      expect(screen.getByText(/Opening Recorded session/)).toBeInTheDocument();
    });
  });

  it("asks for consent before a question can leave the site", () => {
    sessionStorage.removeItem("learnable-consent");
    renderChat();
    fireEvent.click(screen.getByLabelText("Open support chat"));
    const consent = screen.getByLabelText(/send questions to Gemini/i);
    expect(consent).not.toBeChecked();
    fireEvent.click(consent);
    expect(sessionStorage.getItem("learnable-consent")).toBe("yes");
  });

  it("closes when clicking the close button", () => {
    renderChat();
    fireEvent.click(screen.getByLabelText("Open support chat"));
    fireEvent.click(screen.getByLabelText("Close chat"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Open support chat")).toBeInTheDocument();
  });

  it("can minimize and expand the chat", () => {
    renderChat();
    fireEvent.click(screen.getByLabelText("Open support chat"));
    fireEvent.click(screen.getByLabelText("Minimize chat"));
    expect(screen.getByRole("dialog")).toHaveClass("minimized");
    fireEvent.click(screen.getByLabelText("Expand chat"));
    expect(screen.getByRole("dialog")).not.toHaveClass("minimized");
  });

  it("has the original circular mic beside the text field", () => {
    renderChat();
    fireEvent.click(screen.getByLabelText("Open support chat"));
    const mic = screen.getByLabelText("Start voice input");
    const input = screen.getByLabelText("Type your message");
    expect(mic).toBeInTheDocument();
    expect(mic).toHaveClass("voice-control-btn");
    expect(mic.parentElement).toHaveClass("chat-input-row");
    expect(input.closest(".chat-input-row")).toBe(mic.parentElement);
    expect(screen.queryByLabelText("Toggle ASL translator")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Jobs" })).not.toBeInTheDocument();
    expect(screen.getByLabelText("Type your message")).not.toBeDisabled();
  });

  it("closes with Escape", () => {
    renderChat();
    fireEvent.click(screen.getByLabelText("Open support chat"));
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("meets accessibility standards", () => {
    renderChat();
    fireEvent.click(screen.getByLabelText("Open support chat"));
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-label", "Support chat");
    expect(dialog).not.toHaveAttribute("aria-modal");
    expect(screen.getByRole("log")).toHaveAttribute("aria-live", "polite");
  });
});

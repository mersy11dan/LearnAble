import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);
import { ChatSupport } from "../components/ChatSupport";

Element.prototype.scrollIntoView = vi.fn();

vi.mock("../utils/gemini", () => ({
  generateResponse: vi.fn().mockResolvedValue("This is a test response"),
}));

vi.mock("../utils/aslTranslation", () => ({
  translateToASL: vi.fn().mockResolvedValue("TEST RESPONSE"),
}));

vi.mock("../utils/speechRecognition", () => ({
  useSpeechRecognition: () => ({
    startListening: vi.fn(),
    stopListening: vi.fn(),
    transcript: "",
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

describe("ChatSupport", () => {
  it("renders the floating action button when closed", () => {
    render(<ChatSupport />);
    const fab = screen.getByLabelText("Open support chat");
    expect(fab).toBeInTheDocument();
  });

  it("opens the chat when clicking the FAB", () => {
    render(<ChatSupport />);
    const fab = screen.getByLabelText("Open support chat");
    fireEvent.click(fab);
    
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("LearnAble Support")).toBeInTheDocument();
  });

  it("displays the initial welcome message", () => {
    render(<ChatSupport />);
    const fab = screen.getByLabelText("Open support chat");
    fireEvent.click(fab);
    
    expect(screen.getByText(/Hello! I'm here to help you/)).toBeInTheDocument();
  });

  it("has accessible input field", () => {
    render(<ChatSupport />);
    const fab = screen.getByLabelText("Open support chat");
    fireEvent.click(fab);
    
    const input = screen.getByLabelText("Type your message");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  it("can type and submit a message", async () => {
    render(<ChatSupport />);
    const fab = screen.getByLabelText("Open support chat");
    fireEvent.click(fab);
    
    const input = screen.getByLabelText("Type your message");
    const sendButton = screen.getByLabelText("Send message");
    
    fireEvent.change(input, { target: { value: "How do I use captions?" } });
    expect(input).toHaveValue("How do I use captions?");
    
    fireEvent.click(sendButton);
    
    await waitFor(() => {
      expect(screen.getByText("How do I use captions?")).toBeInTheDocument();
    });
  });

  it("closes when clicking the close button", () => {
    render(<ChatSupport />);
    const fab = screen.getByLabelText("Open support chat");
    fireEvent.click(fab);
    
    const closeButton = screen.getByLabelText("Close chat");
    fireEvent.click(closeButton);
    
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Open support chat")).toBeInTheDocument();
  });

  it("can minimize and expand the chat", () => {
    render(<ChatSupport />);
    const fab = screen.getByLabelText("Open support chat");
    fireEvent.click(fab);
    
    const minimizeButton = screen.getByLabelText("Minimize chat");
    fireEvent.click(minimizeButton);
    
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveClass("minimized");
    
    const expandButton = screen.getByLabelText("Expand chat");
    fireEvent.click(expandButton);
    
    expect(dialog).not.toHaveClass("minimized");
  });

  it("has voice control button when supported", () => {
    render(<ChatSupport />);
    const fab = screen.getByLabelText("Open support chat");
    fireEvent.click(fab);
    
    const voiceButton = screen.getByLabelText("Start voice input");
    expect(voiceButton).toBeInTheDocument();
  });

  it("has ASL translator toggle", () => {
    render(<ChatSupport />);
    const fab = screen.getByLabelText("Open support chat");
    fireEvent.click(fab);
    
    const aslButton = screen.getByLabelText("Toggle ASL translator");
    expect(aslButton).toBeInTheDocument();
  });

  it("meets accessibility standards", () => {
    render(<ChatSupport />);
    const fab = screen.getByLabelText("Open support chat");
    fireEvent.click(fab);
    
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-label", "Support chat");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    
    const messagesArea = screen.getByRole("log");
    expect(messagesArea).toHaveAttribute("aria-live", "polite");
  });
});

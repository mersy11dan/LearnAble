import { FormEvent, useEffect, useRef, useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  draft?: string;
  listening?: boolean;
}

export function ChatInput({ onSend, disabled, draft, listening }: ChatInputProps) {
  const [input, setInput] = useState("");
  const wasListening = useRef(false);
  const value = listening ? draft || "" : input;

  useEffect(() => {
    if (wasListening.current && !listening) setInput("");
    wasListening.current = Boolean(listening);
  }, [listening]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = (listening ? draft : input)?.trim();
    if (text && !disabled && !listening) {
      onSend(text);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input-form">
      <label htmlFor="chat-input" className="sr-only">
        Type your message
      </label>
      <input
        id="chat-input"
        type="text"
        value={value}
        onChange={(e) => {
          if (!listening) setInput(e.target.value);
        }}
        placeholder={listening ? "Listening…" : "Say or type a page, like sessions or jobs"}
        disabled={disabled || listening}
        className={`chat-input${listening ? " chat-input-listening" : ""}`}
        aria-describedby="chat-input-hint"
      />
      <span id="chat-input-hint" className="sr-only">
        Press Enter to send. Use the microphone to search by voice, like Google.
      </span>
      <button type="submit" disabled={!value.trim() || disabled || listening} className="chat-send-btn" aria-label="Send message">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </form>
  );
}

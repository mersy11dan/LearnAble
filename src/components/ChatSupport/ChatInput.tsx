import { FormEvent, useEffect, useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  spokenDraft?: string;
  listening?: boolean;
  onTyped?: () => void;
}

export function ChatInput({ onSend, disabled, spokenDraft, listening, onTyped }: ChatInputProps) {
  const [input, setInput] = useState("");
  const value = listening ? spokenDraft || input : input;

  useEffect(() => {
    if (listening) setInput("");
  }, [listening]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = value.trim();
    if (text && !disabled) {
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
          onTyped?.();
          setInput(e.target.value);
        }}
        placeholder={listening ? "Listening… speak now" : "Type a message"}
        disabled={disabled}
        className={`chat-input${listening ? " chat-input-listening" : ""}`}
        aria-describedby="chat-input-hint"
        autoComplete="off"
      />
      <span id="chat-input-hint" className="sr-only">
        Type and press Enter to send. The microphone is spoken navigation. The box stays available if you prefer to type.
      </span>
      <button type="submit" disabled={!value.trim() || disabled} className="chat-send-btn" aria-label="Send message">
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

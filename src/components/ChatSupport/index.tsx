import { useState, useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { VoiceControl } from "./VoiceControl";
import { ASLTranslator } from "./ASLTranslator";
import { useChatSupport } from "./useChatSupport";
import "./styles.css";

export function ChatSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const { messages, sendMessage, isLoading } = useChatSupport();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleVoiceInput = (text: string) => {
    sendMessage(text);
  };

  if (!isOpen) {
    return (
      <button
        className="chat-support-fab"
        onClick={() => setIsOpen(true)}
        aria-label="Open support chat"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>
    );
  }

  return (
    <div
      className={`chat-support-container ${isMinimized ? "minimized" : ""}`}
      role="dialog"
      aria-label="Support chat"
      aria-modal="true"
    >
      <div className="chat-support-header">
        <h2 className="chat-support-title">LearnAble Support</h2>
        <div className="chat-support-actions">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
            className="chat-support-btn"
          >
            {isMinimized ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            )}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
            className="chat-support-btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="chat-support-messages" role="log" aria-live="polite" aria-atomic="false">
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} message={msg} />
            ))}
            {isLoading && (
              <div className="chat-support-loading" role="status" aria-label="Loading response">
                <span className="chat-support-dot"></span>
                <span className="chat-support-dot"></span>
                <span className="chat-support-dot"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-support-input-area">
            <ASLTranslator />
            <ChatInput onSend={sendMessage} disabled={isLoading} />
            <VoiceControl onVoiceInput={handleVoiceInput} disabled={isLoading} />
          </div>
        </>
      )}
    </div>
  );
}

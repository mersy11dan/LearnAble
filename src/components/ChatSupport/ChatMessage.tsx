import { Message } from "./useChatSupport";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`chat-message ${isUser ? "chat-message-user" : "chat-message-assistant"}`}
      role={isUser ? "article" : "article"}
      aria-label={isUser ? "Your message" : "Assistant message"}
    >
      <div className="chat-message-content">
        {message.content.split('\n').map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </div>
      <div className="chat-message-time" aria-label={`Sent at ${message.timestamp.toLocaleTimeString()}`}>
        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
}

import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { generateResponse } from "../../utils/gemini";
import { CourseKnowledgeBase } from "../../utils/courseKnowledge";
import { interpretGuideCommand } from "../../utils/voiceNavigation";

export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  hasASL?: boolean;
}

function guideMessage(content: string): Message {
  return {
    role: "assistant",
    content,
    timestamp: new Date(),
  };
}

export function useChatSupport() {
  const navigate = useNavigate();
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm here to help you with the LearnAble course. You can ask me about:\n\n• Course content and navigation\n• How to use accessibility features\n• Captions, audio descriptions, and sign language\n• Offline packs and downloads\n• Certificates and verification\n\nYou can type your question or use the voice button to speak. ASL support is also available.",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(
    async (content: string): Promise<string | undefined> => {
      if (!content.trim()) return;

      const userMessage: Message = {
        role: "user",
        content: content.trim(),
        timestamp: new Date(),
      };

      const command = interpretGuideCommand(content, location.pathname);
      if (command.kind !== "chat") {
        setMessages((prev) => [...prev, userMessage, guideMessage(command.reply)]);
        if (command.kind === "navigate") navigate(command.path);
        if (command.kind === "back") navigate(-1);
        return command.reply;
      }

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const context = CourseKnowledgeBase.getContext(content);
        const response = await generateResponse(content, context);
        const assistantMessage: Message = {
          role: "assistant",
          content: response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
        return response;
      } catch (error) {
        console.error("Error generating response:", error);
        const errorText =
          "I apologize, but I encountered an error. Please try again or contact support if the problem persists.";
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: errorText,
            timestamp: new Date(),
          },
        ]);
        return errorText;
      } finally {
        setIsLoading(false);
      }
    },
    [location.pathname, navigate],
  );

  return {
    messages,
    sendMessage,
    isLoading,
  };
}

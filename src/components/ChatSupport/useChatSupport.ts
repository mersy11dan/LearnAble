import { useState, useCallback } from "react";
import { generateResponse } from "../../utils/gemini";
import { CourseKnowledgeBase } from "../../utils/courseKnowledge";

export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  hasASL?: boolean;
}

export function useChatSupport() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm here to help you with the LearnAble course. You can ask me about:\n\n• Course content and navigation\n• How to use accessibility features\n• Captions, audio descriptions, and sign language\n• Offline packs and downloads\n• Certificates and verification\n\nYou can type your question or use the voice button to speak. ASL support is also available.",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

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
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "I apologize, but I encountered an error. Please try again or contact support if the problem persists.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    messages,
    sendMessage,
    isLoading,
  };
}

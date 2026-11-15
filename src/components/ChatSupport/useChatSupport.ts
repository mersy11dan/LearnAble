import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { generateResponse } from "../../utils/gemini";
import { CourseKnowledgeBase } from "../../utils/courseKnowledge";
import { interpretGuideCommand } from "../../utils/voiceNavigation";

export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  source?: "gemini" | "saved" | "guide";
  model?: string;
  note?: string;
}

export const WELCOME =
  "I can take you around LearnAble. Tap the mic and speak a page — sessions, jobs, lesson, pack, or verify — or type it. Ask where you are if you get lost.";

function guideMessage(content: string): Message {
  return {
    role: "assistant",
    content,
    timestamp: new Date(),
    source: "guide",
    note: "Spoken guide. No model is running.",
  };
}

export function useChatSupport() {
  const navigate = useNavigate();
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: WELCOME,
      timestamp: new Date(),
      source: "saved",
      note: "A fixed greeting.",
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

      let history: { role: "user" | "assistant"; content: string }[] = [];
      setMessages((prev) => {
        history = prev
          .filter((line) => line.content !== WELCOME)
          .map((line) => ({ role: line.role, content: line.content }));
        return [...prev, userMessage];
      });
      setIsLoading(true);

      try {
        const context = CourseKnowledgeBase.getContext(content);
        const answer = await generateResponse(content, context, history);
        const assistantMessage: Message = {
          role: "assistant",
          content: answer.text,
          timestamp: new Date(),
          source: answer.source,
          model: answer.model,
          note: answer.note,
        };
        setMessages((prev) => [...prev, assistantMessage]);
        return assistantMessage.content;
      } catch (error) {
        console.error("Error generating response:", error);
        const errorText = "Something went wrong. Please try again.";
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: errorText,
            timestamp: new Date(),
            source: "saved",
            note: "An error message, not a model answer.",
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

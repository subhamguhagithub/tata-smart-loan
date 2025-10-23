import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  delay?: number;
}

const ChatBubble = ({ message, isUser, delay = 0 }: ChatBubbleProps) => {
  return (
    <div
      className={cn(
        "flex w-full mb-4 animate-fade-in",
        isUser ? "justify-end" : "justify-start"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-3 shadow-sm",
          isUser
            ? "bg-chat-user text-primary-foreground rounded-br-sm"
            : "bg-chat-bot text-foreground rounded-bl-sm border border-border"
        )}
      >
        <p className="text-sm md:text-base leading-relaxed">{message}</p>
      </div>
    </div>
  );
};

export default ChatBubble;


import { cn } from "@/lib/utils";
import { Message } from "ai";
import { useChat } from "ai/react";
import { Bot, Trash, XCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface AIChatBoxProps {
  open: boolean;
  onClose: () => void;
}

export default function AIChatBox({ open, onClose }: AIChatBoxProps) {
    
    const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat();

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const lastMessageIsUser = messages[messages.length - 1]?.role === "user";

  return (
    <div
      className={cn(
        `fixed bottom-4 left-1/2 transform -translate-x-1/2 sm:bottom-4 sm:left-4 sm:-translate-x-0 sm:translate-y-0 sm:transform-none z-10 mx-auto w-full max-w-[345px] sm:max-w-[500px] p-1`,
        open ? "fixed" : "hidden", 
      )}
    >
      <button onClick={onClose} className="mb-1 ms-auto block">
        <XCircle className="text-primary" size={30} />
      </button>
      <div className="flex h-[450px] sm:h-[600px] flex-col rounded-lg border bg-background shadow-xl">
        <div className="mt-3 h-full overflow-y-auto px-3" ref={scrollRef}>
          {messages.map((message) => (
            <ChatMessage message={message} key={message.id} />
          ))}
          {isLoading && lastMessageIsUser && (
            <ChatMessage
              message={{
                role: "assistant",
                content: "Thinking...",
              }}
            />
          )}
          {error && (
            <ChatMessage
              message={{
                role: "assistant",
                content: "Something went wrong. Please try again.",
              }}
            />
          )}
          {!error && messages.length === 0 && (
            <div className="flex h-full items-center justify-center gap-3 text-center">
              <Bot />
              Ask Any Question From The Listed Reports
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="m-3 flex gap-1 space-x-2">
          <Button
            title="Clear chat"
            variant="outline"
            size="icon"
            className="shrink-0"
            type="button"
            onClick={() => setMessages([])}
          >
            <Trash />
          </Button>
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask your Query..."
            ref={inputRef}
          />
          <Button type="submit" className="">Send</Button>
        </form>
      </div>
    </div>
  );
}

async function ChatMessage({
  message: { role, content },
}: {
  message: Pick<Message, "role" | "content">;
}) {

  const isAiMessage = role === "assistant";

  return (
    <div
      className={cn(
        "mb-3 flex items-center",
        isAiMessage ? "me-5 justify-start" : "ms-5 justify-end",
      )}
    >
      {isAiMessage && <Bot className="mr-2 shrink-0" />}
      <p
        className={cn(
          "whitespace-pre-line rounded-md border px-3 py-2",
          isAiMessage ? "bg-background" : "bg-primary text-primary-foreground",
        )}
      >
        {content}
      </p>
      
    </div>
  );
}
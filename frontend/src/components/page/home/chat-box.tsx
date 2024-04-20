"use client";

import MessageBubble from "@/components/common/message-bubble";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { socketEvents } from "@/lib/socket-events";
import { Message } from "@/types/chat-box";
import { socket } from "@/utils/socket";
import { SendHorizonal } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const msgRef = useRef<HTMLDivElement>(null);

  const scrollBottom = () => {
    msgRef.current?.scrollTo({ top: msgRef.current.scrollHeight });
  };

  useEffect(() => {
    socket.connect();

    socket.on(socketEvents.receiveMessage, (msg) => {
      setMessages([...messages, msg]);
    });
    scrollBottom();

    return () => {
      socket.disconnect();
      socket.off(socketEvents.receiveMessage);
    };
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message) {
      socket.emit(socketEvents.sendMessage, message);
      setMessages((prev) => [...prev, { message }]);
      setMessage("");
    }
  };
  return (
    <div className="bg-primary-foreground flex-grow flex flex-col">
      <div className="h-full p-5 space-y-3 overflow-y-auto" ref={msgRef}>
        {messages.map((message) => (
          <>
            {message.id ? (
              <MessageBubble
                message={message.message}
                className="ml-0 bg-zinc-200"
              />
            ) : (
              <MessageBubble message={message.message} className="text-white" />
            )}
          </>
        ))}
      </div>
      <form
        className="bg-white py-3 px-5 flex items-center gap-x-5 border-t-[1px]"
        onSubmit={sendMessage}>
        <Textarea
          className="bg-zinc-100 border-none resize-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDownCapture={(e) =>
            !e.shiftKey && e.key === "Enter" ? sendMessage(e) : ""
          }
        />
        <Button type="submit" variant={"ghost"} className="p-2 w-fit h-fit">
          <SendHorizonal className="size-5 text-teal-600" />
        </Button>
      </form>
    </div>
  );
};

export default ChatBox;

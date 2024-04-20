"use client";

import MessageBubble from "@/components/common/message-bubble";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { socketEvents } from "@/lib/socket-events";
import { socket } from "@/utils/socket";
import { SendHorizonal } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
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
      setMessages((prev) => [...prev, message]);
      setMessage("");
    }
  };
  return (
    <div className="bg-primary-foreground flex-grow flex flex-col">
      <div className="h-full p-5 space-y-3 overflow-y-auto" ref={msgRef}>
        {messages.map((m) => (
          <>
            {m.id ? (
              <MessageBubble message={m.message} className="ml-0 bg-zinc-200" />
            ) : (
              <MessageBubble message={m} />
            )}
          </>
        ))}
      </div>
      <form
        className="bg-white py-3 px-5 flex items-center gap-x-5 border-t-[1px]"
        onSubmit={sendMessage}>
        <Input
          className="bg-zinc-100 border-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant={"ghost"} className="p-2 w-fit h-fit">
          <SendHorizonal className="size-5 text-teal-600" />
        </Button>
      </form>
    </div>
  );
};

export default ChatBox;

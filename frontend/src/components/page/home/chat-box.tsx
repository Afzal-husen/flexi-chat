"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { socket } from "@/utils/socket";
import { SendHorizonal } from "lucide-react";
import { useEffect, useState } from "react";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  console.log({ messages });

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages([...messages, msg]);
    });
    return () => {
      socket.off("chat message");
    };
  }, [ messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message) {
      socket.connect();
      socket.emit("chat message", message);
    }
  };
  return (
    <div className="bg-primary-foreground flex-grow flex flex-col">
      <div className="h-full">chat history</div>
      <form
        className="bg-white py-3 px-5 flex items-center gap-x-5 border-t-[1px]"
        onSubmit={sendMessage}>
        <Input
          className="bg-zinc-100 border-none"
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

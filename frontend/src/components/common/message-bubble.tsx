import { cn } from "@/lib/utils";
import React from "react";

const MessageBubble = ({
  message,
  className,
}: {
  message: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "w-fit max-w-96 px-5 py-3 rounded-xl bg-teal-600 ml-auto",
        className,
      )}>
      <p className="break-words break-all">{message}</p>
    </div>
  );
};

export default MessageBubble;

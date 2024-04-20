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
        "w-fit px-5 py-3 rounded-xl bg-teal-200 ml-auto",
        className,
      )}>
      <p>{message}</p>
    </div>
  );
};

export default MessageBubble;

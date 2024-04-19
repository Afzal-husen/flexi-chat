import { Input } from "@/components/ui/input";
import React from "react";

const Messages = () => {
  return (
    <div className="bg-white  flex-initial w-[400px]">
      <h1 className="text-2xl font-semibold p-3">Messages</h1>
      <div className="px-5">
        <Input className="bg-zinc-100 border-none" placeholder="search" />
      </div>
    </div>
  );
};

export default Messages;

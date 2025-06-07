import SideMenu from "@/components/common/side-menu";
import ChatBox from "@/components/page/home/chat-box";
import Messages from "@/components/page/home/messages";
import { cookies } from "next/headers";
import React from "react";

const Page = () => {
  const token = cookies().get("session-token");
  return (
    <main className="flex h-screen divide-x-[1px]">
      <SideMenu />
      <Messages />
      <ChatBox token={token} />
    </main>
  );
};

export default Page;

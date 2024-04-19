import SideMenu from "@/components/common/side-menu";
import ChatBox from "@/components/page/home/chat-box";
import Messages from "@/components/page/home/messages";
import React from "react";

const Page = () => {
  return (
    <main className="flex h-screen divide-x-[1px]">
      <SideMenu />
      <Messages />
      <ChatBox />
    </main>
  );
};

export default Page;

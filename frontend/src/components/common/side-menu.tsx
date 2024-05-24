import { cn } from "@/lib/utils";
import {
  Globe,
  LogOut,
  MessageCircle,
  Music,
  Settings,
  Video,
} from "lucide-react";
import React from "react";

const SideMenu = () => {
  return (
    <div className="bg-primary-foreground flex-initial ">
      <ul className="p-2">
        <MenuIcon
          icon={<Globe className="size-5 text-main group-hover:text-white" />}
        />
        <MenuIcon
          icon={
            <MessageCircle className="size-5 text-main group-hover:text-white" />
          }
        />
        <MenuIcon
          icon={<Video className="size-5 text-main group-hover:text-white" />}
        />
        <MenuIcon
          icon={<Music className="size-5 text-main group-hover:text-white" />}
        />
        <MenuIcon
          className="hover:bg-white"
          icon={<Settings className="size-5 text-muted-foreground" />}
        />
        <MenuIcon
          className="hover:bg-white"
          icon={<LogOut className="size-5 text-muted-foreground" />}
        />
      </ul>
    </div>
  );
};

const MenuIcon = ({
  icon,
  className,
}: {
  icon: React.ReactNode;
  className?: string;
}) => {
  return (
    <li
      className={cn(
        "hover:bg-teal-600 w-fit p-3 rounded-xl group cursor-pointer",
        className,
      )}>
      {icon}
    </li>
  );
};

export default SideMenu;

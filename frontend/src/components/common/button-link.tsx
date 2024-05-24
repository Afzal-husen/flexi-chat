import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";

type ButtonLinkProps = {
  href: string;
  content: string;
};

const ButtonLink = ({ href, content }: ButtonLinkProps) => {
  return (
    <Link
      href={href}
      className={`${buttonVariants({
        variant: "ghost",
      })} absolute top-5 right-5 bg-accent hover:bg-main hover:text-accent transition-all ease-linear`}>
      {content}
    </Link>
  );
};

export default ButtonLink;

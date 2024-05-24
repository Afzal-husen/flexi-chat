"use client";

import { signUpWithGoogle } from "@/actions/auth";
import Icons from "@/components/common/icons";
import Spinner from "@/components/common/spinner";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth";
import React from "react";
import { useFormStatus } from "react-dom";

const GoogleSignup = () => {
  const { pending } = useFormStatus();
  return (
    <form
      action={async () => {
        await signUpWithGoogle();
      }}>
      <Button
        type="submit"
        className="bg-accent-foreground w-full flex items-center gap-x-5">
        {pending ? <Spinner /> : <Icons.GoogleIcon />}
        Signin with Google
      </Button>
    </form>
  );
};

export default GoogleSignup;

import { signIn } from "@/lib/auth";
import React from "react";

const GoogleSignup = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}>
      <button type="submit">Signin with Google</button>
    </form>
  );
};

export default GoogleSignup;

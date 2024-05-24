"use server";

import { signIn } from "@/lib/auth";

export const signUpWithGoogle = async () => {
  await signIn("google");
};

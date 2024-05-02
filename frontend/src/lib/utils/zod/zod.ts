import { object, string } from "zod";

export const signInSchema = object({
  email: string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email" }),
  password: string().min(6, {
    message: "Password must be atleast 6 characters",
  }),
});

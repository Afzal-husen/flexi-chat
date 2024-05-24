import { object, string } from "zod";

export const signInSchema = object({
  email: string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email" }),
  password: string().min(6, {
    message: "Password must be atleast 6 characters",
  }),
});

export const signUpSchema = object({
  username: string().min(3, {
    message: "Username must be atleast 3 characters",
  }),
  email: string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email" }),
  password: string().min(6, {
    message: "Password must be atleast 6 characters",
  }),
  cpassword: string().min(6, {
    message: "Password must be atleast 6 characters",
  }),
}).refine((value) => value.password === value.cpassword, {
  message: "Password does not match",
});

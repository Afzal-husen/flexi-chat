import { infer as zInfer } from "zod";
import { signInSchema, signUpSchema } from "../zod/zod";

export type SignUpType = zInfer<typeof signUpSchema>;
export type SignInType = zInfer<typeof signInSchema>;

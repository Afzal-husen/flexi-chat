import * as z from "zod";
import { userSignUpSchema } from "../lib/utils/zod.js";

export type userSignUp = z.infer<typeof userSignUpSchema>;

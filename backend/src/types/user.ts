import * as z from "zod";
import { userSignUpSchema } from "../lib/utils/zod.js";
import { Document, ObjectId } from "mongodb";

export type userSignUp = z.infer<typeof userSignUpSchema>;

export interface FilterQuery {
  _id?: ObjectId;
  email?: string;
  username?: string;
}

export interface User extends Document {
  _id?: ObjectId;
  email?: string;
  username?: string;
  password?: string;
  success?: boolean;
  message?: string;
}

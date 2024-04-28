import { NextFunction, Request, Response } from "express";
import { User } from "../types/user.js";
import { userCollection } from "../lib/db/collections/index.js";
import bcrypt from "bcryptjs";
import { BadRequestError } from "../lib/helpers/errors/bad-request-error.js";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response<{ success: boolean; message: string }> | void> => {
  try {
    const { username, email, password }: User = req.body;

    if (!username || !email || !password)
      return next(
        new BadRequestError({
          code: 400,
          message: "All fields are required",
          isLogging: true,
        }),
      );

    const userExist = await userCollection.findOne({ email, username });

    if (userExist)
      return next(
        new BadRequestError({
          code: 403,
          message: "Username or email is taken",
        }),
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    await userCollection.insertOne({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "User successfully created",
    });
  } catch (error) {
    next(error);
  }
};

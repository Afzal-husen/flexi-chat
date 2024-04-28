import { NextFunction, Request, Response } from "express";
import { userCollection } from "../lib/db/collections/index.js";
import bcrypt from "bcryptjs";
import { RequestError } from "../lib/helpers/errors/request-error.js";
import { userSignUpSchema } from "../lib/utils/zod.js";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response<{ success: boolean; message: string }> | void> => {
  try {
    const parsedBody = userSignUpSchema.safeParse(req.body);

    if (!parsedBody.success) {
      const message = parsedBody.error.errors.find(
        (err) => err.message,
      )?.message;
      return next(new RequestError({ code: 400, message }));
    }

    const { email, password, username } = parsedBody.data;

    const userExist = await userCollection.findOne({ email, username });

    if (userExist)
      return next(
        new RequestError({
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

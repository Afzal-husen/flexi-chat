import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { RequestError } from "../../lib/helpers/errors/request-error.js";
import { userSignUpSchema } from "../../lib/utils/zod.js";
import { findOneUser, insertIntoUser } from "../../lib/db/queries/user.js";
import jwt from "jsonwebtoken";

export const signUp = async (
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

    const user = await findOneUser({ email, username });

    if (user)
      return next(
        new RequestError({
          code: 403,
          message: "Username or email is taken",
        }),
      );

    const hashedPassword = await bcrypt.hash(password, 10);
    const userCreated = await insertIntoUser({
      username,
      email,
      password: hashedPassword,
    });

    if (!userCreated.success)
      return next(
        new RequestError({ code: 500, message: userCreated.message }),
      );

    const token = jwt.sign(
      { userId: userCreated.user?._id },
      process.env.SESSION_SECRET,
      {
        expiresIn: "1d",
      },
    );

    return res
      .cookie("session-token", token, { maxAge: 1000 * 60 * 60 * 24 })
      .status(200)
      .json({
        success: true,
        message: "Signup successfull",
      });
  } catch (error) {
    next(error);
  }
};

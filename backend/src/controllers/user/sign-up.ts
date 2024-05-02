import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { RequestError } from "../../lib/helpers/errors/request-error.js";
import { userSignUpSchema } from "../../lib/utils/zod.js";
import { findOneUser, insertIntoUser } from "../../lib/db/queries/user.js";

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

    return res.status(200).json({
      success: true,
      message: "User successfully created",
    });
  } catch (error) {
    next(error);
  }
};

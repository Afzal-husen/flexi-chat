import { Request, Response, NextFunction } from "express";
import { userSignInSchema } from "../../lib/utils/zod.js";
import { RequestError } from "../../lib/helpers/errors/request-error.js";
import bcrypt from "bcryptjs";
import { findOneUser } from "../../lib/db/queries/user.js";

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response<{ success: boolean; message: string }> | void> => {
  try {
    const parsedBody = userSignInSchema.safeParse(req.body);

    if (!parsedBody.success) {
      const message = parsedBody.error.errors.find(
        (err) => err.message,
      )?.message;
      return next(new RequestError({ code: 400, message }));
    }

    const { email, password } = parsedBody.data;

    const user = await findOneUser({ email });

    if (!user) {
      return next(
        new RequestError({
          code: 404,
          message: `User with email: ${email} does not exist`,
        }),
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password!);

    if (!isPasswordCorrect)
      return next(
        new RequestError({ code: 401, message: "Password is incorrect" }),
      );

    return res.status(200).json({
      success: true,
      message: "User login successfull",
    });
  } catch (error) {
    next(error);
  }
};

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies["session-token"];

    console.log({ token });

    const decodedToken = jwt.verify(token, process.env.SESSION_SECRET);

    const { userId } = decodedToken as { userId: string };

    req.body.userId = userId;

    next();
  } catch (error) {
    next(error);
  }
};

export { authenticate };

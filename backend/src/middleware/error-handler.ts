import { Request, Response, NextFunction } from "express";
import { CustomError } from "../lib/helpers/errors/custom-error.js";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): Response<any> => {
  let statusCode = 500;
  let message = err.message || "Something went wrong";
  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
};

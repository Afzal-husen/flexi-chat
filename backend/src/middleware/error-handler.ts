import { ErrorRequestHandler } from "express";
import { CustomError } from "../lib/helpers/errors/custom-error.js";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = err.message || "Something went wrong";
  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
};

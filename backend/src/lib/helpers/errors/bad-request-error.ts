import { CustomError } from "./custom-error.js";

interface ParamTypes {
  code?: number;
  isLogging?: boolean;
  message?: string;
}

export class BadRequestError extends CustomError {
  statusCode!: number;
  isLogging!: boolean;
  private static readonly _statusCode = 400;
  constructor(params?: ParamTypes) {
    super(params?.message || "Bad Request");

    this.statusCode = params?.code || BadRequestError._statusCode;
    this.isLogging = params?.isLogging || false;

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

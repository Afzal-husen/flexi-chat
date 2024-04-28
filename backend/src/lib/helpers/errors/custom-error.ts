export abstract class CustomError extends Error {
  abstract readonly statusCode: number;
  abstract readonly isLogging: boolean;
  constructor(message: string) {
    super(message);

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

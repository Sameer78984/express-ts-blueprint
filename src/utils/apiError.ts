import { StatusCode } from "../constants/httpStatus";

export class ApiError extends Error {
  statusCode: StatusCode;
  isOperational: boolean;
  override stack?: string;

  constructor(statusCode: StatusCode, message: string, isOperational = true, stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

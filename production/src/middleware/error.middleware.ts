import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";
import { logger } from "../utils/logger";
import { StatusCodes } from "../constants/httpStatus";
import { env } from "../config/env";

/**
 * Global Error Handler Middleware
 *
 * This function intercepts all errors thrown in the application.
 * It ensures a consistent JSON error response structure.
 *
 * @param err - The error object
 * @param req - The Express request object
 * @param res - The Express response object
 * @param _next - The next middleware function (unused but required for Express error handlers)
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode =
      error instanceof ApiError ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || "Internal Server Error";
    error = new ApiError(statusCode, message, false, err.stack);
  }

  const { statusCode, message, isOperational, stack } = error as ApiError;

  if (!isOperational) {
    logger.error(`[${req.method}] ${req.path} - ${statusCode} - ${message}`);
  }

  const response = {
    code: statusCode,
    message,
    ...(env.NODE_ENV === "development" && { stack }),
  };

  res.status(statusCode).json(response);
};

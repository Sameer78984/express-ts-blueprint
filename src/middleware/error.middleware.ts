import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError';
import { logger } from '../utils/logger';
import { StatusCodes } from '../constants/httpStatus';
import { env } from '../config/env';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode =
      error instanceof ApiError ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || 'Internal Server Error';
    error = new ApiError(statusCode, message, false, err.stack);
  }

  const { statusCode, message, isOperational, stack } = error as ApiError;

  if (!isOperational) {
    logger.error(`[${req.method}] ${req.path} - ${statusCode} - ${message}`);
  }

  const response = {
    code: statusCode,
    message,
    ...(env.NODE_ENV === 'development' && { stack }),
  };

  res.status(statusCode).json(response);
};

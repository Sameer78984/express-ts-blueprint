import { Response } from "express";

/**
 * 📤 Standard API Response
 * Why? It's good practice to send responses in the same format every time.
 * This helper makes it easy to send consistent success messages.
 */
export const sendResponse = (res: Response, statusCode: number, message: string, data?: any) => {
  res.status(statusCode).json({
    success: statusCode >= 200 && statusCode < 300,
    message,
    data,
  });
};

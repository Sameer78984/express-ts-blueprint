import { Request, Response, NextFunction } from "express";

/**
 * Global Error Handler
 * This function catches any errors passed to next(error) in our controllers.
 * It prevents the server from crashing and sends a nice JSON response to the user.
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("❌ Error caught:", err.message);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

import { Request, Response, NextFunction } from "express";

/**
 * A Controller handles the logic for a specific Route.
 * It takes the Request (req), does something, and sends a Response (res).
 */
export const getHealth = (req: Request, res: Response, next: NextFunction) => {
  try {
    // We simply return a JSON object saying the server is working
    res.status(200).json({
      status: "ok",
      message: "Server is healthy!",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    // If something goes wrong, pass the error to the global error handler
    next(error);
  }
};

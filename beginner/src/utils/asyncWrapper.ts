import { Request, Response, NextFunction } from "express";

/**
 * 🛡️ Async Wrapper
 * Why? Writing "try-catch" in every controller is repetitive.
 * This function wraps your logic and automatically catches errors!
 * 
 * Instead of:
 * try { ... } catch (error) { next(error) }
 * 
 * You just write:
 * ... your logic ...
 */
export const asyncWrapper = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // If the function fails, .catch() passes the error to the global Error Handler
    fn(req, res, next).catch(next);
  };
};

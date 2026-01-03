import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";
import { StatusCodes } from "../constants/httpStatus";

/**
 * 🕵️‍♂️ VALIDATION MIDDLEWARE
 * ----------------------------
 * This function serves as a gatekeeper. It checks if the request data matches the rules (schema).
 *
 * @param schema - The Zod rules (e.g. "email is required")
 *
 * <T> stands for "Type". It means this function works with ANY Zod schema,
 * whether it's checking for a User, a Product, or a Post. It's flexible!
 */
export const validateRequest =
  <T>(schema: ZodType<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1. Check if the Body, Query, or Params match the rules
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      // 2. If valid, let the request pass to the next stop (the Controller)
      next();
    } catch (error) {
      // 3. If invalid, stop here and return an error
      if (error instanceof ZodError) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: "Validation failed",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          errors: (error as any).errors, // List of what went wrong
        });
      } else {
        next(error);
      }
    }
  };

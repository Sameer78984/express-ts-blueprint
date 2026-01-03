import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { StatusCodes } from "../../constants/httpStatus";
import { generateTokenAndSetCookie, clearTokenCookie } from "../../utils/jwt.utils";
import * as authService from "./auth.service";
import { SignupInput, LoginInput } from "./auth.schema";

/**
 * Handles user registration.
 *
 * @param req - Express request (body contains SignupInput)
 * @param res - Express response
 */
export const signup = asyncHandler(
  async (
    req: Request<Record<string, unknown>, Record<string, unknown>, SignupInput>,
    res: Response,
  ) => {
    const user = await authService.signup(req.body);
    const token = generateTokenAndSetCookie(res, user._id, user.email);

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "User registered successfully",
      token,
      data: user,
    });
  },
);

/**
 * Handles user login.
 *
 * @param req - Express request (body contains LoginInput)
 * @param res - Express response
 */
export const login = asyncHandler(
  async (
    req: Request<Record<string, unknown>, Record<string, unknown>, LoginInput>,
    res: Response,
  ) => {
    const user = await authService.login(req.body);
    const token = generateTokenAndSetCookie(res, user._id, user.email);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Login successful",
      token,
      data: user,
    });
  },
);

/**
 * Handles user logout.
 * Clears the HttpOnly cookie.
 */
export const logout = asyncHandler(async (req: Request, res: Response) => {
  clearTokenCookie(res);
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Logged out successfully",
  });
});

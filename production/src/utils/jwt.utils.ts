import jwt from "jsonwebtoken";
import { Response } from "express";

// Generate a JSON Web Token (JWT) and set it as a HTTPOnly cookie
export const generateTokenAndSetCookie = (
  res: Response,
  userId: unknown,
  email: string,
): string => {
  const payload = { userId, email };

  // Use a fallback secret if env.JWT_SECRET is somehow undefined (though env validaton should catch it)
  // Assuming env.JWT_SECRET exists in your env config, otherwise standard process.env
  const secret = process.env.JWT_SECRET || "default_secret_change_me";

  const token = jwt.sign(payload, secret, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};

export const clearTokenCookie = (res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};

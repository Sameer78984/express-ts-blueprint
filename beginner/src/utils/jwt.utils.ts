import jwt from "jsonwebtoken";
import { Response } from "express";

// In a real app, always use process.env.JWT_SECRET!
const JWT_SECRET = process.env.JWT_SECRET || "my_super_secret_key_123";

// Generate a JSON Web Token (JWT) and set it as a HTTPOnly cookie
// A token is like a digital ID card. We give it to the user after they log in.
export const generateTokenAndSetCookie = (res: Response, userId: any, email: string): string => {
  const payload = { userId, email };
  
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d", // Token expires in 7 days
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};

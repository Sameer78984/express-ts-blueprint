import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "my_super_secret_key_123";

// Extend Express Request to include 'user' (TypeScript magic)
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1. Get Token from Header (Format: "Bearer <token>")
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ success: false, message: "No token provided" });
      return;
    }

    const token = authHeader.split(" ")[1];

    // 2. Verify Token
    const decoded = jwt.verify(token, JWT_SECRET);

    // 3. Attach User Info to Request
    req.user = decoded;

    next(); // Proceed to the protected route

  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

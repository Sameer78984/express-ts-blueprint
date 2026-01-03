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
    let token;

    // 1. Get Token from Header (Format: "Bearer <token>") OR Cookie
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      res.status(401).json({ success: false, message: "Not authorized to access this route" });
      return;
    }

    // 2. Verify Token
    const decoded = jwt.verify(token, JWT_SECRET);

    // 3. Attach User Info to Request
    req.user = decoded;

    next(); // Proceed to the protected route

  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

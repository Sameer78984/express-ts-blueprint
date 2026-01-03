import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { User } from "./auth.model";
import { generateTokenAndSetCookie } from "../../utils/jwt.utils";
import { validationResult } from "express-validator";

// --- REGISTER ---
// This function handles user registration.
// It receives email and password, checks if they are valid, hashes the password, and creates a user.
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // 1. Validation
    // validationResult collects any errors from the checks we defined in the routes.
    // If there are errors (like invalid email), we stop here and tell the user.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
      return;
    }

    // 2. Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ success: false, message: "Email already exists" });
      return;
    }

    // 3. Hash Password (Security!)
    // SECURITY CRITICAL: Never save plain text passwords in the database!
    // bcrypt "hashes" the password. Hash is like mixing ingredients; you can't get the original ingredients back.
    // "10" is the salt rounds. Higher number = more secure but slower. 10 is a good balance.
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create User
    const newUser = await User.create({
      email,
      password: hashedPassword
    });

    // 5. Generate Token & Auto-Login
    const token = generateTokenAndSetCookie(res, newUser._id, newUser.email);

    // 6. Response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      userId: newUser._id,
      token
    });

  } catch (error) {
    next(error);
  }
};

// --- LOGIN ---
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // 1. Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       res.status(400).json({ success: false, errors: errors.array() });
       return;
    }

    // 2. Find User
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    // 3. Compare Password (Input vs Hashed DB Password)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    // 4. Generate Token (JWT)
    // A JWT (JSON Web Token) is a digital pass. The user shows this pass to access protected routes.
    const token = generateTokenAndSetCookie(res, user._id, user.email);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token
    });

  } catch (error) {
    next(error);
  }
};

// --- LOGOUT ---
export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Clear cookie if utilized by the client
    res.clearCookie("token");

    res.status(200).json({ 
      success: true, 
      message: "Logged out successfully" 
    });
  } catch (error) {
    next(error);
  }
};

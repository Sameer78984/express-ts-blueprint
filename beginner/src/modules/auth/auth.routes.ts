import { Router } from "express";
import { register, login, logout } from "./auth.controller";
import { body } from "express-validator";

const router = Router();

// POST /api/auth/register
// 'body(...)' starts a validation chain. express-validator will check these rules.
// If validation fails, the 'errors' object in the controller will catch it.
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  ],
  register
);

// POST /api/auth/login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").exists().withMessage("Password is required"),
  ],
  login
);

// POST /api/auth/logout
router.post("/logout", logout);

export default router;

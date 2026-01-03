import { Router } from "express";
import { validateRequest } from "../../middleware/validate.middleware";
import { signupSchema, loginSchema } from "./auth.schema";
import * as authController from "./auth.controller";

const router = Router();

/**
 * POST /api/auth/signup
 * Registers a new user.
 */
router.post("/signup", validateRequest(signupSchema), authController.signup);

/**
 * POST /api/auth/login
 * Authenticates a user and sets a session cookie.
 */
router.post("/login", validateRequest(loginSchema), authController.login);

/**
 * POST /api/auth/logout
 * Clears the session cookie.
 */
router.post("/logout", authController.logout);

export default router;

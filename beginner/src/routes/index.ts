import { Router } from "express";
import healthRoutes from "./modules/health/health.routes";
import authRoutes from "./modules/auth/auth.routes";
import { protect } from "./middleware/auth.middleware";

const router = Router();

// --- Public Routes ---
router.use("/auth", authRoutes); // Register / Login

// --- Protected Routes (Require Token) ---
// Example: You must be logged in to check health (just as a demo)
router.use("/health", protect, healthRoutes);

export default router;

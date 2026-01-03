import { Router } from "express";
import { getHealth } from "../controllers/health.controller";
import { createDemo, getAllDemos } from "../controllers/demo.controller";

const router = Router();

// --- Health Check ---
router.get("/health", getHealth);

// --- Demo Routes ---
// GET /api/demos -> Get all
router.get("/demos", getAllDemos);

// POST /api/demos -> Create new
router.post("/demos", createDemo);

export default router;

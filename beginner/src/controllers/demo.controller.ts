import { Request, Response, NextFunction } from "express";
import { Demo } from "../models/demo.model";
import { asyncWrapper } from "../utils/asyncWrapper";
import { sendResponse } from "../utils/apiResponse";
import { logger } from "../utils/logger";

// --- CREATE ---
export const createDemo = asyncWrapper(async (req: Request, res: Response) => {
  const { title, description } = req.body;

  // Simple Validation
  if (!title) {
    // We can still manually return errors if needed
    // OR throw new Error("Title is required") if we handled it in error middleware
    return sendResponse(res, 400, "Title is required");
  }

  const newDemo = await Demo.create({ title, description });
  
  logger.info(`New demo created: ${title}`);
  sendResponse(res, 201, "Demo created successfully", newDemo);
});

// --- READ ALL ---
export const getAllDemos = asyncWrapper(async (req: Request, res: Response) => {
  const demos = await Demo.find().sort({ createdAt: -1 });
  
  sendResponse(res, 200, "Demos fetched successfully", demos);
});

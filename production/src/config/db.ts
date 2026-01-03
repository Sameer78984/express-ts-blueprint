import mongoose from "mongoose";
import { env } from "./env";
import { logger } from "../utils/logger";

/**
 * Establishes a connection to the MongoDB database.
 *
 * This function handles the connection logic and exits the process
 * if the connection fails, ensuring the app doesn't start in a broken state.
 *
 * @returns {Promise<void>} Resolves when connected
 */
export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGO_URI);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("Could not connect to MongoDB", error);
    process.exit(1);
  }
};

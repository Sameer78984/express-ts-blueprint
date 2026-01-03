import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/routes";
import { errorHandler } from "./middleware/error.middleware";

// 1. Create the Express app
const app = express();

// 2. Middleware (Helpers that run before your routes)
app.use(express.json()); // Allows us to read JSON data sent from frontend
app.use(cookieParser()); // Parse cookies
app.use(cors());         // Allows frontend (React/Vue) to talk to us

// 3. Register our Routes (URLs like /api/health)
app.use("/api", router);

// 4. Global Error Handler (Must be last!)
app.use(errorHandler);

export default app;

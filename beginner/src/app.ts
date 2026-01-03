import express, { Request, Response } from "express";
import cors from "cors";
import router from "./routes/routes";
import { errorHandler } from "./middleware/error.middleware";

// 1. Create the Express app
const app = express();

// 2. Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS for frontend communication

// 3. Register our Routes
app.use("/api", router);

// 4. Global Error Handler (Must be last!)
app.use(errorHandler);

export default app;

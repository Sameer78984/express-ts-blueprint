import express from "express";
import { configureSecurityMiddleware } from "./middleware/security.middleware";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error.middleware";
import { StatusCodes } from "./constants/httpStatus";
import { ApiError } from "./utils/apiError";
import authRoutes from "./modules/auth/auth.route";

const app = express();

// ====================================================================
// 1. GLOBAL MIDDLEWARE
// ====================================================================
// Parse JSON request bodies (limit size to prevent DoS)
app.use(express.json({ limit: "10kb" }));
// Parse URL-encoded data
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Apply Security Middleware (Helmet, CORS, Rate Limiting)
configureSecurityMiddleware(app);

// ====================================================================
// 2. ROUTES
// ====================================================================

// Health Check Endpoint (useful for Load Balancers)
app.get("/health", (req: express.Request, res: express.Response) => {
  res.status(StatusCodes.OK).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Feature Routes
app.use("/api/auth", authRoutes);

// ====================================================================
// 3. ERROR HANDLING
// ====================================================================

// Handle 404 - Resource Not Found
app.use((req, res, next) => {
  next(new ApiError(StatusCodes.NOT_FOUND, `Not Found - ${req.originalUrl}`));
});

// Global Error Handler (Must be the last middleware)
app.use(errorHandler);

export default app;

import { Express } from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { env } from "../config/env";

/**
 * Configures global security middleware.
 *
 * Applies:
 * - Helmet (Secure Headers)
 * - CORS (Cross-Origin Resource Sharing)
 * - Rate Limiting (DoS Protection)
 *
 * @param app - The Express application instance
 */
export const configureSecurityMiddleware = (app: Express): void => {
  // Helmet for secure HTTP headers
  app.use(helmet());

  // CORS configuration
  const corsOptions = {
    origin: env.CORS_ORIGIN === "*" ? "*" : env.CORS_ORIGIN.split(","),
    credentials: true,
  };
  app.use(cors(corsOptions));

  // Rate Limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: "Too many requests from this IP, please try again after 15 minutes",
  });
  app.use(limiter);
};

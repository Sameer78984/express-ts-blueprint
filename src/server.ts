import { app } from "./app";
import { env } from "./config/env";
import { connectDB } from "./config/db";
import { logger } from "./utils/logger";

const startServer = async () => {
  try {
    // 1. Connect to Database (Fail fast if no DB)
    await connectDB();

    // 2. Start Express Server
    const server = app.listen(env.PORT, () => {
      logger.info(`🚀 Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
    });

    // 3. Graceful Shutdown Logic
    // This ensures we close database connections and finish processing requests
    // before the process exits.
    const gracefulShutdown = () => {
      logger.info("Received kill signal, shutting down gracefully...");
      server.close(() => {
        logger.info("Closed out remaining connections.");
        process.exit(0);
      });

      // Force close after 10s if connections hang
      setTimeout(() => {
        logger.error("Could not close connections in time, forcefully shutting down");
        process.exit(1);
      }, 10000);
    };

    // Listen for termination signals (e.g., Ctrl+C, Docker stop)
    process.on("SIGTERM", gracefulShutdown);
    process.on("SIGINT", gracefulShutdown);
  } catch (error) {
    logger.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();

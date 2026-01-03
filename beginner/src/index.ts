import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./config/db";

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 3000;

// Connect to Database first, then start server
connectDB().then(() => {
  // Turn on the server!
  app.listen(PORT, () => {
    console.log(`
    🚀 Server is running!
    ---------------------
    📡 URL: http://localhost:${PORT}
    🏥 Health: http://localhost:${PORT}/api/health
    `);
  });
});

import configDotenv from "dotenv";
import app from "./app";
import { connectDB } from "./config/db";

// Load environment variables from .env file
configDotenv.config();

const PORT = process.env.PORT || 3000;

// Connect to Database first, then start server
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log("Try visiting: http://localhost:3000/api/health");
});

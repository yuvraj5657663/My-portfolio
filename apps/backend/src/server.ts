import express from "express";
import path from "path";
import dotenv from "dotenv";
import { apiApp } from "./app.js";
import { connectDB } from "./config/db.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const envPaths = [
  path.join(process.cwd(), "..", "..", "environments", ".env.development"),
  path.join(process.cwd(), "environments", ".env.development")
];

for (const envPath of envPaths) {
  dotenv.config({ path: envPath });
  if (process.env.MONGODB_URI) break;
}

async function startServer() {
  const PORT = process.env.PORT || 5000;

  // Connect to Database
  await connectDB();

  // Start API server
  apiApp.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`Backend Server running on http://localhost:${PORT}`);
  });
}

startServer();

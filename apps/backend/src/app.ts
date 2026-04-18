import express from "express";
import cors from "cors";
import helmet from "helmet";

import routes from "./api/routes/index.js";
import { errorHandler } from "./middleware/error.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    process.env.FRONTEND_URL || "https://yourfrontend.vercel.app"
  ],
  credentials: true
}));

app.use(helmet());
app.use(express.json());

app.use("/api", routes);

// Global error handler — must be registered after all routes
app.use(errorHandler);

export default app;

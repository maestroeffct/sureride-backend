import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes/routes";
import { health } from "./health";

const app = express();

/**
 * CORS CONFIG
 */
app.use(
  cors({
    origin: [
      "http://localhost:3000", // local admin dashboard
      "https://sureride-dashboard.vercel.app", // production dashboard (example)
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(helmet());
app.use(express.json());

app.get("/health", health);
app.use("/api", routes);

// jmn

export default app;

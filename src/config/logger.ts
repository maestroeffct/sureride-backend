import pino from "pino";
import { env } from "./env";

export const logger = pino({
  level: env.LOG_LEVEL ?? (env.NODE_ENV === "production" ? "info" : "debug"),
  redact: ["req.headers.authorization", "headers.authorization", "password"],
});

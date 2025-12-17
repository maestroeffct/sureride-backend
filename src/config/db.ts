import PrismaClient from "@prisma/client";
import { logger } from "./logger";

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

export const prisma: PrismaClient =
  global.__prisma ??
  new PrismaClient({
    datasources: {
      db: { url: env.DATABASE_URL },
    },
    log: env.NODE_ENV === "production" ? ["error"] : ["query", "warn", "error"],
  });

if (env.NODE_ENV !== "production") global.__prisma = prisma;

export async function connectDB() {
  await prisma.$connect();
  logger.info("✅ Database connected");
}

export async function disconnectDB() {
  await prisma.$disconnect();
  logger.info("🛑 Database disconnected");
}

import { prisma } from "../../config/db";

export function createPermission(key: string, description?: string) {
  return prisma.permission.create({
    data: { key, description },
  });
}

export function listPermissions() {
  return prisma.permission.findMany();
}

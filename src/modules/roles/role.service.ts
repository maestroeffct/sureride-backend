import { prisma } from "../../config/db";

export function createRole(name: string, description?: string) {
  return prisma.role.create({
    data: { name, description },
  });
}

export function listRoles() {
  return prisma.role.findMany({
    include: {
      permissions: {
        include: { permission: true },
      },
    },
  });
}

export function assignPermission(roleId: string, permissionId: string) {
  return prisma.rolePermission.create({
    data: { roleId, permissionId },
  });
}

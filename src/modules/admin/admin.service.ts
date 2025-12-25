import { prisma } from "../../config/db";
import bcrypt from "bcrypt";

export async function createAdmin(
  email: string,
  password: string,
  roleId: string
) {
  const hash = await bcrypt.hash(password, 10);

  return prisma.admin.create({
    data: {
      email,
      password: hash,
      roleId,
    },
  });
}

export async function listAdmins() {
  return prisma.admin.findMany({
    include: { role: true },
  });
}

export async function updateAdminRole(adminId: string, roleId: string) {
  return prisma.admin.update({
    where: { id: adminId },
    data: { roleId },
  });
}

export async function deleteAdmin(adminId: string) {
  return prisma.admin.delete({ where: { id: adminId } });
}

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/db";
import { env } from "../../config/env";

export async function loginAdmin(email: string, password: string) {
  const admin = await prisma.admin.findUnique({
    where: { email },
  });

  if (!admin || !admin.password) {
    throw new Error("Invalid credentials");
  }

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ adminId: admin.id }, env.JWT_SECRET, {
    expiresIn: "12h",
  });

  return {
    token,
    admin: {
      id: admin.id,
      email: admin.email,
    },
  };
}

export async function getAdminProfile(adminId: string) {
  const admin = await prisma.admin.findUnique({
    where: { id: adminId },
    include: {
      role: {
        include: {
          permissions: {
            include: { permission: true },
          },
        },
      },
    },
  });

  if (!admin || !admin.role) {
    throw new Error("Admin not found");
  }

  return {
    id: admin.id,
    email: admin.email,
    role: admin.role.name,
    permissions: admin.role.permissions.map((rp) => rp.permission.key),
    createdAt: admin.createdAt,
  };
}

export function refreshAdminToken(adminId: string) {
  return jwt.sign({ adminId }, env.JWT_SECRET, { expiresIn: "1h" });
}

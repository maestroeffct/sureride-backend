import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { prisma } from "../../config/db";
import { env } from "../../config/env";

export async function loginAdmin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin || !admin.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ adminId: admin.id }, env.JWT_SECRET, {
      expiresIn: "12h",
    });

    return res.json({
      token,
      admin: {
        id: admin.id,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getAdminProfile(req: Request, res: Response) {
  const adminId = req.admin!.id;

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
    return res.status(404).json({ message: "Admin not found" });
  }

  return res.json({
    admin: {
      id: admin.id,
      email: admin.email,
      role: admin.role.name,
      permissions: admin.role.permissions.map((rp) => rp.permission.key),
      createdAt: admin.createdAt,
    },
  });
}

export function refreshAdminToken(req: Request, res: Response) {
  const token = jwt.sign({ adminId: req.admin!.id }, env.JWT_SECRET, {
    expiresIn: "12h",
  });

  return res.json({ token });
}

export function logoutAdmin(_req: Request, res: Response) {
  return res.json({
    success: true,
    message: "Logged out successfully",
  });
}

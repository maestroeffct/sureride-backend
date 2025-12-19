import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../config/db";
import { env } from "../config/env";

export async function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      adminId: string;
    };

    const admin = await prisma.admin.findUnique({
      where: { id: decoded.adminId },
      include: {
        role: {
          include: {
            permissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });

    if (!admin || !admin.role) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.admin = {
      id: admin.id,
      email: admin.email,
      role: admin.role.name,
      permissions: admin.role.permissions.map((rp) => rp.permission.key),
    };

    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

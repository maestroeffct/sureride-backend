import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { prisma } from "../../config/db";
import { env } from "../../config/env";

export async function loginAdmin(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      adminId: admin.id,
      role: admin.role,
    },
    env.JWT_SECRET,
    { expiresIn: "12h" }
  );

  return res.json({
    token,
    admin: {
      id: admin.id,
      email: admin.email,
      role: admin.role,
    },
  });
}

import { Request, Response, NextFunction } from "express";
import { AdminRole } from "@prisma/client";

export function requireRole(...allowedRoles: AdminRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.admin) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!allowedRoles.includes(req.admin.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
}

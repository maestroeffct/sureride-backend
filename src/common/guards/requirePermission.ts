import { Request, Response, NextFunction } from "express";

export function requirePermission(permission: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const admin = req.admin;

    if (!admin) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!admin.permissions.includes(permission)) {
      return res.status(403).json({
        message: "Forbidden: insufficient permissions",
      });
    }

    next();
  };
}

export function requireAnyPermission(permissions: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const admin = req.admin;

    if (!admin) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const hasPermission = permissions.some((p) =>
      admin.permissions.includes(p)
    );

    if (!hasPermission) {
      return res.status(403).json({
        message: "Forbidden: insufficient permissions",
      });
    }

    next();
  };
}

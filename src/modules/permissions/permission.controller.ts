import { Request, Response } from "express";
import * as PermissionService from "./permission.service";

export async function createPermission(req: Request, res: Response) {
  const { key, description } = req.body;

  if (!key) {
    return res.status(400).json({ message: "Permission key is required" });
  }

  const permission = await PermissionService.createPermission(key, description);
  return res.json(permission);
}

export async function listPermissions(_req: Request, res: Response) {
  const permissions = await PermissionService.listPermissions();
  return res.json(permissions);
}

import { Request, Response } from "express";
import * as RoleService from "./role.service";

export async function createRole(req: Request, res: Response) {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Role name is required" });
  }

  const role = await RoleService.createRole(name, description);
  return res.json(role);
}

export async function listRoles(_req: Request, res: Response) {
  const roles = await RoleService.listRoles();
  return res.json(roles);
}

export async function assignPermissionToRole(req: Request, res: Response) {
  const { roleId } = req.params;
  const { permissionId } = req.body;

  if (!permissionId) {
    return res.status(400).json({ message: "permissionId is required" });
  }

  const result = await RoleService.assignPermission(roleId, permissionId);
  return res.json(result);
}

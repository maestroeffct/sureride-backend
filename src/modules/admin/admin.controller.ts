import { Request, Response } from "express";
import * as AdminService from "./admin.service";

export async function createAdmin(req: Request, res: Response) {
  const { email, password, roleId } = req.body;
  const admin = await AdminService.createAdmin(email, password, roleId);
  res.json(admin);
}

export async function listAdmins(req: Request, res: Response) {
  const admins = await AdminService.listAdmins();
  res.json(admins);
}

export async function updateAdminRole(req: Request, res: Response) {
  const { adminId } = req.params;
  const { roleId } = req.body;

  const updated = await AdminService.updateAdminRole(adminId, roleId);
  res.json(updated);
}

export async function deleteAdmin(req: Request, res: Response) {
  await AdminService.deleteAdmin(req.params.adminId);
  res.json({ success: true });
}

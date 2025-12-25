import { Request, Response } from "express";
import * as AuthService from "./auth.service";

export async function loginAdmin(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    const data = await AuthService.loginAdmin(email, password);
    return res.json(data);
  } catch (error: any) {
    return res.status(401).json({ message: error.message });
  }
}

export async function getAdminProfile(req: Request, res: Response) {
  try {
    const admin = await AuthService.getAdminProfile(req.admin!.id);
    return res.json({ admin });
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
}

export function refreshAdminToken(req: Request, res: Response) {
  const token = AuthService.refreshAdminToken(req.admin!.id);
  return res.json({ token });
}

export function logoutAdmin(_req: Request, res: Response) {
  return res.json({ success: true, message: "Logged out successfully" });
}

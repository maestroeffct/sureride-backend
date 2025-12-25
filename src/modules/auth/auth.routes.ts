import { Router } from "express";
import {
  loginAdmin,
  getAdminProfile,
  refreshAdminToken,
  logoutAdmin,
} from "./auth.controller";
import { requireAdmin } from "../../common/guards/requireAdmin";

const router = Router();

router.post("/login", loginAdmin);
router.get("/me", requireAdmin, getAdminProfile);
router.post("/refresh", requireAdmin, refreshAdminToken);
router.post("/logout", requireAdmin, logoutAdmin);

export default router;

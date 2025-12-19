import { Router } from "express";
import {
  getAdminProfile,
  loginAdmin,
  logoutAdmin,
  refreshAdminToken,
} from "./auth.controller";
import { requireAdmin } from "../../middlewares/requireAdmin";

const router = Router();

router.post("/login", loginAdmin);
router.get("/me", requireAdmin, getAdminProfile);
router.post("/refresh", requireAdmin, refreshAdminToken);
router.post("/logout", requireAdmin, logoutAdmin);

export default router;

import { Router } from "express";
import {
  getAdminProfile,
  loginAdmin,
  refreshAdminToken,
} from "./auth.controller";
import { requireAdmin } from "../../middlewares/requireAdmin";

const router = Router();

router.post("/login", loginAdmin);
router.get("/me", requireAdmin, getAdminProfile);
router.post("/refresh", requireAdmin, refreshAdminToken);

export default router;

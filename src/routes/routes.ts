import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import { requireAdmin } from "../common/guards/requireAdmin";
import { logoutAdmin } from "../modules/auth/auth.controller";
import adminRoutes from "../modules/admin/admin.routes";

const router = Router();

// Example placeholder route
router.get("/", (_req, res) => {
  res.json({ ok: true, message: "SURERIDE Admin Backend API" });
});

router.use("/admin/auth", authRoutes);

// ADMIN ROUTES
router.use("/admin", adminRoutes);

// CAR RENTAL ROUTES
router.use("/car-rental");
export default router;

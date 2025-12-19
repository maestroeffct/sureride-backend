import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import { requireAdmin } from "../middlewares/requireAdmin";
import { logoutAdmin } from "../modules/auth/auth.controller";

const router = Router();

// Example placeholder route
router.get("/", (_req, res) => {
  res.json({ ok: true, message: "SURERIDE Admin Backend API" });
});

router.use("/admin/auth", authRoutes);

// Later you’ll do:s
// router.use('/admin/auth', authRoutes);
// router.use('/car-rental', carRentalRoutes);

export default router;

import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";

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

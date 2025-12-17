import { Router } from "express";

const router = Router();

// Example placeholder route
router.get("/", (_req, res) => {
  res.json({ ok: true, message: "SURERIDE Admin Backend API" });
});

// Later you’ll do:
// router.use('/admin/auth', authRoutes);
// router.use('/car-rental', carRentalRoutes);

export default router;

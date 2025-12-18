"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Example placeholder route
router.get("/", (_req, res) => {
    res.json({ ok: true, message: "SURERIDE Admin Backend API" });
});
// Later you’ll do:
// router.use('/admin/auth', authRoutes);
// router.use('/car-rental', carRentalRoutes);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("../modules/auth/auth.routes"));
const router = (0, express_1.Router)();
// Example placeholder route
router.get("/", (_req, res) => {
    res.json({ ok: true, message: "SURERIDE Admin Backend API" });
});
router.use("/admin/auth", auth_routes_1.default);
// Later you’ll do:s
// router.use('/admin/auth', authRoutes);
// router.use('/car-rental', carRentalRoutes);
exports.default = router;

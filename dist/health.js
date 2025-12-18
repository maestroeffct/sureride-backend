"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.health = void 0;
const health = (_req, res) => {
    res.status(200).json({
        ok: true,
        service: "sureride-admin-backend",
        ts: new Date().toISOString(),
    });
};
exports.health = health;

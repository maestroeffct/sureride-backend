"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdmin = loginAdmin;
exports.getAdminProfile = getAdminProfile;
exports.refreshAdminToken = refreshAdminToken;
exports.logoutAdmin = logoutAdmin;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../../config/db");
const env_1 = require("../../config/env");
async function loginAdmin(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }
        const admin = await db_1.prisma.admin.findUnique({
            where: { email },
        });
        if (!admin || !admin.password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const valid = await bcrypt_1.default.compare(password, admin.password);
        if (!valid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ adminId: admin.id }, env_1.env.JWT_SECRET, {
            expiresIn: "12h",
        });
        return res.json({
            token,
            admin: {
                id: admin.id,
                email: admin.email,
            },
        });
    }
    catch (error) {
        console.error("LOGIN ERROR:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
async function getAdminProfile(req, res) {
    const adminId = req.admin.id;
    const admin = await db_1.prisma.admin.findUnique({
        where: { id: adminId },
        select: {
            id: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });
    return res.json({ admin });
}
function refreshAdminToken(req, res) {
    const admin = req.admin;
    const token = jsonwebtoken_1.default.sign({
        adminId: admin.id,
        role: admin.role,
    }, env_1.env.JWT_SECRET, { expiresIn: "12h" });
    return res.json({ token });
}
function logoutAdmin(_req, res) {
    return res.json({
        success: true,
        message: "Logged out successfully",
    });
}

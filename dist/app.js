"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const routes_1 = __importDefault(require("./routes/routes"));
const health_1 = require("./health");
const app = (0, express_1.default)();
/**
 * CORS CONFIG
 */
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000", // local admin dashboard
        "https://sureride-dashboard.vercel.app", // production dashboard (example)
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.get("/health", health_1.health);
app.use("/api", routes_1.default);
// jmn
exports.default = app;

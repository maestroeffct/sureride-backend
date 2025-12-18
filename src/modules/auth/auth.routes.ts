import { Router } from "express";
import { loginAdmin } from "./auth.controller";

const router = Router();

router.post("/login", loginAdmin);

export default router;

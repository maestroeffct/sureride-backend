import { Router } from "express";
import { createPermission, listPermissions } from "./permission.controller";
import { requireAdmin } from "../../common/guards/requireAdmin";

const router = Router();

router.use(requireAdmin);

router.post("/", createPermission);
router.get("/", listPermissions);

export default router;

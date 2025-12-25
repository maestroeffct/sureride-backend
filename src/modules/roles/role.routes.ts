import { Router } from "express";
import {
  createRole,
  listRoles,
  assignPermissionToRole,
} from "./role.controller";
import { requireAdmin } from "../../common/guards/requireAdmin";

const router = Router();

router.use(requireAdmin);

router.post("/", createRole);
router.get("/", listRoles);
router.post("/:roleId/permissions", assignPermissionToRole);

export default router;

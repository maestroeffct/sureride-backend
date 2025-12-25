import { Router } from "express";
import * as AdminController from "./admin.controller";
import { requireAdmin } from "../../common/guards/requireAdmin";
import { requirePermission } from "../../common/guards/requirePermission";

const router = Router();

router.use(requireAdmin);

router.post(
  "/",
  requirePermission("manage_admins"),
  AdminController.createAdmin
);

router.get("/", requirePermission("view_admins"), AdminController.listAdmins);

router.patch(
  "/:adminId/role",
  requirePermission("manage_admins"),
  AdminController.updateAdminRole
);

router.delete(
  "/:adminId",
  requirePermission("manage_admins"),
  AdminController.deleteAdmin
);
export default router;

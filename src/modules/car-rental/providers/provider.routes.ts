import { Router } from "express";
import {
  listProviders,
  getProvider,
  toggleProvider,
} from "./provider.controller";
import { requireAdmin } from "../../../common/guards/requireAdmin";
import { requirePermission } from "../../../common/guards/requirePermission";
const router = Router();

router.use(requireAdmin);
router.use(requirePermission("manage_rentals"));

router.get("/", listProviders);
router.get("/:id", getProvider);
router.patch("/:id/status", toggleProvider);

export default router;

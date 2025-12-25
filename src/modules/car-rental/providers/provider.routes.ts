import { Router } from "express";
import {
  createProvider,
  updateProvider,
  getProvider,
  listProviders,
  submitProvider,
  approveProvider,
  rejectProvider,
} from "./provider.controller";

import { requireAdmin } from "../../../common/guards/requireAdmin";
import { requirePermission } from "../../../common/guards/requirePermission";
import { upload } from "../../../common/upload/multer";
import { uploadProviderDocuments } from "./provider.upload";

const router = Router();

router.use(requireAdmin);

// CRUD
router.post("/", requirePermission("manage_rentals"), createProvider);
router.get("/", requirePermission("view_rentals"), listProviders);
router.get("/:id", requirePermission("view_rentals"), getProvider);
router.patch("/:id", requirePermission("manage_rentals"), updateProvider);

// Workflow
router.post("/:id/submit", requirePermission("manage_rentals"), submitProvider);
router.post(
  "/:id/approve",
  requirePermission("approve_providers"),
  approveProvider
);
router.post(
  "/:id/reject",
  requirePermission("approve_providers"),
  rejectProvider
);
router.post(
  "/:id/documents",
  requireAdmin,
  requirePermission("manage_rentals"),
  upload.fields([
    { name: "businessCert", maxCount: 1 },
    { name: "idDocument", maxCount: 1 },
  ]),
  uploadProviderDocuments
);

export default router;

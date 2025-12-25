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

// CREATE
router.post("/", requirePermission("rental.providers.create"), createProvider);

// READ
router.get("/", requirePermission("rental.providers.view"), listProviders);

router.get("/:id", requirePermission("rental.providers.view"), getProvider);

// UPDATE
router.patch(
  "/:id",
  requirePermission("rental.providers.update"),
  updateProvider
);

// SUBMIT
router.post(
  "/:id/submit",
  requirePermission("rental.providers.submit"),
  submitProvider
);

// APPROVE / REJECT
router.post(
  "/:id/approve",
  requirePermission("rental.providers.approve"),
  approveProvider
);

router.post(
  "/:id/reject",
  requirePermission("rental.providers.approve"),
  rejectProvider
);

// DOCUMENT UPLOAD
router.post(
  "/:id/documents",
  requirePermission("rental.providers.update"),
  upload.fields([
    { name: "businessCert", maxCount: 1 },
    { name: "idDocument", maxCount: 1 },
  ]),
  uploadProviderDocuments
);

export default router;

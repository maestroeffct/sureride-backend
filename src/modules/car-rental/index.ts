import { Router } from "express";
import providerRoutes from "./providers/provider.routes";

const router = Router();

// Providers (Car rental vendors)
router.use("/providers", providerRoutes);

export default router;

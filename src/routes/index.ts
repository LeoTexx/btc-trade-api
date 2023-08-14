import { Router } from "express";

import sseRoutes from "./sse";
import webhookRoutes from "./webhooks";
import proxyRoutes from "./proxy";

const router = Router();

router.use(sseRoutes);
router.use(webhookRoutes);
router.use(proxyRoutes);

export default router;

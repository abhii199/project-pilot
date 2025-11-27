import { Router } from "express";
import { healthCheck } from "../controllers/healthcheck.Controllers";

const router = Router();

router.get("/", healthCheck);

export default router;
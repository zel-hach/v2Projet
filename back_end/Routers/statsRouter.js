import express from "express";
import { requireAdminOrViewer } from "../middlewares/authMiddleware.js";
import { getDashboardStats } from "../controllers/statsController.js";

const router = express.Router();

router.get("/dashboard", requireAdminOrViewer, getDashboardStats);

export default router;

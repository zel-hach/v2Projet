import express from "express";
import { requireAdminOrViewer } from "../middlewares/authMiddleware.js";
import { postSendUserEmail } from "../controllers/emailController.js";

const router = express.Router();

router.post("/send", requireAdminOrViewer, postSendUserEmail);

export default router;

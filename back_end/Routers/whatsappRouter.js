import express from "express";
import auth from "../middlewares/authMiddleware.js";
import { postSendWhatsApp } from "../controllers/whatsappController.js";

const router = express.Router();

router.post("/send", auth, postSendWhatsApp);

export default router;

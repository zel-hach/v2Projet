import express from "express";
import { getUsers, updateUser, deleteUser } from "../controllers/usersController.js";
import { requireAdmin, requireAdminOrViewer } from "../middlewares/authMiddleware.js";
import { uploadUserMedia } from "../middlewares/userUpload.js";

const router = express.Router();

router.route("/").get(requireAdminOrViewer, getUsers);

router
  .route("/:id")
  .put(requireAdmin, uploadUserMedia, updateUser)
  .delete(requireAdmin, deleteUser);

export default router;

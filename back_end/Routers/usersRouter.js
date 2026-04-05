import express from "express";
import { getUsers, getUserById, updateUser, deleteUser } from "../controllers/usersController.js";
import { requireAdmin, requireAdminOrViewer } from "../middlewares/authMiddleware.js";
import { uploadUserMedia } from "../middlewares/userUpload.js";

const router = express.Router();

router.route("/").get(requireAdminOrViewer, getUsers);

router
  .route("/:id")
  .get(requireAdminOrViewer, getUserById)
  .put(requireAdmin, uploadUserMedia, updateUser)
  .delete(requireAdmin, deleteUser);

export default router;

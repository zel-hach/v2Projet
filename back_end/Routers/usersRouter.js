import express from "express";
import { getUsers, updateUser, deleteUser } from "../controllers/usersController.js";
import auth from "../middlewares/authMiddleware.js";
import { uploadUserMedia } from "../middlewares/userUpload.js";

const router = express.Router();

router.route("/").get(auth, getUsers);

router
  .route("/:id")
  .put(auth, uploadUserMedia, updateUser)
  .delete(auth, deleteUser);

export default router;

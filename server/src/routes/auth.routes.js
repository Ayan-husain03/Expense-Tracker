import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  getProfile,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(protect, logoutUser);
router.route("/me").get(protect, getProfile);

export { router };

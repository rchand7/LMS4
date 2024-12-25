import express from "express";
import { getUserProfile, login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";  // Middleware to check user authentication
import upload from "../utils/multer.js"; // Multer for handling file uploads

const router = express.Router();

// Route to register a new user
router.route("/register").post(register);

// Route to log in the user
router.route("/login").post(login);

// Route to log out the user
router.route("/logout").get(logout);

// Route to get the authenticated user's profile
router.route("/profile").get(isAuthenticated, getUserProfile);

// Route to update the user's profile, including uploading a new profile photo
router.route("/profile/update").put(isAuthenticated, upload.single("profilePhoto"), updateProfile);

export default router;

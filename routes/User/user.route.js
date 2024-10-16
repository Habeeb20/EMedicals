import express from "express";
import { login, signup, logout, verifyEmail, forgotPassword, resetPassword, getAllusers, getUserProfile, updateUserProfile, isVerifiedUser,  } from "../../controllers/User/user.controller.js";
import jwt from "jsonwebtoken"
import { verifyToken } from "../../middleware/verifyToken.js";
import upload from "../../upload.js";
const router = express.Router();


router.post("/signup", upload, signup)
router.post("/login", login)
router.post("/logout", logout)
router.post("/verify-email", verifyEmail)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password/:token", resetPassword)
router.put("/edit", verifyToken, updateUserProfile)
// router.delete("/deleteaccount", verifyToken, d)
router.get("/getprofile", verifyToken, getUserProfile)
router.get("/getallusers", getAllusers)
router.get("/userisverified/:id", isVerifiedUser)


export default router
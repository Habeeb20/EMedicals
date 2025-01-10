import express from "express"
import { changePassword, forgotPassword, getUser, loginStatus, loginUser, logout, registerUser, resetPassword, updateUser } from "../../controllers/newPharmacy/userController.js";
import { protect15 } from "../../middleware/authMiddleware.js";


const router = express.Router();


router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/logout", logout)
router.get("/getuser", protect15, getUser)
router.get("/loggedin", loginStatus)
router.patch("/updateuser", protect15, updateUser)
router.patch("/changepassword", protect15, changePassword)
router.post("/forgotpassword", forgotPassword)
router.put("/resetpassword/:resetToken", resetPassword)



export default router
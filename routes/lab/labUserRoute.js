import express from "express";

import { 
    registerAdmin,
    loginAdmin,
 
    labdashboard,
    editlabprofile,
    getAllLab, } from "../../controllers/Lab/LabUserController.js";

import { verifyToken } from "../../middleware/verifyToken.js";
import { protect8 } from "../../middleware/authMiddleware.js";

const router = express.Router();


router.post("/register", registerAdmin)
router.post("/login", loginAdmin)
router.get("/getuserprofile", protect8, labdashboard)
router.put("/:id", protect8, editlabprofile)
router.get("/all", getAllLab)
// router.post("/add", addUser);



// router.get("/users", getAllUsers);


// router.get("/user/:id", getUserById);


// router.put("/user/:id", updateUser);

// router.delete("/user/:id", deleteUser);

export default router;

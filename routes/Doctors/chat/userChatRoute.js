import express from "express"
import { isAuthenticate } from "../../../middleware/authMiddleware.js"
import { getUserById,getUserForSidebar } from "../../../controllers/doctors/chat/user.controller.js"


const userchatrouter = express.Router()
userchatrouter.get("/", isAuthenticate, getUserForSidebar)
userchatrouter.get("/user/:id", isAuthenticate, getUserById);


export default userchatrouter

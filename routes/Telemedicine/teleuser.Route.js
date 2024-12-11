import express from "express"
import { editTelUser, getallTeleuser, getAsingleTeleUser, loginTeleUser, registerTeleUser, teledashboard } from "../../controllers/Telemedicine/teleUserController.js"
import { protect6 } from "../../middleware/authMiddleware.js"


const teleRouter = express.Router()


teleRouter.post('/register', registerTeleUser)
teleRouter.post("/login", loginTeleUser)
teleRouter.get("/dashboard", protect6, teledashboard)
teleRouter.put("/:id", protect6, editTelUser)
teleRouter.get("/", getallTeleuser)
teleRouter.get("/atele/:id", getAsingleTeleUser)



export default teleRouter


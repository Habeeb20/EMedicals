import express from "express"
import { editwellness, getallwellness, getASingleWellness, loginwellness, registerwellness, wellnessdashboard } from "../controllers/wellnessController.js"
import { protect4 } from "../middleware/authMiddleware.js"


const wellnessrouter = express.Router()


wellnessrouter.post("/register", registerwellness)
wellnessrouter.post("/login", loginwellness)

wellnessrouter.get("/dashboard",protect4, wellnessdashboard)
wellnessrouter.put("/:id", protect4, editwellness)
wellnessrouter.get("/", getallwellness)
wellnessrouter.get("/awellness/:id", getASingleWellness)


export default wellnessrouter
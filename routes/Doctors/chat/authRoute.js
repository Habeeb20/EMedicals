import express from "express"
import { login,logout,signup } from "../../../controllers/doctors/chat/auth.controller.js"
import upload from "../../../upload.js"

const authchatrouter = express.Router()

authchatrouter.post("/signup", upload,  signup)
authchatrouter.post("/login", login)
authchatrouter.get("/logout", logout)


export default authchatrouter
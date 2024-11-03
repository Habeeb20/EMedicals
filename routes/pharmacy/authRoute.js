import express from "express"
import { registerUser, loginUser, profile } from "../../controllers/pharmacy/authController.js"
import {auth, verifyToken} from "../../middleware/verifyToken.js"
const pharmacyRoute = express.Router()


pharmacyRoute.post("/registerpuser", registerUser)
pharmacyRoute.post("/loginpuser", loginUser)
pharmacyRoute.get("/profile", verifyToken, profile)


export default pharmacyRoute
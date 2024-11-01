import { getPatientDonate, patientDonateRegister } from "../../controllers/doctors/patientDonate.Controller.js";
import express from "express"
import { verifyToken } from "../../middleware/verifyToken.js";

const patientDonateRoute = express.Router()

patientDonateRoute.post("/registerpatientdonate", verifyToken, patientDonateRegister)
patientDonateRoute.get("/getpatientdonate", verifyToken, getPatientDonate)


export default patientDonateRoute
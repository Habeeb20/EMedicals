import express from "express"
// import { registerpatient, getAllPatients, getAPatient, bookAppointment  } from "../../controllers/doctors/patient.controller.js"
import { registerPatient, loginPatient, getPatientProfile, updatePatientProfile } from "../../controllers/doctors/patient.controller.js"
import { verifyToken } from "../../middleware/verifyToken.js";
import upload from "../../upload.js";
const patientRouter = express.Router();

patientRouter.post("/patientregister", upload, registerPatient)
patientRouter.post("/patientlogin", loginPatient)
patientRouter.get("/patientprofile", verifyToken, getPatientProfile)
patientRouter.put("/updatepatient", verifyToken, updatePatientProfile)


export default patientRouter
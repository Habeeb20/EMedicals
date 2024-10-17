import express from "express"
import { registerpatient, getAllPatients, getAPatient, bookAppointment  } from "../../controllers/doctors/patient.controller.js"

const patientRouter = express.Router();

patientRouter.post("/patient/register", registerpatient)
patientRouter.post("/appointments/book", bookAppointment)
patientRouter.get("/allpatients", getAllPatients)
patientRouter.get("/patient", getAPatient)


export default patientRouter
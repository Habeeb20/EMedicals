import { getMedicalHistory, registerMedicalHistory } from "../../controllers/doctors/patientMedicalHistory.controller.js";
import express from "express"
import { verifyToken } from "../../middleware/verifyToken.js";

const patientMedicalRoute = express.Router()


patientMedicalRoute.post('/registermedicalhistory', verifyToken, registerMedicalHistory)
patientMedicalRoute.get('/getmedicalhistory', verifyToken, getMedicalHistory)


export default patientMedicalRoute
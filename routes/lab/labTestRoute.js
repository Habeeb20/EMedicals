import express from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { getAppointmentofDoctorsForLab, getAppointmentofPatientsForLab, getLabAppointmentForDoctor, getLabAppointmentForPatient, LabBookAppointment } from "../../controllers/Lab/labTest.Controller.js";


const router = express.Router();

router.post("/booklabappointment/:labid", verifyToken, LabBookAppointment );
router.get("/labappointmentofdoctors", verifyToken, getAppointmentofDoctorsForLab)
router.get("/labappointmentofpatient", verifyToken, getAppointmentofPatientsForLab)
router.get("/patientlabappointment",  verifyToken, getLabAppointmentForPatient)
router.get('/doctorlabappointment', verifyToken, getLabAppointmentForDoctor)




export default router;

import express from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { editLabTest, getAppointmentofDoctorsForLab, getAppointmentofPatientsForLab, getLabAppointmentForDoctor, getLabAppointmentForPatient, LabBookAppointment, LabBookAppointmentforPatient } from "../../controllers/Lab/labTest.Controller.js";


const router = express.Router();

router.post("/booklabappointment/:labid", verifyToken, LabBookAppointment );
router.post("/booklabappointmentforpatient/:labid", verifyToken, LabBookAppointmentforPatient)
router.get("/labappointmentofdoctors", verifyToken, getAppointmentofDoctorsForLab)
router.get("/labappointmentofpatient", verifyToken, getAppointmentofPatientsForLab)
router.get("/patientlabappointment",  verifyToken, getLabAppointmentForPatient)
router.get('/doctorlabappointment', verifyToken, getLabAppointmentForDoctor)
router.put("/editlabTest/:id", verifyToken, editLabTest)




export default router;

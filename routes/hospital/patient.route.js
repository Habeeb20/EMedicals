import express from "express"
import { auth } from "../../middleware/verifyToken.js";
import  { bookAppointment, getPatientAppointments } from "../../controllers/hospital/patientController.js";

const router = express.Router();

router.use(auth(['patient']));
// Book an appointment
router.post('/appointments', bookAppointment);

// Get patient's appointments
router.get('/:patientId/appointments', getPatientAppointments);





export default router;

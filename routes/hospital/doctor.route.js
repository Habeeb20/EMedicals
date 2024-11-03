import express from "express"
import { acceptAppointment, rejectAppointment,sendMedicalResult,rescheduleAppointment } from "../../controllers/hospital/doctorController.js";
import {auth} from "../../middleware/verifyToken.js"


const hospitaldoctorrouter = express.Router();

// Doctor routes for managing appointments and sending reports
 hospitaldoctorrouter.put('/appointments/:appointmentId/accept', auth(['doctor']), acceptAppointment);
 hospitaldoctorrouter.put('/appointments/:appointmentId/reject', auth(['doctor']), rejectAppointment);
 hospitaldoctorrouter.put('/appointments/:appointmentId/reschedule', auth(['doctor']), rescheduleAppointment);
 hospitaldoctorrouter.put('/appointments/:appointmentId/report', auth(['doctor']), sendMedicalResult);

export default hospitaldoctorrouter;

import express from 'express'
import { bookAppointment, getAppointmentsForDoctor, confirmAppointment, getAppointmentForPatient } from '../../controllers/doctors/AppointmentController.js';
import { verifyToken } from '../../middleware/verifyToken.js';
const appointmentrouter = express.Router();




// Patient books an appointment with a doctor
appointmentrouter.post('/bookappointment/:doctorid', verifyToken, bookAppointment);

// Doctor retrieves all appointments for themselves
appointmentrouter.get("/doctor", verifyToken, getAppointmentsForDoctor);

// Doctor confirms an appointment
appointmentrouter.put('/confirm/:appointmentId', verifyToken, confirmAppointment);

appointmentrouter.get("/patientappointments", verifyToken, getAppointmentForPatient)

export default appointmentrouter 

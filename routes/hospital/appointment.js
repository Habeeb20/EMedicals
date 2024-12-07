import express from 'express';
import { bookAppointment, getDoctorAppointments, updateAppointmentStatus, getPatientAppointments } from '../../controllers/hospital/appointment.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { protect3 } from '../../middleware/protect.js';

const router = express.Router();


router.post('/appointments/book', protect3, authorizeRoles('patient'), bookAppointment);


router.get('/appointments/doctor/:id', protect3, authorizeRoles('doctor'), getDoctorAppointments);


router.patch(
  '/appointments/doctor/:doctorId/:appointmentId',
  protect3,
  authorizeRoles('doctor'),
  updateAppointmentStatus
);


router.get('/appointments/patient/:id', protect3, authorizeRoles('patient'), getPatientAppointments);

export default router;

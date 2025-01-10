import express from 'express';
import { bookAppointment, getDoctorAppointments, updateAppointmentStatus, getPatientAppointments } from '../../controllers/hospital/appointment.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { protect3 } from '../../middleware/protect.js';
import Appointment from "../hospital/user.route.js"
import { verifyToken } from '../../middleware/verifyToken.js';
const router = express.Router();

// router.post('/appointments/book', verifyToken, async (req, res) => {
//   if (req.user.role !== 'patient') return res.status(403).json({ message: 'Access denied' });

//   const { doctorId, date } = req.body;
//   try {
//     const appointment = new Appointment({
//       patientId: req.user.id,
//       doctorId,
//       date,
//     });
//     await appointment.save();
//     res.status(201).json({ message: 'Appointment booked successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error booking appointment' });
//   }
// });

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

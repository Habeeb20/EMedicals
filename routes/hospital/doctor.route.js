

// routes/doctor.js
import express from 'express';

import {
  getAppointmentsBySpecialization,
  updateAppointmentStatus,
} from '../../controllers/hospital/doctorController.js';
import { auth } from '../../middleware/verifyToken.js';
const router = express.Router();


router.use(auth(['doctor']));
// Get appointments for a doctor by specialization
router.get('/:doctorId/appointments', getAppointmentsBySpecialization);

// Update appointment status (accept/reject/reschedule)
router.patch('/appointments/:appointmentId', updateAppointmentStatus);

export default router;

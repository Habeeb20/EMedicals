



import Appointment from '../../models/hospitals/appointmentSchema.js';
import User from "../../models/hospitals/userSchema.js"
// Get appointments by specialization
// Fetch appointments for the doctor based on specialization
export const getAppointmentsBySpecialization = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== 'doctor') {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const appointments = await Appointment.find({ specialization: doctor.specialization, status: 'pending' });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error });
  }
};

// Update appointment status
export const updateAppointmentStatus = async (req, res) => {
  const { appointmentId } = req.params;
  const { status, rescheduleInfo } = req.body;

  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (status === 'rescheduled' && !rescheduleInfo) {
      return res.status(400).json({ message: 'Reschedule information is required' });
    }

    appointment.status = status;
    if (status === 'rescheduled') {
      appointment.rescheduleInfo = rescheduleInfo;
    }
    await appointment.save();

    res.status(200).json({ message: 'Appointment updated successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Error updating appointment', error });
  }
};

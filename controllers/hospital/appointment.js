import Appointment from '../../models/hospitals/appointmentSchema.js';
import { sendNotification } from '../../socket';


export const acceptAppointment = async (req, res) => {
  try {
    const { appointmentId, patientId } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status: 'accepted' },
      { new: true }
    );


    const message = `Your appointment has been accepted by Dr. ${appointment.doctorName}.`;
    sendNotification(message, patientId);

    res.status(200).json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Reject Appointment
export const rejectAppointment = async (req, res) => {
  try {
    const { appointmentId, patientId } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status: 'rejected' },
      { new: true }
    );

    // Send notification to the patient
    const message = `Your appointment has been rejected by Dr. ${appointment.doctorName}.`;
    sendNotification(message, patientId);

    res.status(200).json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Reschedule Appointment
export const rescheduleAppointment = async (req, res) => {
  try {
    const { appointmentId, patientId, newDate } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status: 'rescheduled', date: newDate },
      { new: true }
    );

    // Send notification to the patient
    const message = `Your appointment has been rescheduled to ${newDate}.`;
    sendNotification(message, patientId);

    res.status(200).json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

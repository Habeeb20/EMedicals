import Appointment from '../../models/hospitals/appointmentSchema.js';

// Book an appointment
export const bookAppointment = async (req, res) => {
  const { patientId, sickness, dateStarted, medication, appointmentDate, specialization } = req.body;

  try {
    const newAppointment = new Appointment({
      patientId,
      sickness,
      dateStarted,
      medication,
      appointmentDate,
      specialization,
      status: 'pending',
    });
    await newAppointment.save();
    res.status(201).json({ message: 'Appointment booked successfully', newAppointment });
  } catch (error) {
    res.status(500).json({ message: 'Error booking appointment', error });
  }
};

// Get patient's appointments
export const getPatientAppointments = async (req, res) => {
  const { patientId } = req.params;

  try {
    const appointments = await Appointment.find({ patientId });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error });
  }
};

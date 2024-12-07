import Staff from '../models/staffModel.js';


export const bookAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, sickness, medication, dateStarted, appointmentDate } = req.body;


    const doctor = await Staff.findById(doctorId);
    const patient = await Staff.findById(patientId);

    if (!doctor || doctor.role !== 'doctor') {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    if (!patient || patient.role !== 'patient') {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const appointment = {
      patientId,
      doctorId,
      sickness,
      medication,
      dateStarted,
      appointmentDate,
    };


    doctor.appointments.push(appointment);
    patient.appointments.push(appointment);

    await doctor.save();
    await patient.save();

    res.status(201).json({ message: 'Appointment booked successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error booking appointment', details: error.message });
  }
};


export const getDoctorAppointments = async (req, res) => {
  try {
    const doctorId = req.params.id;

    // Fetch the doctor's appointments
    const doctor = await Staff.findById(doctorId);
    if (!doctor || doctor.role !== 'doctor') {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    res.status(200).json({ appointments: doctor.appointments });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching appointments', details: error.message });
  }
};

// Doctor updates appointment status
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { doctorId, appointmentId } = req.params;
    const { status, rescheduleInfo } = req.body;

    // Validate doctor existence
    const doctor = await Staff.findById(doctorId);
    if (!doctor || doctor.role !== 'doctor') {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // Find the appointment in the doctor's list
    const appointment = doctor.appointments.id(appointmentId);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    // Update status and reschedule info if applicable
    appointment.status = status;
    if (status === 'rescheduled') {
      appointment.rescheduleInfo = rescheduleInfo || 'No additional info';
    }

    await doctor.save();

    // Update the appointment in the patient's record
    const patient = await Staff.findById(appointment.patientId);
    const patientAppointment = patient.appointments.id(appointmentId);
    if (patientAppointment) {
      patientAppointment.status = status;
      patientAppointment.rescheduleInfo = rescheduleInfo || 'No additional info';
      await patient.save();
    }

    res.status(200).json({ message: 'Appointment updated successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating appointment', details: error.message });
  }
};

// Patient views their appointments
export const getPatientAppointments = async (req, res) => {
  try {
    const patientId = req.params.id;

    // Fetch the patient's appointments
    const patient = await Staff.findById(patientId);
    if (!patient || patient.role !== 'patient') {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.status(200).json({ appointments: patient.appointments });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching appointments', details: error.message });
  }
};

import Appointment from '../../models/Doctors/AppointmentDoctors.model.js';
import Doctor from '../../models/Doctors/doctor.model.js';
import Patient from '../../models/Doctors/patient.model.js';
import mongoose from 'mongoose';
// Book Appointment
export const bookAppointment = async (req, res) => {
  const {  sickness, started, drugsTaken } = req.body;
  const doctorId = req.params.doctorId || req.body.doctorId;

  try {
 
 
    const doctor = await Doctor.findById(doctorId);
    if (!doctor){
       console.log("doctor not found")
       return res.status(404).json({ msg: 'Doctor not found' });
    }
    console.log(doctor)
  
    


    const patient = await Patient.findById(req.user.id);
    if (!patient) return res.status(404).json({ msg: 'Patient not found' });

    const newAppointment = new Appointment({
      doctor: doctor,
      patient: req.user.id,
      sickness,
      started,
      drugsTaken
    });

    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to book appointment' });
  }
};

// Doctor View Appointments
export const getAppointmentsForDoctor = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.user.id }).populate('patient');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
};

// Confirm Appointment (Doctor)
export const confirmAppointment = async (req, res) => {
  const { appointmentId, confirmationDate, confirmationTime } = req.body;

  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) return res.status(404).json({ msg: 'Appointment not found' });

    appointment.confirmationDate = confirmationDate;
    appointment.confirmationTime = confirmationTime;
    await appointment.save();

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to confirm appointment' });
  }
}
export const getPatientDashboard = async (req, res) => {
    try {
      const patientId = req.user.id;  
  
      const appointments = await Appointment.find({ patientId }).populate('doctorId', 'fullname email');
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

import Patient from "../../models/Doctors/patient.model.js";
import Appointment from "../../models/Doctors/AppointmentDoctors.model.js";

export const registerpatient = async() => {
    try {
        const patient = new Patient(req.body);
        await patient.save();
        res.status(201).json({message: "patient registered successfully", patient})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


// Book an appointment
export const bookAppointment = async (req, res) => {
    const { doctorId, patientId, date, reason, location } = req.body;
    try {
      const appointment = new Appointment({
        doctor: doctorId,
        patient: patientId,
        date,
        reason,
        location
      });
      await appointment.save();
  
      // Add appointment to doctor and patient
      await Doctor.findByIdAndUpdate(doctorId, { $push: { appointments: appointment._id } });
      await Patient.findByIdAndUpdate(patientId, { $push: { appointments: appointment._id } });
  
      res.status(201).json({ message: "Appointment booked successfully", appointment });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



  export const getAllPatients = async (req, res) => {
    try {
      const patients = await Patient.find().populate('appointments');
      res.status(200).json(patients);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  
  export const getAPatient = async (req, res) => {
    try {
      const patient = await Patient.findById(req.params.id).populate('appointments').populate("doctors");
      res.status(200).json(patient);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
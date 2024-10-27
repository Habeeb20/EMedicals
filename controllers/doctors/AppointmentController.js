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
      patientId:new mongoose.Types.ObjectId(req.user.id), 
      doctorId: new mongoose.Types.ObjectId(doctorId),
      sickness,
      started,
      drugsTaken
    });

    await newAppointment.save();
    console.log("New appointment created:", newAppointment);

    res.status(201).json(newAppointment);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to book appointment' });
  }
};


// Doctor View Appointments
export const getAppointmentsForDoctor = async (req, res) => {
  const doctorId = req.params.doctorId || req.body.doctorId;;


  if (!doctorId || doctorId === 'undefined') {
    console.log("doctor id not found")
    return res.status(400).json({ error: 'Doctor ID is required' });
  }

  try {
    const appointments = await Appointment.find({ doctorId }).populate('patient');
    res.json(appointments);
  } catch (error) {
    console.log(error);
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



export const getAppointmentForPatient = async (req, res) => {
  try {
    const patientId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(400).json({ message: 'Invalid patient ID' });
    }

    console.log("Patient ID:", patientId); 

    const patientExists = await Patient.findById(new mongoose.Types.ObjectId(patientId));
    if (!patientExists) {
      return res.status(404).json({ message: 'Patient not found' });
    }


    const appointments = await Appointment.find({ patientId:new mongoose.Types.ObjectId(patientId) })
      .populate('doctorId', 'fullname email'); 

    console.log("Appointments found:", appointments); 

    return res.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error.message); 
    return res.status(500).json({ message: 'Server error', error: error.message }); 
  }
};

import mongoose from "mongoose";
const { Schema } = mongoose;

const appointmentSchema = new Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
  
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
 
  },
  sickness: {
    type: String,
    required: true
  },
  started: {
    type: Date,
    required: true
  },
  drugsTaken: {
    type: String,
    default: ''
  },
  appointmentDate: {
    type: Date,
    default: Date.now
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;

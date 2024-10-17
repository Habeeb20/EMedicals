import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    date: { type: Date, required: true },
    status: { type: String, default: 'Pending' },
    reason: { type: String, required: true },
    location: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }, { timestamps: true });

  export default mongoose.model('Appointment', appointmentSchema)

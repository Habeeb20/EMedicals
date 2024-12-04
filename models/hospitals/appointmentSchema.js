


import mongoose from 'mongoose';

const appointmentSchema = mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'HUser', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'HUser' },
  sickness: { type: String, required: true },
  medication: { type: String },
  dateStarted: { type: Date, required: true },
  appointmentDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected', 'rescheduled'], default: 'pending' },
  rescheduleInfo: { type: String, default: null },
});

export default mongoose.model('HAppointment', appointmentSchema);

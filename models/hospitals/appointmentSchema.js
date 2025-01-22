import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HUser', // Reference to the User (Patient)
    required: true,
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HUser', // Reference to the Admin (Hospital)
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  appointmentTime: {
    type: String,
    required: true,
  },
  reasonForAppointment: {
    type: String,
    required: true,
    trim: true,
  },
  sickness:{
    type:String,
    required: true
  },
  responseType:{
    type:String,
    required:true
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
    default: 'Pending',
  },
  patientDetails: {
    weight: { type: String },
    specializationNeeded: { type: String }, 
    location: { type: String },
    state: { type: String },
    LGA: { type: String }, 
  },
  adminResponse: {
    message: { type: String }, 
    respondedAt: { type: Date },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("HAppointment", appointmentSchema);

import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    state:{type:String, required: true},
    LGA: {type:String, required: true},
    address: { type: String, required: true },
    gender: { type: String },
    sickness: {type:String},
    age: { type: Number, required: true },
    healthHistory: { type: String },
    currentMedications: { type: String },
    allergies: { type: String },
    doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }],
    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }]
  }, { timestamps: true });
  export default mongoose.model('Patient', patientSchema)
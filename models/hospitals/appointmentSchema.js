import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "HUser", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "HUser", required: true },
  date: { type: Date, required: true },
  reason: { type: String, required: true },
});

export default mongoose.model("HAppointment", appointmentSchema);

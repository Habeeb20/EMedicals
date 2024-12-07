import mongoose from "mongoose";

const newDoctorDetailsSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  certifications: [String],
  yearsOfExperience: { type: Number },
  clinicHours: { type: String },
  clinicAddress: { type: String },
  biography: { type: String },
  ratings: { type: Number, default: 0 },
  reviews: [{ patientName: String, comment: String, createdAt: { type: Date, default: Date.now } }],
}, { timestamps: true });

export default mongoose.model("NewDoctorDetails", newDoctorDetailsSchema);

import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  patients: [{ type: mongoose.Schema.Types.ObjectId, ref: "HospitalUser" }],
});

const Doctor = mongoose.model("HDoctor", doctorSchema);
export default Doctor;

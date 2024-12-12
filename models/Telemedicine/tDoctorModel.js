import mongoose from "mongoose";

const teleDoctorSchema = new mongoose.Schema({
    name: String,
    specialization: String,
    email: { type: String, unique: true },
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: "TeleUser" },
  });


  export default mongoose.model('TeleDoctor', teleDoctorSchema )


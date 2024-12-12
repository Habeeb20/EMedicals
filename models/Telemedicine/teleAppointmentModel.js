import mongoose from "mongoose";
const teleAppointmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "TeleUser" },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "TeleDoctor" },
    date: String,
    status: { type: String, default: "Pending" },
  });


  export default mongoose.model('TeleAppointment', teleAppointmentSchema)
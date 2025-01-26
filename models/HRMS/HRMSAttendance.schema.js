import mongoose from "mongoose";
import bcrypt from "bcrypt"

const attendanceSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  employeeName: { type: String, required: true },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Hrmsauth", required: true }, 
  date: { type: Date, default: Date.now },
  time: { type: String },
});
  
 export default mongoose.model('Attendance', attendanceSchema);
  
import mongoose from "mongoose";

const holidaySchema = new mongoose.Schema({
  title: { type: String, required: true },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Hrmsauth", required: true }, 
  description: { type: String },
  date: { type: Date, required: true },
  isRecurring: { type: Boolean, default: false }, // e.g., New Year, recurring annually
});

export default mongoose.model('Holiday', holidaySchema);
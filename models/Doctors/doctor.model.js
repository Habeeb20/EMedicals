import mongoose from 'mongoose';


const doctorSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, },
  phoneNumber: { type: String, required: true },
  gender: { type: String, required: true },
  state: { type: String, required: true },
  LGA: { type: String, required: true },
  officeAddress: { type: String, required: true },
  profilePicture: { type: String },
  currentWorkplace: { type: String, required: true },
  specialization: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  uniqueNumber: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Doctor', doctorSchema);

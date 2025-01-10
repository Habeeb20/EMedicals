
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'doctor', 'nurse', 'patient'], required: true },
  location:{type:String, required: true},
  profilePicture: { type: String },
  createdAt: { type: Date, default: Date.now },
  registrationDate: { type: Date, default: Date.now },
  uniqueNumber: { type: String, unique: true },
  resetPasswordToken: String,
  resetPasswordExpiresAt: Date,
  verificationToken: String,
  verificationTokenExpiresAt: Date,


 
});

export default mongoose.model("HUser", userSchema);

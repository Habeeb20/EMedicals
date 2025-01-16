
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'doctor', 'nurse', 'patient'], required: true },
  phone:{type:String},
  profilePicture: { type: String,  },
  createdAt: { type: Date, default: Date.now },
  registrationDate: { type: Date, default: Date.now },
  uniqueNumber: { type: String, unique: true },
  specialization:{type:String},
  location:{type:String},
  doctorTime:{type:String},
  state:{type:String},
  LGA:{type:String},
  weight:{type:String},


  resetPasswordToken: String,
  resetPasswordExpiresAt: Date,
  verificationToken: String,
  verificationTokenExpiresAt: Date,


 adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'HUser' },
});

export default mongoose.model("HUser", userSchema);

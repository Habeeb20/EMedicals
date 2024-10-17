import mongoose, { mongo } from "mongoose";
import bcrypt from "bcryptjs";

const doctorSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    state:{type: String, required: true},
    LGA: {type:String, required: true},
    address: { type: String },
    specialization: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    qualifications: { type: String, required: true },
    medicalCertificate: {type: String},
    medicalSchool: { type: String },
    yearsOfExperience: { type: Number, required: true },
    currentWorkplace: { type: String },
    profilePicture: { type: String },
    createdAt: { type: Date, default: Date.now },
    uniqueNumber: { type: String, unique: true },
    patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }],
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  }, { timestamps: true });

  doctorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

  
  export default mongoose.model('Doctor', doctorSchema)

  
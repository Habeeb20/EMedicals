import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: String },
    role: {
      type: String,
      enum: ["admin", "doctor", "nurse", "patient"],
      required: true,
    },
    specialization: { type: String, default: null },
    profilePicture: { type: String },
    picture1:String,
    picture2:String,
    picture3:String,
    category: String,
    state: String,
    LGA: String,
    location: String,
    chargesForRegistration:String,
    HighestChargesForDoctor:String,
    services: [
      {
        ambulance: String,
        ambulanceCompany: String,
        emergencyLine: String,
        fundraiser:String,
        fundraiserSpeech: String,
        accountNumber: { type: String },
        accountName: { type: String },
        bankName: { type: String },
        homeCare: String,
        typeOfHomeCarepersonnel: String,
        medicalTourism:String,
      },
    ],

    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "HUser" },
    additionalDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NewHospitalDetails",
    },
    comments: [
      {
        name: String,
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    clicks: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model("HUser", userSchema);

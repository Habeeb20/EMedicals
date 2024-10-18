import mongoose from "mongoose"


const mortuarySchema= new mongoose.Schema({
  name: { type: String, required: true },
  lastLogin: { type: Date, default: Date.now, },
  phonenum:{type:String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  localGovtArea: { type: String, required: true },
  category: { type: String, required: true },
  profilePicture: { type: String },
  uniqueNumber: { type: String },
  yearsInProfession: { type: Number, required: true },
  accountNumber: { type: String, required: true },
  accountName: { type: String, required: true },
  bankName: { type: String, required: true },
  role: { type: String, enum: ['user', 'mortuary', 'admin'], default: 'user' },
  status: { type: String, enum: ['active', 'blocked', 'pending'], default: 'pending' },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  otp: { type: String },
  reviewRating: { type: Number, default: 0 },
  viewCount: { type: Number, default: 0 },
  resetPasswordToken: String,
  resetPasswordExpiresAt: Date,
  verificationToken: String,
  verificationTokenExpiresAt: Date,

});
mortuarySchema.pre('save', function(next) {
  if (this.isVerified) {
    this.status = 'active';
  } else {
    this.status = 'pending';
  }
  next();
});

const  mortuary = mongoose.model('Mortuary',  mortuarySchema);
export default mortuary;

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

  email: { type: String, required: true, unique: true },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    minLength: [11, "Phone number must contain exactly 11 characters"],
    maxLength: [11, "Phone number must contain exactly 11 characters"],
    validate: {
      validator: function (v) {
        return /^\d{11}$/.test(v); 
      },
      message: "Phone number must contain only digits",
    },
  },
  password: { type: String, required: true,     minLength: [8, "Password must contain at least 8 characters"], },
  profilePicture: { type: String },
  isVerified: {type: Boolean,default: false},
  role: { type: String, enum: ['user', 'religious_leader', 'admin'], default: 'user' },
  status: { type: String, enum: ['active', 'blocked', 'pending'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  registrationDate: { type: Date, default: Date.now },
  uniqueNumber: { type: String, unique: true },
  resetPasswordToken: String,
  resetPasswordExpiresAt: Date,
  verificationToken: String,
  verificationTokenExpiresAt: Date,
});

export const User = mongoose.model('User', userSchema);


import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minLength: [3, "First name must contain at least 3 characters"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minLength: [3, "Last name must contain at least 3 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, 
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email address"],
    },
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
    dob: {
      type: Date,
      required: [true, "Date of Birth is required"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["Male", "Female", "Other"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must contain at least 8 characters"],
      select: false,
    },
    role: {
      type: String,
      required: [true, "User role is required"],
      enum: ["Patient", "Doctor", "Admin"],
      default: "Patient",
    },
    doctorDepartment: {
      type: String,
 
      required: function () {
        return this.role === "Doctor";
      },
    },
    docAvatar: {
      public_id: String,
      url: String,
    },
    hospitalName: {
      type: String,
  
      required: function () {
        return this.role === "Admin";
      },
      trim: true,
    },
    address: {
      type: String,
 
      required: function () {
        return this.role === "Admin";
      },
      trim: true,
    },
    localGovtArea: {
      type: String,
  
      required: function () {
        return this.role === "Admin";
      },
      trim: true,
    },
    state: {
      type: String,

      required: function () {
        return this.role === "Admin";
      },
      trim: true,
    },
    profilePicture: { type: String },
    createdAt: { type: Date, default: Date.now },
    registrationDate: { type: Date, default: Date.now },
    uniqueNumber: { type: String, unique: true },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});


userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};


userSchema.virtual("adminDetails").get(function () {
  if (this.role === "Admin") {
    return {
      hospitalName: this.hospitalName,
      address: this.address,
      localGovtArea: this.localGovtArea,
      state: this.state,
    };
  }
  return {};
});

export const User = mongoose.model("User", userSchema);

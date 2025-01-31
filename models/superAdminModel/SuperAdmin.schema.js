import mongoose from "mongoose";


const superAdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type:String,
        required: String
    },

    createdAt: { type: Date, default: Date.now },
    registrationDate: { type: Date, default: Date.now },
    uniqueNumber: { type: String, unique: true },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,

}, {timestamps: true})


export default mongoose.model("SuperAdmin", superAdminSchema)
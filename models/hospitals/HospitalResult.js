import mongoose from "mongoose";

const hospitalResultSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    appointmentId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'HAppointment'
    },
    result:{
        type:String,
        required:true
    },
    sickness:{
        type:String,
        required: true
    },
    observation:{
        type:String,
        required: true
    },
    recommendation: {
        type:String,
        required: true
    },

    createdAt:{
        type:Date,
        default: Date.now
    }
}, {timestamps:true})

export default mongoose.model("HospitalResult", hospitalResultSchema)
import mongoose from "mongoose";


const hospitalReportSchema = new mongoose.Schema({

    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HUser', // Reference to the User (Patient)
        required: true,
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HUser', // Reference to the Admin (Hospital)
        required: true,
      },
    complaints:{
        type:String,
        required: true,
    },
    doctorName: {
        type:String,
        required: true,
    },
    observation: {
        type:String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
})

export default mongoose.model("HReport", hospitalReportSchema)
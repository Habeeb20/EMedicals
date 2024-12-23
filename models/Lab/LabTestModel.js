import mongoose from "mongoose";

const Labtestappointment = new mongoose.Schema({

    labId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'LabUser',
    },

    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
    },

    patientId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Patient',
    },
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },

    testName:{
        type:String,
        required: true
    },
  
    status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
    patientName:{
        type:String,
        required:true
    },
    patientContact:{
        type:String,
        required: true
    },
    testResult: {
        type:String,

    },
    status:{
        type:String
    },
    AmountPaid:{
        type:String
    },
    MedicalAdvice:{
        type:String
    },
    drugPrescription:{
        type:String
    }
    
}, {
    timestamps: true
})

export default mongoose.model("LabTest", Labtestappointment)
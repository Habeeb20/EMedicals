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
    }
    
}, {
    timestamps: true
})

export default mongoose.model("LabTest", Labtestappointment)
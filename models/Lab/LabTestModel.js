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
    
})
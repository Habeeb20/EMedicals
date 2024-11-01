import mongoose from "mongoose";


const patientDonate = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
     
        ref: "Patient" 
    },
    kidney:{
        type:String,
    },
    heart:{
        type:String,
    },
    lungs:{
        type:String,
    },
    liver:{
        type:String,
    },


})

export default mongoose.model("PatientDonate", patientDonate)
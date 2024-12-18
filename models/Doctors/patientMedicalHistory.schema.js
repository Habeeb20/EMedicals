import mongoose from "mongoose";

const patientMedicalSchema = new mongoose.Schema({

    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient" 
    },
    chronicConditions:{
        type:String,
    },
    surgeries:{
        type:String,
    },
    hospitalized:{
        type:String,
    },
    currentMedications:{
        type:String,
    },
    bloodGroup:{
        type:String,
    },
    bloodType:{
        type:String,
    },
    genoType:{
        type:String,
    },
    medicalConditions:{
        type:String,
    },
    smokingOrAlcohol:{
        type:String,
    },
    patientId: {type: String},
    recipientEmail:{type:String} 



})

export default mongoose.model("PatientMedicalHistory", patientMedicalSchema)
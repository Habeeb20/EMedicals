import mongoose from "mongoose";
const {Schema} = mongoose;


const medicalTestSchema = new Schema({
    doctorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
     
      },
      sickness:{
        type: String,
        required: true
      },
      started: {
        type: Date,
        required: true
      },
      drugsTaken: {
        type: String,
        default: ''
      },
      prescribedDrugs:{
        type: String,
        default: ''
      },
      cause:{
        type:String,
        default: ''
      },
      Date:{
        type: Date,
        default: Date.now
      }

})

const medicalTest = mongoose.model('MedicalTest', medicalTestSchema)
export default medicalTest
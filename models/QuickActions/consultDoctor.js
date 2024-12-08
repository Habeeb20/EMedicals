import mongoose from 'mongoose';


const consultDoctorSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
 
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  state: { type: String, required: true },
  LGA: { type: String, required: true },
  address: { type: String, required: true },
  specialization: { type: String, required: true },
  uniqueNumber: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
availability:{type:String, required:true} ,
  YOE:{type:Number, required: true} , 
});

export default mongoose.model('ConsultDoctor', consultDoctorSchema);

import mongoose from 'mongoose';


const patientSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password:{type:String, required: true},
  profilePicture:{type:String},
  phoneNumber: { type: String, required: true },
  state: { type: String, required: true },
  homeAddress: { type: String, required: true },
  LGA: { type: String, required: true },
  allergics: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default  mongoose.model('Patient', patientSchema);

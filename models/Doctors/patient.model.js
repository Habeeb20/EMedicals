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
  createdAt: { type: Date, default: Date.now },
  userType: { type: String, default: 'Patient' }, // Define user type
  online: { type: Boolean, default: false },      // Track online status
  lastActive: { type: Date },
       

});

export default  mongoose.model('Patient', patientSchema);

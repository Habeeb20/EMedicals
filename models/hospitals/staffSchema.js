import mongoose from "mongoose";


const staffSchema = new mongoose.Schema({
    hospitalName:{type:String, required: true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    role: {type:String, required:true},
    state: {type:String, required:true},
    LGA: {type:String, required:true},
    doctorTime:String,
    specialization: String,
    fullname:String,
    phone:String,
   
    location:String,
    category:String,
    picture1: String,
    surgeries:String,
    hospitalized:String,
    Sickness2:String,
    bloodGroup:String,
    bloodType:String,
    genoType:String, 


    weight:String,
    height:String,
    maritalStatus:String,
    NextOfKin:String,
    NextOfKinPhone:String,
    profession:String,
    placeOfWork:String,
    placeofworkAddress:String,
    EmployerPhone:String,


    homecarePersonel:String,
    homeCareDate:Date,
    homeCareTime:String,
    homeCareAgent:String,
    homeCareAddress:String,
    homeCareNote:String,

    createdAt: { type: Date, default: Date.now },

    appointments: [
      {
        patientId: mongoose.Schema.Types.ObjectId,
        doctorId: mongoose.Schema.Types.ObjectId,
        sickness: { type: String, required: true },
        medication: { type: String },
        dateStarted: { type: Date, required: true },
        appointmentDate: { type: Date, required: true },
        status: { type: String, enum: ['pending', 'accepted', 'rejected', 'rescheduled'], default: 'pending' },
        rescheduleInfo: { type: String, default: null },
        date: Date,
     
      },
    ],
  


    comments: [
        {
          name: String,
          text: String,
          createdAt: { type: Date, default: Date.now }
        }
      ],
      clicks: { type: Number, default: 0 }, 
      shares: { type: Number, default: 0 },



    

}, {timestamps:true})

export default mongoose.model('Staff', staffSchema)
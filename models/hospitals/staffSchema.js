import mongoose from "mongoose";


const staffSchema = new mongoose.Schema({
    email:{type:String, required:true},
    password:{type:String, required:true},
    role: {type:String, required:true},
    specialization: String,
    fullname:String,
    phone:String,
    state:String,
    LGA:String,
    location:String,
    category:String,
    picture1: String,
    surgeries:String,
    hospitalized:String,
    Sickness2:String,
    bloodGroup:String,
    bloodType:String,
    genoType:String, 
    createdAt: { type: Date, default: Date.now },


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
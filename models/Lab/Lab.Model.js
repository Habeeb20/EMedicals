import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const LabUser = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    phone: {
        type:String,
      
    },
    role:{
        type:String,
        enum: ["admin", "technician", "patient"], 
        required:true, 
    },
    state:{
        type:String,
        required:true
    },
    LGA:{
        type:String,
        required:true
    },
    location:{
        type:String,

    },
    picture1:{
        type:String
    },


    uniqueNumber: { type: String, unique: true },
},   { timestamps: true })





  export default mongoose.model("LabUser", LabUser)
import mongoose from "mongoose"


const teleUserSchema = new mongoose.Schema({
    path:{type:String, required:true},
    firstName: {type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, required:true},
    phone:{type:String, required:true},
    NameOfBusiness:{type:String, required:true},
    password:{type:String, required:true},
    role: { type: String, default: "user", },
    typeOfPath:String,
    location:String,
    state:String,
    LGA:String,
   

    height:String,
    weight:String,
    genotype:String,
    bloodGroup:String,
    BMI:String,


    picture1: String,
   
    availableTime:String,
    createdAt:{ type: Date, default: Date.now },
 
}, {timestamps:true})


export default mongoose.model("TeleUser", teleUserSchema)
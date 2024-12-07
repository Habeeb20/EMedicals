import mongoose from "mongoose";

const wellnessSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    repName:String,
    phone:String,
    state:String,
    LGA:String,
    location:String,
    category:String,
    details:String,
    features:String,
    services:String,
    picture1: String,
    picture2:String,
    picture3: String,
    discountPer:Number,
    discount:String,
    discountFor:String,
    availableTime:String,
    createdAt:{ type: Date, default: Date.now },
 
}, {timestamps:true})

export default mongoose.model('Wellness', wellnessSchema)
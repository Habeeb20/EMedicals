import mongoose from "mongoose"

const undertakerSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,

    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    location: {
        type:String,
        required: true
    },
    phone:String,
    services:String,
    picture1: String,
    picture2:String,
    picture3: String,
    picture4:String,
    state: {type:String},
    LGA:{type:String},
    openingTime: {type:String},
    closingTime: {type:String},
    features:{type:String},
    createdAt:{type:Date, default:Date.now}
}, {timestamps: true})


export default mongoose.model("UnderTaker", undertakerSchema)
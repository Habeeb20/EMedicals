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
    testA:{
        type:String
    },
    testAPrice:{
        type:String
    },
    testB:{
        type:String
    },
    testBPrice:{
        type:String
    },
    testC:{
        type:String
    },
    testCPrice:{
        type:String
    },
    testD:{
        type:String
    },
    testDPrice:{
        type:String
    },
    testE:{
        type:String
    },
    testEPrice:{
        type:String
    },
    testF:{
        type:String
    },
    testFPrice:{
        type:String
    },
    testG:{
        type:String
    },
    testGPrice:{
        type:String
    },
    testH:{
        type:String
    },
    testHPrice:{
        type:String
    },
    testI:{
        type:String
    },
    testIPrice:{
        type:String
    },
    testJ:{
        type:String
    },
    testJPrice:{
        type:String
    },
   
   
   
   
   
   
   
   
   
   




    uniqueNumber: { type: String, unique: true },
},   { timestamps: true })





  export default mongoose.model("LabUser", LabUser)
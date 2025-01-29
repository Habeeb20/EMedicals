import mongoose from "mongoose";


const mortuaryDeathSchema = new mongoose.Schema({
    fullName: {
        type:String,
        required: true,
    },
    causeOfDeath:{
        type:String,
        required: true,

    },
    dateOfDeath:{
        type:String,
        required: true
    },
    gender: {
        type:String,
        required: true
    },
    createdAt: {
        type:Date,
        default:Date.now()
    },
    mortuaryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mortuary', required: true }
},{timestamps: true} )


export default mongoose.model('mortuaryDeath', mortuaryDeathSchema)
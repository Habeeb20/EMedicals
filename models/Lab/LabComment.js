import mongoose from "mongoose";


const Schema = mongoose.Schema;

const labCommentSchema = new Schema({
    labId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'LabUser',
        required: true,
    },

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    userName:{
        type:String,
        required:true,

    },

    commentText:{
        type:String,
        required:true
    },

    createdAt:{
        type:Date,
        default:Date.now
    },
}, {timestamps: true})


export default mongoose.model('CommentLab', labCommentSchema)
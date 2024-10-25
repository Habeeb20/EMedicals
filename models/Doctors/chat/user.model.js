import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    profilePicture:{
        type:String,
        
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
    },
}, { timestamps: true }); 

const User = mongoose.model("User1", userSchema);
export default User;
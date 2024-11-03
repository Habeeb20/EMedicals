import mongoose from "mongoose"
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['admin', 'doctor', 'nurse', 'patient'] },
    specialization: String, 
    profilePicture: String,
});

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

export default mongoose.model('HUser', UserSchema);

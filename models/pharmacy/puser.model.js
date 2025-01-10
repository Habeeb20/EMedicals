import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const puserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone:{type:String, required: true},
    state:{type:String, required:true},
    LGA:{type:String, required: true},
    address:{type:String, required: true}
}, { timestamps: true });

puserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model('PUser', puserSchema);

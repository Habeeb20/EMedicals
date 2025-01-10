import mongoose from 'mongoose';

const drugSchema = new mongoose.Schema({
    pharmacyId: { type: mongoose.Schema.Types.ObjectId, ref: 'PUser', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    image: { type: String, },
}, { timestamps: true });

export default mongoose.model('Drug', drugSchema);

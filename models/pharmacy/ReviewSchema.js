import mongoose from "mongoose"

const ReviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'PUser', required: true },
    drug: { type: mongoose.Schema.Types.ObjectId, ref: 'Drug', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true }
});

export default mongoose.model('Review', ReviewSchema);

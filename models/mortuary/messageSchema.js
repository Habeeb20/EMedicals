import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderEmail: {
        type: String,
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mortuary', 
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
});

export default mongoose.model('Message', messageSchema);

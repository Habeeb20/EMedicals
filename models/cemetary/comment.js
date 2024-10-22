import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  mortuaryId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Cemetery', 
    required: true,
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  userName: {
    type: String,
    required: true,
  },
  commentText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('CommentCemetery', commentSchema);

// models/Comment.js

import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Comment schema
const commentSchema = new Schema({
  mortuaryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mortuary', 
    required: true,
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

export default mongoose.model('Comment', commentSchema);

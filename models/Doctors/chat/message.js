import mongoose from "mongoose"

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User1",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User1",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read:{type:Boolean, default:false},
  },
  { timestamps: true }
)

const Message = mongoose.model("Message", messageSchema)

export default Message
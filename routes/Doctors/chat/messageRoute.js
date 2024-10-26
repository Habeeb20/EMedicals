import express from "express"
import { isAuthenticate } from "../../../middleware/authMiddleware.js"
import { getMessage,sendMessage } from "../../../controllers/doctors/chat/messageController.js"
import Message from "../../../models/Doctors/chat/message.js"


const messagechatrouter =express.Router()

messagechatrouter.get("/:id", isAuthenticate, getMessage)
messagechatrouter.post("/send/:id", isAuthenticate, sendMessage)



messagechatrouter.get('/users/:id/unread-messages', async(req, res) => {
    try {
        const count = await Message.countDocuments({ receiver: req.params.id, read: false });
        res.json({ count });
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch unread message count' });
      }
})


messagechatrouter.patch('/messages/:id/read', async(req, res) => {
    try {
        const message = await Message.findByIdAndUpdate(
          req.params.id,
          { read: true },
          { new: true }
        );
        res.json(message);
      } catch (err) {
        res.status(500).json({ error: 'Failed to update message status' });
      }
})

export default messagechatrouter
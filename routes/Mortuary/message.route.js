import express from "express"
import { sendMessage, getMortuaryMessages, getUserMessages } from "../../controllers/mortuary/message.controller.js"
import { verifyToken } from "../../middleware/verifyToken.js"

const messageRouter = express.Router()


messageRouter.post("/sendmessage", verifyToken, sendMessage)
messageRouter.get("/getusermessage", verifyToken, getMortuaryMessages)
messageRouter.get("/getmortuarymessage/:id", verifyToken, getMortuaryMessages)


export default messageRouter
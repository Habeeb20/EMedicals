import express from "express"
import { getComments, postComment } from "../../controllers/Undertaker/undertakerComment.js"


const undertakerCommentRouter = express.Router()


undertakerCommentRouter.post("/cdetails/:id/comment", postComment)
undertakerCommentRouter.get("/cdetails/:id/comment", getComments)


export default undertakerCommentRouter
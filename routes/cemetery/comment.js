import express from "express"
import { postComment,getComments } from "../../controllers/cemetary/comment.controller.js"

const cemeteryCommentRouter = express.Router();


cemeteryCommentRouter.post("/cdetails/:id/comments", postComment)
cemeteryCommentRouter.get("/cdetails/:id/comments", getComments)


export default cemeteryCommentRouter
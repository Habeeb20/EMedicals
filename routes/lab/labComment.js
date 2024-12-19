import express from "express"
import { postComment, getComments } from "../../controllers/Lab/commentLab.Controller.js"

const labcommentRouter = express.Router();



labcommentRouter.post("/ldetails/:id/comments", postComment)
labcommentRouter.get("/ldetails/:id/comments", getComments)



export default labcommentRouter
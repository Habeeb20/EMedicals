import express from "express"
import { postComment,getComments } from "../../controllers/mortuary/mortuaryComment.js"

const mortuaryCommentRouter= express.Router()


mortuaryCommentRouter.post('/mortuarydetails/:id/comments', postComment)
mortuaryCommentRouter.get('/mortuarydetails/:id/comments', getComments)


export default mortuaryCommentRouter
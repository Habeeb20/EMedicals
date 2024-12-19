import LabComment from "../../models/Lab/LabComment.js";

export const postComment = async(req, res) => {
    const {userName, commentText, userId} = req.body;
    const {id} = req.params

    try {
        const newComment = new LabComment({
            labId:id,
            userId,
            userName,
            commentText,
        })

        await newComment.save()
        res.status(201).json(newComment);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Error adding comment'})
    }
}

export const getComments = async(req, res) => {
    const {id} = req.params;

    try {
        const comments = await LabComment.find({labId: id}).populate('userId', 'name');
        res.status(200).json(comments)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'error fetching comments', error})
    }
}
import Comment from "../../models/cemetary/comment.js";

export const postComment = async (req, res) => {
    const { userName, commentText } = req.body; 
    const { id } = req.params; 
  
    try {
      const newComment = new Comment({
        mortuaryId: id, 
        userName,
        commentText,
      });
  
      await newComment.save();
      res.status(201).json(newComment);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error adding comment', error });
    }
  }

  export const getComments = async (req, res) => {
    const { id } = req.params;
  
    try {
      const comments = await Comment.find({ mortuaryId: id }) 
        .populate('userId', 'name'); 
      res.status(200).json(comments);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error fetching comments', error });
    }
  }
  
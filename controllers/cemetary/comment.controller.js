import CommentCemetery from "../../models/cemetary/comment.js";

export const postComment = async (req, res) => {
  const { userName, commentText, userId } = req.body;  // Include userId in the request body
  const { id } = req.params; // mortuaryId from URL params

  try {
    const newComment = new CommentCemetery({
      mortuaryId: id,
      userId,        
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
      const comments = await CommentCemetery.find({ mortuaryId: id }) 
        .populate('userId', 'name'); 
      res.status(200).json(comments);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error fetching comments', error });
    }
  }
  
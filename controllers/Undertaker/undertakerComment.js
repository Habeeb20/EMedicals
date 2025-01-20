import commentUndertaker from "../../models/underTaker/commentUndertaker.js";

export const postComment = async (req, res) => {
    const { userName, commentText, userId } = req.body;  
    const { id } = req.params; 
  
    try {
      const newComment = new commentUndertaker({
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
      const comments = await commentUndertaker.find({ mortuaryId: id }) 
        .populate('userId', 'name'); 
      res.status(200).json(comments);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error fetching comments', error });
    }
  }
  
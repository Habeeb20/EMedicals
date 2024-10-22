
import Comment from "../../models/mortuary/mortuaryComment.js";
import jwt from "jsonwebtoken"; 


const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';



// export const postComment = async (req, res) => {
//   try {
//     const { mortuaryId, commentText } = req.body;
//     const token = req.headers.authorization.split(' ')[1]; 

//     if (!token) {
//       return res.status(401).json({ message: 'Authorization token is missing' });
//     }


//     const decoded = jwt.verify(token, JWT_SECRET);

  
//     const userId = decoded.id;


//     const newComment = new Comment({
//       mortuaryId,
//       userId, 
//       userName: req.body.userName,
//       commentText,
//     });

//     await newComment.save();

//     res.status(201).json(newComment);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Something went wrong', error });
//   }
// };


export const postComment = async (req, res) => {
  const { userName, commentText  } = req.body; 
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

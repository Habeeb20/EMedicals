import User from "../../../models/Doctors/chat/user.model.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../../../jwt/generateToken.js";
import cloudinary from "cloudinary"

export const getUserForSidebar = async (req, res, next) => {
  try {
    const loggedInUserId = req.user.id

    const allUserExceptLoggedIn = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password")

    res.status(200).json(allUserExceptLoggedIn)
  } catch (error) {
    next(error)
  }
}



export const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id; // Getting the user ID from the request params

    const user = await User.findById(userId).select("-password"); // Exclude password field

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error); // Pass any errors to the error handler middleware
  }
};
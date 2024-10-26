import User from "../../../models/Doctors/chat/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary"
import { errorHandler } from "../../../utils/error.js";

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret:process.env.CLOUDINARY_API_SECRET,
// })





export const signup = async (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body;
    const missingFields = [];
  
    if (!username) missingFields.push("username");
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");
    if (!confirmPassword) missingFields.push("confirmPassword");
    if (!req.file) missingFields.push("profilePicture");
  
    if (missingFields.length > 0) {
      console.log("Missing fields detected:", missingFields);
      return res.status(400).json({ message: "All fields are required", missingFields });
    }
  
    try {
      const validUser = await User.findOne({ email });
      if (validUser) {
        return next(errorHandler(400, "User already exists"));
      }
  
      if (password !== confirmPassword) {
        return next(errorHandler(400, "Passwords don't match"));
      }
  
      const hashedPassword = bcryptjs.hashSync(password, 10);
      const result = await cloudinary.v2.uploader.upload(req.file.path);
      const profilePicture = result.secure_url;
  
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        profilePicture,
      });
  
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
  
      await newUser.save();
  
      res.cookie("access_token", token, { httpOnly: true }).status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
      });
    } catch (error) {
      next(error);
    }
  };
  

  export const login = async (req, res, next) => {
    try {
      const { email, password } = req.body
  
      const validUser = await User.findOne({ email })
  
      if (!validUser) {
        return next(errorHandler(404, "User not found"))
      }
  
      const validPassword = bcryptjs.compareSync(password, validUser.password)
  
      if (!validPassword) {
        return next(errorHandler(401, "Wrong Credentials"))
      }
  
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
  
      res.cookie("access_token", token, { httpOnly: true }).status(200).json({
        _id: validUser._id,
        username: validUser.username,
        email: validUser.email,
        profilePic: validUser.profilePic,
      })
    } catch (error) {
      next(error)
    }
  }
  
  export const logout = (req, res) => {
    try {
      res.clearCookie("access_token")
  
      res.status(200).json({
        message: "User has been loggged out successfully!",
      })
    } catch (error) {
      next(error)
    }
  }
  
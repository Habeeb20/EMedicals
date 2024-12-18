import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose"
import { protect4 } from "../middleware/authMiddleware.js";
import pkg from "cloudinary";
import Wellness from "../models/wellness.js";

const { v2: cloudinary } = pkg;

const router = express.Router()
// Cloudinary setup
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: 624216876378923,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });



const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: { folder: "schools" },
  });


 export const registerwellness = async(req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        res.status(400).json({message:"fill in the required form"})
    }

    const existingwellness = await Wellness.findOne({email})
    if(existingwellness){
        res.status(400).json({message:"email already  exist"})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const wellness = new Wellness({
        name,
        email,
        password:hashedPassword
    })

    await wellness.save();

    res.status(200).json({
        message: "User registered successfully.",
      
      });
  }


  export const loginwellness = async(req, res) => {
    const {email, password}  = req.body;
    if(!email || !password) {
        res.status(400).json({message: "email and password is required"})

    }
  

  const user = await Wellness.findOne({email})
  if(!user){
    res.status(404).json({message:"invalid email"})
  }

  const isPasswordValid = await bcrypt.compare(password, user?.password);
  if (!isPasswordValid) {
    res.status(404);
    throw new Error("Invalid  password.");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.status(200).json({
    message:"Login successful",
    token, user})
  }


  
  export const wellnessdashboard =async(req, res) => {
    const userId = req.user.id;

    const user = await Wellness.findById(userId);
    if (!user) {
      res.status(404);
      throw new Error("User not found.");
    }

    res.status(200).json(user);

  }

  
 export const editwellness= async(req, res) => {
    const {id} = req.params

    const wellness = await Wellness.findById(id);
    if (!wellness) {
      res.status(404).json({message:"this is  not found."});
    }

    if (wellness._id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Not authorized to update this wellness.");
      }
      const updates = { ...req.body };

      const uploadFile = async (file) => {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "schools",
        });
        return result.secure_url;
      };

      if (req.files) {
        if (req.files.picture1) {
          updates.picture1 = await uploadFile(req.files.picture1);
        }
    }

    const updatedwellness = await Wellness.findByIdAndUpdate(id, updates, {
        new: true,
      });
      if (!updatedwellness) {
        res.status(500);
        throw new Error("Failed to update exam.");
      }
      res.status(200).json({
        message: "updated successfully.",
        updatedwellness,
      });


  }


export const getallwellness = async(req, res) => {
    try {
      const exam = await Wellness.find({});
      res.json(exam);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }



export const getASingleWellness = async (req, res) => {
    

    console.log("Request parameters:", req.params);
    try {
      const { id } = req.params;
      console.log(req.params);
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log("id not found");
        return res
          .status(400)
          .json({ success: false, message: "Invalid user ID" });
      }
  
      const wellness = await Wellness.findById(id);
  
      if (!wellness) {
        console.log("exam not found");
        return res
          .status(404)
          .json({ success: false, message: "wellness center not found" });
      }
  
      res.status(200).json({
        success: true,
       wellness
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Something went wrong" });
    }


} 
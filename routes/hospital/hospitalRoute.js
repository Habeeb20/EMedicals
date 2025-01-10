import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Hospital from "../../models/hospitals/hospitalSchema.js";
import asyncHandler from "express-async-handler";
import pkg from "cloudinary";

import mongoose from "mongoose";
import { protect5 } from "../../middleware/authMiddleware.js";
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


  router.post("/hregister", async (req, res) => {
      const { fullname, email, password, role } = req.body;
  
      if (!fullname || !email || !password || !role) {
        res.status(400);
        throw new Error("all fields are required.");
      }
  
      const existinghospital = await Hospital.findOne({ email });
      if (existinghospital) {
        res.status(400);
        throw new Error("User with this email already exists.");
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const exam = new Hospital({
        fullname,
        email,
        role,
        password: hashedPassword,
      });
  
      await exam.save();
  
      res.status(201).json({
        message: "User registered successfully.",
        exam,
      });
    });



  router.post("/h/login", asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("email and password are required.");
      }
      const user = await Hospital.findOne({ email });
      if (!user) {
        res.status(404).json({ message: "Invalid username " });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
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
  
  }))






  router.get('/h/dashboard', protect5,  asyncHandler(async(req, res) => {
    const userId = req.user.id;

    const user = await Hospital.findById(userId);
    if (!user) {
      res.status(404);
      throw new Error("User not found.");
    }

    res.status(200).json(user);

  }))


  
  router.put("/h/:id", protect5, asyncHandler(async(req, res) => {
    const {id} = req.params

    const hospital = await Hospital.findById(id);
    if (!hospital) {
      res.status(404);
      throw new Error("hospital  not found.");
    }

    if (hospital._id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Not authorized to update this school.");
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
        if (req.files.picture2) {
          updates.picture2 = await uploadFile(req.files.picture2);
        }
        if (req.files.picture3) {
          updates.picture3 = await uploadFile(req.files.picture3);
        }
        if (req.files.picture4) {
          updates.picture4 = await uploadFile(req.files.picture4);
        }
        if (req.files.profilePicture) {
            updates.profilePicture = await uploadFile(req.files.profilePicture);
        }
    }

    const updatedHospital = await Hospital.findByIdAndUpdate(id, updates, {
        new: true,
      });
      if (!updatedHospital) {
        res.status(500);
        throw new Error("Failed to update hospital.");
      }
      res.status(200).json({
        message: "Exam updated successfully.",
        updatedHospital,
      });


  }))


   
  router.get("/anhospital/:id", async (req, res) => {
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
  
      const exam = await Hospital.findById(id);
  
      if (!exam) {
        console.log("hospital not found");
        return res
          .status(404)
          .json({ success: false, message: "hospital not found" });
      }
  
      res.status(200).json({
        success: true,
       exam
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Something went wrong" });
    }
  });



export default router
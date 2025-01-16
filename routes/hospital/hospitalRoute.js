import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import jwt from "jsonwebtoken";

import pkg from "cloudinary";
import User from "../../models/hospitals/hospitalSchema.js";
import mongoose from "mongoose";
import { protect20, restrictTo } from "../../middleware/authMiddleware.js";
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

 
  

  const JWT_SECRET = "jwt_secret"; 
  
  // Register a user
  router.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
      const userExists = await User.findOne({ email });
      if (userExists) return res.status(400).json({ message: "User already exists" });
  
      const user = await User.create({ name, email, password, role });
      res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Login a user
  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const isPasswordMatch = await user.matchPassword(password);
      if (!isPasswordMatch) return res.status(401).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
      res.json({ token, user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


// Get all users
// router.get("/", protect20, restrictTo("Admin"), async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Add a user
router.post("/", protect20, restrictTo("Admin"), async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = await User.create({ name, email, password, role });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a user
router.put("/:id", protect20, restrictTo("Admin"), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a user
router.delete("/:id", protect20, restrictTo("Admin"), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



  
  export default router;
  
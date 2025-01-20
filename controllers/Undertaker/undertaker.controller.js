import mongoose from "mongoose";
import Undertaker from "../../models/underTaker/undertaker.js";
import multer from "multer";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import pkg from "cloudinary"



const {v2: cloudinary} = pkg;



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: 624216876378923,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: { folder: "schools" },
  });


  export const registerUndertaker = async(req, res) => {
    const {name, email, password, location} = req.body;

    if(!name || !email ||!password || !location) {
        res.status(400).json({message:"fill in the gap form"})
    }

    const existingUndertaker =await Undertaker.findOne({email})
    if(existingUndertaker){
        res.status(400).json({message: "email already exist"})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const undertaker = new Undertaker({
        name,
        email,
        password:hashedPassword,
        location

    })

    await undertaker.save()

    res.status(200).json({
        message: "user registered successfully"
    })
  }



  export const loginUndertaker = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400).json({message: "email and password required"})
    }

    const user = await Undertaker.findOne({email})
    if(!user) {
        res.status(404).json({message: "invalid email"})
    }


    const isPasswordValid = await bcrypt.compare(password, user?.password)
    if(!isPasswordValid){
        console.log("not correct")
        return res.status(404).json({message:"invalid password"})
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

   return res.status(200).json({
        message:"Login successful",
        token, user
    })
  }


  export const undertakerdashboard = async(req, res) => {
    const userId = req.user.id;

    const user = await Undertaker.findById(userId);
    if(!user){
        res.status(404).json({message: "user not found"})
    }

    res.status(200).json(user)
  }


  export const editUndertaker = async(req, res) => {
    const {id} = req.params

    const undertaker = await Undertaker.findById(id);
    if(!undertaker){
        res.status(404).json({message: "your details not found"})
    }

    if(undertaker._id.toString() !==req.user.id){
        res.status(403);
        throw new Error("Not authorized to update this wellness.");
    }

    const updates = { ...req.body };

    const uploadFile = async (file) => {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "schools",
        });
        return result.secure_url;
    }
    
    if (req.files) {
        if (req.files.picture1) {
          updates.picture1 = await uploadFile(req.files.picture1);
        }
    }

    const updatedUndertaker = await Undertaker.findByIdAndUpdate(id, updates, {
        new: true
    });
    if(!updatedUndertaker){
        res.status(500).json({message: "failed to update undertaker account"})
    }

    res.status(200).json({
        message: "updated successfully.",
        updatedUndertaker
      });

  }


  
export const getallundertakers = async(req, res) => {
    try {
      const exam = await Undertaker.find({});
      res.json(exam);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }


  
export const getASingleUndertaker = async (req, res) => {
    

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
  
      const undertaker = await Undertaker.findById(id);
  
      if (!undertaker) {
        console.log("undertaker not found");
        return res
          .status(404)
          .json({ success: false, message: "undertaker center not found" });
      }
  
      res.status(200).json({
        success: true,
       undertaker
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Something went wrong" });
    }


} 
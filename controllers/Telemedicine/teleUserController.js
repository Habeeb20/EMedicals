import express from "express"
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose"
import pkg from "cloudinary";
import nodemailer from "nodemailer";
import TeleUser from "../../models/Telemedicine/tUserModel.js";
const { v2: cloudinary } = pkg;

const router = express.Router()
// Cloudinary setup
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: 624216876378923,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });



  const transporter = nodemailer.createTransport(({
    service:'gmail',
    auth: {
        user:"essentialng23@gmail.com",
        pass:"awpqyxoujmcgoemh"
      },
}));



const sendOTPEmail = async(email, otp) => {
    const mailOptions = {
        from:process.env.EMAIL_USER,
        to:email,
        subject: 'Verify your email',
        text: `Your verification code is: ${otp}`,

    };
    
  await transporter.sendMail(mailOptions);
}
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: { folder: "schools" },
  });


  export const registerTeleUser = async(req, res) => {
    const {path,firstName, lastName, email, phone, NameOfBusiness, password} = req.body
 
    if(!path || !firstName || !lastName || !email || !phone || !NameOfBusiness || !password){
        res.status(400).json({message: "please fill in all the required"})
    }

    const existteleuser = await TeleUser.findOne({email})
    if(existteleuser){
        res.status(400).json({message: "email already exist"})
    }

    const hashedPassword= await bcrypt.hash(password, 10)


    const teleuser = new TeleUser({
        path,
        firstName, 
        lastName, 
        email, 
        phone, 
        NameOfBusiness, 
        password:hashedPassword
    })
    await teleuser.save()

    res.status(200).json({
        message:"User registered successfully"
    })
  }


  export const loginTeleUser = async(req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        res.status(400).json({message: "email and password"})
    }

    const user = await TeleUser.findOne({email})
    if(!user){
      res.status(404).json({message:"invalid email"})
    }


    const isPasswordValid = await bcrypt.compare(password, user?.password)
    if(!isPasswordValid){
        res.status(404).json({message: "invalid password"})
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        expiresIn:"7d",
    })

    res.status(200).json({
      message:"Login successful",
      token, user
    })
  }


  export const teledashboard = async(req, res) => {
    const userId = req.user.id;


    const user = await TeleUser.findById(userId);
    if(!user){
      res.status(404).json({message: "user not found"})
    }


    res.status(200).json(user)
  }


  export const editTelUser = async (req, res) => {
    const {id} = req.params
    const user = await TeleUser.findById(id);
    if(!user){
      res.status(404).json({message: "this is not found"})
    }

    if(user._id.toString() !==req.user.id){
      res.status(403).json({message: "not authorized to update this"})
    }

    const updates = {...req.body};

    const uploadFile = async (file) => {
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder:"schools",
      });
      return result.secure_url
    };

    if(res.files){
      if (req.files.picture1) {
        updates.picture1 = await uploadFile(req.files.picture1);
      }
    }

    const updatedteleUser = await TeleUser.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if(!updatedteleUser) {
      res.status(500).json({message: "failed to update exam"});

    }

    res.status(200).json({message: "details updated successfully", updatedteleUser})
  }


  export const getallTeleuser = async(req, res) => {
    try {
      const tele = await TeleUser.find({});
      res.status(200).json({tele})
    } catch (error) {
      res.status(500).json({error: err.message})
    }
  }

  export const getAsingleTeleUser = async (req, res) => {

    console.log("request parameters:", req.params)
  

  try {
    const {id} = req.params;
    console.log(req.params);

    if(!mongoose.Types.ObjectId.isValid(id)){
      console.log("id not fount");
      return res.status(400).json({message: "invalid user id"})
    }

    const user = await TeleUser.findById(id);

    if(!user) {
      console.log("user not found")
      return res.status(404).json({success: false, message: "user not found"})
    }

    res.status(200).json({success:true, user})
  } catch (error) {
    console.error(error);
    res.status(500).json({success:false, message: "something went wrong"})
  }
}



export const forgotPassword = async (req, res) => {
	const { email } = req.body;
	try {
		const user = await TeleUser.findOne({ email });

		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

	  // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordToken = jwt.sign({ resetToken }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send an email with the reset link
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`;

    // Setup Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user:"essentialng23@gmail.com",
      pass:"clepxviuvbxqbedp"
    },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset',
      text: `You requested a password reset. Click the link below to reset your password: \n\n ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);

		res.status(200).json({ success: true, message: "Password reset link sent to your email" });
	} catch (error) {
		console.log("Error in forgotPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};



export const resetPassword = async (req, res) => {
	
    const { token } = req.params;
    const { newPassword } = req.body;

try {
  // Verify the reset token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { resetToken } = decoded;

  // Find the user by the token
  const user = await TeleUser.findOne({ resetToken });
  if (!user) {
    return res.status(404).json({ message: 'Invalid token' });
  }

  // Hash the new password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);

  await user.save();

  res.status(200).json({ message: 'Password reset successfully' });
} catch (err) {
  res.status(500).json({ message: 'Server error' });
}
};

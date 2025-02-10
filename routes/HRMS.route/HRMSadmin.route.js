import Admin from "../../models/HRMS/HRMSauth.schema.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import express from "express"
import {verifyToken} from "../../middleware/verifyToken.js"
import nodemailer from "nodemailer"
const HRMSauthRouter = express.Router()


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


const generateToken = (id) => {
    return jwt.sign({ id }), process.env.JWT_SECRET, {expires: '30d'}
}


HRMSauthRouter.post("/signup", async(req,res) => {
    const { name, email, password } = req.body;
    try {
      const adminExists = await Admin.findOne({ email });
      if (adminExists) return res.status(400).json({ message: 'Admin already exists' });

     const admin = await Admin.create({ name, email, password });
     res.status(201).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
     
      });
    } catch (error) {
        res.status(500).json({ message: error.message });
      }
})


HRMSauthRouter.post("/login", async(req, res) => {
    const {email, password} = req.body

    try {
        const existEmail = await Admin.findOne({email})
        if(!existEmail && (await password !== existEmail.password)){
            return res.status(404).json({message: "invalid credentials"})
        }
       const token = jwt.sign({id: existEmail._id}, process.env.JWT_SECRET, {expiresIn:"30d"})
        return res.status(200).json({
          token, existEmail
           
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
})


HRMSauthRouter.get("/dashboard", verifyToken, async(req, res) => {
    const id = req.user.id
    try {
        const user = await Admin.findById(id)
        if(!user) return res.status(404).json({message:"details not found"})
        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({messsage: error.message})
    }
})



HRMSauthRouter.post("/forgot-password", async(req, res) => {
    const { email } = req.body;
    try {
    const user = await Admin.findOne({ email });
  
    if (!user) {
      console.log("user not found")
      return res.status(400).json({ success: false, message: "User not found" });
    }
  
    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordToken = jwt.sign({ resetToken }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
    const resetLink = `https://ereligion.ng/reset-password/${resetPasswordToken}`;
  
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
  })
  
  
  
  HRMSauthRouter.post("/reset-password/:token", async(req, res)=> {
    const { token } = req.params;
    const { newPassword } = req.body;
  
    try {
        // Verify the reset token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { resetToken } = decoded;
    
        // Find the user by the token
        const user = await Admin.findOne({ resetToken });
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
  })


export default HRMSauthRouter
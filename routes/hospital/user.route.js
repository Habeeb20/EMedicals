import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../../models/hospitals/userSchema.js"

import crypto from 'crypto'
import nodemailer from "nodemailer"
import cloudinary from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
})


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

const router = express.Router();

// Register Admin
router.post("/userregister", async (req, res) => {
  
  try {
   
    const { name, email, password, role } = req.body;

    console.log(req.body)
    const missingFields = [];
    if (!name) missingFields.push('name');
    if (!email) missingFields.push('email');
    if (!password) missingFields.push('password');
    if (!role) missingFields.push('role');
    
    if (missingFields.length > 0) {
      console.log(`The following fields are required: ${missingFields.join(', ')}`)
      return res.status(400).json({
        
        message: `The following fields are required: ${missingFields.join(', ')}`,
      });
    }
   
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString(); // OTP generation
    const uniqueNumber = `RL-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    const verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours


    const result = await cloudinary.v2.uploader.upload(req.file.path);
    const profilePicture = result.secure_url;

    const newUser = new User({ name, email, password: hashedPassword, role,  profilePicture, uniqueNumber,
      verificationToken,
      verificationTokenExpiresAt,
   });
    await newUser.save();
    await sendOTPEmail(newUser.email, verificationToken);
    res.status(201).json({ message: "Admin registered successfully!" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message });
  }
});


// Login
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ id: user._id, role: user.role }, "secretkey", { expiresIn: "1h" });
      res.status(200).json({ token, user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  export default router;
import express from "express"
import jwt from "jsonwebtoken"
import Seller from "../../models/medicalPhamarcy/Seller.js"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import { verifyToken } from "../../middleware/verifyToken.js"
import nodemailer from "nodemailer"

const medicalPhamarcysellerrouter = express.Router()



const transporter = nodemailer.createTransport(({
    service:'gmail',
    auth: {
        user:"essentialng23@gmail.com",
        pass:"clepxviuvbxqbedp"
  
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
    







const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '30d'})

medicalPhamarcysellerrouter.post('/signup', async (req, res) => {
    const { name, email, password, phone,state, LGA, location } = req.body;

    try {
        const existingSeller = await Seller.findOne({ email });
        if (existingSeller) return res.status(400).json({ error: 'Seller already exists' });


   
    const uniqueNumber = `RL-${crypto
    .randomBytes(3)
    .toString("hex")
    .toUpperCase()}`;

        const seller = new Seller({ name, email, password, phone, state, LGA, location, uniqueNumber });
        await seller.save();

        res.status(201).json({ 
            id: seller._id, 
            name: seller.name, 
            email: seller.email, 
            phone: seller.phone,
            state: seller.state,
            LGA:seller.LGA,
            location:seller.location,
            token: generateToken(seller._id) 
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
});

// Seller Login
medicalPhamarcysellerrouter.post('/login', async (req, res) => {
    

    try {
        const { email, password } = req.body;
        const seller = await Seller.findOne({ email });
        if (!seller &&(await password !== seller.password) ) {
            return res.status(400).json({ message: 'Invalid email' });
        }
      

        res.json({ 
            id: seller._id, 
            name: seller.name, 
            email: seller.email, 
            token: generateToken(seller._id) 
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
});



medicalPhamarcysellerrouter.get('/dashboard', verifyToken, async(req, res) => {
    const userId = req.user.id

    try {
        const user = await Seller.findById(userId)
        if(!user) {
            return res.status(404).json({message:"user not found"})
        }

        return res.status(200).json(user)
    } catch (error) {
        
    }

})


medicalPhamarcysellerrouter.post("/forgot-password", async(req, res) => {
    const { email } = req.body;
    try {
    const user = await Seller.findOne({ email });
  
    if (!user) {
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
  
  
  
medicalPhamarcysellerrouter.post("/reset-password", async(req, res)=> {
    const { token } = req.params;
    const { newPassword } = req.body;
  
    try {
        // Verify the reset token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { resetToken } = decoded;
    
        // Find the user by the token
        const user = await Seller.findOne({ resetToken });
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
  

export default medicalPhamarcysellerrouter;
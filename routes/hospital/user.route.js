import express from "express"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../../models/hospitals/userSchema.js"
import crypto from 'crypto'
import nodemailer from "nodemailer"
import cloudinary from "cloudinary"
import { protect2 } from "../../middleware/protect.js"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
})


const transporter = nodemailer.createTransport(({
  service:'gmail',
  auth: {
        pass:"pknseuxqxzkoqdjg",
        user:"babatundeademola112@gmail.com"
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

router.post("/userregister", async (req, res) => {
  try {
    const { name, email, password, role } = req.body; // Include profilePicture from the request body
    console.log(req.body);

    // Validate required fields
    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");
    if (!role) missingFields.push("role");


    if (missingFields.length > 0) {
      console.log(
        `The following fields are required: ${missingFields.join(", ")}`
      );
      return res.status(400).json({
        message: `The following fields are required: ${missingFields.join(
          ", "
        )}`,
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User exists");
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Generate a verification token and unique number
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString(); // OTP generation
    const uniqueNumber = `RL-${crypto
      .randomBytes(3)
      .toString("hex")
      .toUpperCase()}`;
    const verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    // Save the user to the database
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,

      uniqueNumber,
      verificationToken,
      verificationTokenExpiresAt,
    });

    await newUser.save();

    // Send OTP email
    await sendOTPEmail(newUser.email, verificationToken);

    res.status(201).json({ message: "Admin registered successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});


// Login
router.post("/userlogin", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ id: user._id, role: user.role }, "secretkey", { expiresIn: "1h" });
      res.status(200).json({ token, user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  router.get("/dashboardhospital", protect2, async(req, res) => {
    const userId = req.user.id;

    const user = await User.findById(userId)
    if(!user){
      res.status(404);
      throw new Error("user not found")
    }

    res.status(200).json(user);
  })


  router.put("/editdashhospital", protect2, async(req, res) => {
    const {id} = req.params

    const dashboard = await User.findById(id)
    if(!dashboard){
      res.status(404).json({message: "this is not found"})
    }

    if(dashboard._id.toString() !== req.user.id) {
      res.status(403);
      throw new Error("not authorized to update this dashboard")
    }
    const updates = { ...req.body };

    const uploadFile = async (file) => {
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "schools",
      });
      return result.secure_url;
    };

    
    if (req.files) {
      if (req.files.profilePicture) {
        updates.picture1 = await uploadFile(req.files.profilePicture);
      }
    }
    const updatedwellness = await User.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedwellness) {
      res.status(500);
      throw new Error("Failed to update dashboard.");
    }
    res.status(200).json({
      message: "updated successfully.",
      updatedwellness,
    });


  })

  export default router;
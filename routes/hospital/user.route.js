import express from "express"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../../models/hospitals/userSchema.js"
import crypto from 'crypto'
import nodemailer from "nodemailer"
import cloudinary from "cloudinary"
import { isAdmin, protect2 } from "../../middleware/protect.js"
import { restrictTo } from "../../middleware/authMiddleware.js"
import { verifyToken, verifyToken2 } from "../../middleware/verifyToken.js"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
})


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

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find({}); // Fetch all users
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }
    console.log(users)
    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching users.",
    });
  }
});


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
  
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
      res.status(200).json({ token, user });
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err.message });
    }
  });


  router.get("/dashboardhospital", protect2, async(req, res) => {
    const userId = req.user.id;

    const user = await User.findById(userId).populate('adminId', 'name email')
    if(!user){
      res.status(404);
      throw new Error("user not found")
    }

    res.status(200).json(user);
  })


  router.put("/editdashhospital/:id", protect2, async(req, res) => {
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



  
// Get all users
router.get("/getusers/:role", verifyToken, isAdmin, async (req, res) => {
  try {

    const { role } = req.params;
    if (!['doctor', 'nurse', 'patient'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }
    const users = await User.find({ role, adminId: req.user._id });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//get all users for the Admin 
router.get("/getusersByrole", verifyToken, isAdmin, async (req, res) => {
  try {
    const { role } = req.query;  
    if (!role) {
      return res.status(400).json({ error: "Role is required" });
    }
    const users = await User.find({ adminId: req.user.id, role });
    res.status(200).json(users);
  } catch (error) {

    res.status(500).json({ error: "Failed to fetch users" });
  }
});



router.get("/getUsersGroup", verifyToken2, async (req, res) => {
  try {

    const { adminId } = req.user
   
    const admin = await User.findById(adminId);
    if (!admin) {
      return res.status(400).json({ error: "Admin ID is missing or invalid" });
    }

    const { role } = req.query; 

  
    const query = { adminId }; 
    if (role) {
      query.role = role; 
    }

   
    const users = await User.find(query);

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found under this admin" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});


// Add a user
router.post("/addusers", protect2, isAdmin, async (req, res) => {
  const { name, email, password, role } = req.body;
  try {

    if (!['doctor', 'nurse', 'patient'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User exists");
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);


    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString(); // OTP generation
    const uniqueNumber = `RL-${crypto
      .randomBytes(3)
      .toString("hex")
      .toUpperCase()}`;
    const verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours


    const user = await User.create({ name, email, password:hashedPassword, role,  adminId: req.user._id, 
      uniqueNumber,
      verificationToken,
      verificationTokenExpiresAt, });

      await sendOTPEmail(user.email, verificationToken);
    res.status(201).json(user);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
});

// Update a user
router.put("/users/:id", protect2, restrictTo("Admin"), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a user
router.delete("/users/:id", protect2,  restrictTo("Admin"), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


//get all nurses
router.get("/nursegetall", async (req, res) => {
  try {
    const allNurses = await User.find({ role: "nurse" }).populate("adminId", "name email");
    
    if (!allNurses || allNurses.length === 0) {
      return res.status(404).json({ message: "No nurses found" });
    }

    return res.status(200).json(allNurses);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

//get all doctors
router.get("/doctorgetall", async (req, res) => {
  try {
    const allNurses = await User.find({ role: "doctor" }).populate("adminId", "name email");
    
    if (!allNurses || allNurses.length === 0) {
      return res.status(404).json({ message: "No doctor found" });
    }

    return res.status(200).json(allNurses);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});




router.get("/hospitalgetall", async (req, res) => {
  try {
    const allNurses = await User.find({ role: "admin" });
    
    if (!allNurses || allNurses.length === 0) {
      return res.status(404).json({ message: "No hospital found" });
    }

    return res.status(200).json(allNurses);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});



router.post("/forgot-password", async(req, res) => {
  const { email } = req.body;
  try {
  const user = await User.findOne({ email });

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



router.post("/reset-password/:token", async(req, res)=> {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
      // Verify the reset token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { resetToken } = decoded;
  
      // Find the user by the token
      const user = await User.findOne({ resetToken });
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



  export default router;
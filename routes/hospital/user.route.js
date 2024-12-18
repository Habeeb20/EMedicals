import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../../models/hospitals/userSchema.js"


const router = express.Router();

// Register Admin
router.post("/register", async (req, res) => {
  try {
    const { hospitalName, email, password, location } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ role: "admin", hospitalName, email, password: hashedPassword, location });
    await newUser.save();

    res.status(201).json({ message: "Admin registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
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
import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../../models/hospitals/userSchema.js"



const router = express.Router();


router.post("/create-user", async (req, res) => {
    try {
      const { name, email, password, role, hospitalName } = req.body;
  
      if (!["doctor", "nurse", "patient"].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword, role, hospitalName });
      await newUser.save();
  
      res.status(201).json({ message: `${role} account created successfully!` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  export default router;
import Admin from "../../models/HRMS/HRMSauth.schema.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import express from "express"
import {verifyToken} from "../../middleware/verifyToken.js"
const HRMSauthRouter = express.Router()

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




export default HRMSauthRouter
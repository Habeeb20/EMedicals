import express from "express"
import jwt from "jsonwebtoken"
import Seller from "../../models/medicalPhamarcy/Seller.js"
import bcryptjs from "bcryptjs"
import crypto from "crypto"
import { verifyToken } from "../../middleware/verifyToken.js"
const medicalPhamarcysellerrouter = express.Router()


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

export default medicalPhamarcysellerrouter;
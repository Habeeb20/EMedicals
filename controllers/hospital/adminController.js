import User from "../../models/hospitals/userSchema.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {auth} from "../../middleware/verifyToken.js"
export const createUserAccount = async (req, res) => {
    try {
        const { name, email, password, role, specialization, profilePicture } = req.body;
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role, 
            specialization: role === 'doctor' ? specialization : null, // Only doctors have specialization
            profilePicture,
        });

        await newUser.save();
        
        res.status(201).json({ message: 'User account created successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create user account' });
    }
};





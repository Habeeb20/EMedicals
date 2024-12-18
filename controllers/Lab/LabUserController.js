import LabModel from "../../models/Lab/Lab.Model.js";
import jwt from "jsonwebtoken"
import crypto from "crypto"
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { CloudinaryStorage } from "multer-storage-cloudinary";


import pkg from "cloudinary";


const { v2: cloudinary } = pkg;


export const registerAdmin = async( req, res) => {
    const {name, email, password, role, state, LGA, } = req.body;

    try{

        const existingAdmin = await LabModel.findOne({email})
        if(existingAdmin){
            return res.status(400).json({message: "Admin already exist with this email, please signin or register with a different email"})   
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const uniqueNumber = `RL-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;

        const admin = new LabModel({
            name, email, password: hashedPassword, role,  state, LGA, uniqueNumber
        });

        await admin.save()


    
        res.status(201).json({
                message: "Admin registered successfully.",
                admin:{...admin.doc, password: undefined},
             
            })
     

    }catch(error){
        console.log(error)
        res.status(500).json({message:"an error occured 'with the networ"})
    }
}


export const loginAdmin = async(req, res) => {
    const {email, password} = req.body;

    try {
        const user = await LabModel.findOne({email});
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
          }
      

        if(user && user.role === "admin") {
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
    
            res.status(200).json({
                success: true,
                message: 'Logged in successfully',
                user,
                token
                
              });
              console.log('user details', user, token)
            }
               
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const labdashboard = async (req, res) => {
     try {
        const userId = req.user.id;
        const user = await LabModel.findById(userId).select('-password')

        if(!user){
            return res.status(404).json({message:'user not found'})
        }

        res.status(200).json(user)
     } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong while fetching user profile' });
     }
}


export const editlabprofile = async(req, res) => {
    const {id} = req.params

    const dashboard = await LabModel.findById(id);
    if(!dashboard) {
        res.status(404).json({message: "this is not found"})
    }

    if(dashboard._id.toString() !== req.user.id){
        res.status(403).json({message:"not authorized to update this details"})
    }

    const updates = {...req.body};

    const uploadFile = async(file)=> {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder:"schools",
        });
        return result.secure_url;
    };

    if (req.files) {
        if (req.files.picture1) {
          updates.picture1 = await uploadFile(req.files.picture1);
        }
    }

    const updatedDashboard = await LabModel.findByIdAndUpdate(id, updates, {
        new: true,
    });
    if(!updatedDashboard) {
        res.status(500).json({message: "failed to update dashboard"})
    }

    res.status(200).json({message: "updated succesfully", updatedDashboard})

}



export const getAllLab = async(req, res) => {
    try {
        const allLab = await LabModel.find()
        console.log("this is labs!!!", allLab)
        res.status(200).json(allLab)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"an error with you the network while fetching the data"})
    }


}
import express from "express"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto"

import User from "../../models/hospitals/userSchema.js"
import HospitalResult from "../../models/hospitals/HospitalResult.js"
import mongoose from "mongoose"
import { verifyToken } from "../../middleware/verifyToken.js"


const hospitalresultRouter = express.Router()


hospitalresultRouter.post("/sendresult/:patientId", verifyToken, async(req, res) => {
    const {result,sickness, recommendation, observation} = req.body
    const patientId = req.params.patientId || req.body.patientId;

    try {
        const patient = await User.findById(patientId);
        if(!patient){
            console.log("patient not found")
            return res.status(404).json({message: "patient not found"})
        }
        console.log(patient)

        const admin = await User.findById(req.user.id)
        if(!admin){
            console.log("admin not found")
            return res.status(404).json({message: "admin not found"})
        }

        const newresult = new HospitalResult({
            adminId:new mongoose.Types.ObjectId(req.user.id),
            patientId: new mongoose.Types.ObjectId(patientId),
            sickness,
            result,
            recommendation,
            observation
        });

        await newresult.save();
        console.log("the result of the test", newresult)

        res.status(201).json(newresult)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to book appointment' });
    }
})

//get result for the patient
hospitalresultRouter.get("/getresult", verifyToken, async(req, res) => {
    const patientId = req.user.id

    if(!patientId ||  patientId === "undefined"){
        console.log("patient id not found")
        return res.status(404).json({error: "patient id is not found"})
    }

    try {
        const result = await HospitalResult.find({patientId}).populate('adminId')
        res.json(result)

    } catch (error) {
        console.log(error)
        res.status(500).json({error: "failed to fetch result"})
    }
})


//get result being sent to the patient for hospital

hospitalresultRouter.get("/getresultforhospital", verifyToken, async(req, res) => {
    try {
        const adminId = req.user.id;

        if(!mongoose.Types.ObjectId.isValid(adminId)){
            return res.status(400).json({message:"invalid admin Id"})
        }

        console.log("admin id", adminId);

        const adminExists =await User.findById(new mongoose.Types.ObjectId(adminId))
        if(!adminExists){
            return res.status(404).json({message:'Hospital admin not found'})
        }

        const result = await HospitalResult.find({adminId:new mongoose.Types.ObjectId(adminId)}).populate('patientId', 'name email')

        console.log("result found", result)

        return res.status(200).json(result)
    } catch (error) {
        console.error("Error fetching result:", error.message); 
    return res.status(500).json({ message: 'Server error', error: error.message }); 
    }
})

export default hospitalresultRouter
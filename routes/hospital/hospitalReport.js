import express from "express"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import mongoose from "mongoose"
import User from "../../models/hospitals/userSchema.js"
import HospitalResult from "../../models/hospitals/HospitalResult.js"
import mongoose from "mongoose"
import { verifyToken } from "../../middleware/verifyToken.js"

const hospitalresultRouter = express.Router()


hospitalresultRouter.post("/sendresult", verifyToken, async(req, res) => {
    const {result, recommendation, observation} = req.body
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


export default hospitalresultRouter
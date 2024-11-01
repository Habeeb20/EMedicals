import mongoose from "mongoose";
import PatientDonate from "../../models/Doctors/patientDonateSchema.js";



export const patientDonateRegister = async (req, res) => {
    const {kidney, heart, lungs, liver} =req.body

    try {
        const newPatientDonate = new PatientDonate({
            patientId: new mongoose.Types.ObjectId(req.user.id),
            kidney,liver, lungs, heart
        })
        await newPatientDonate.save();
        res.status(200).json(newPatientDonate)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'an error occured in the server'})
    }
}

export const getPatientDonate = async(req, res) => {
    const patientId = req.user.id

    try {
        const patientExist = await PatientDonate.find(new mongoose.Types.ObjectId(patientId))
        if(!patientExist){
            
            return res.status(404).json("patient does not exist")
        }

        const patient = await PatientDonate.find({patientId:new mongoose.Types.ObjectId(patientId)})
        res.status(200).json(patient)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "an error occured"})
    }
}
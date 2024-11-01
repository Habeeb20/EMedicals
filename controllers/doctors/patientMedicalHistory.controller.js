import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

import PatientMedical from "../../models/Doctors/patientMedicalHistory.schema.js";



export const registerMedicalHistory = async (req, res) => {
    const {
        chronicConditions, 
        surgeries, 
        hospitalized, 
        currentMedications, 
        bloodGroup, 
        bloodType, 
        genoType, 
        medicalConditions, 
        smokingOrAlcohol
    } = req.body;

    try {


        // Create new medical history record
        const newMedicalHistory = new PatientMedical({
            patientId: new mongoose.Types.ObjectId(req.user.id),
            chronicConditions,
            surgeries,
            hospitalized,
            currentMedications,
            bloodGroup,
            bloodType,
            genoType,
            medicalConditions,
            smokingOrAlcohol
        });

        // Save the record
        await newMedicalHistory.save();
        res.status(201).json(newMedicalHistory);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'An error occurred' });
    }
};



export const getMedicalHistory = async (req, res) => {
    try {
        const patientId = req.user;
        console.log("for medical history", patientId)
      
        const patientMedical = await PatientMedical.find({patientId:new mongoose.Types.ObjectId(patientId) })

        console.log("patient medical history found", patientMedical)
        res.status(200).json(patientMedical)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "an error occured"})
    }
}
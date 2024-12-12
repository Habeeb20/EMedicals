import mongoose from "mongoose";
import Appointment from "../../models/Telemedicine/teleAppointmentModel.js";
import bcrypt from "bcrypt"
import Doctor from "../../models/Telemedicine/tDoctorModel.js";


const authenticate = async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: "Unauthorized" });
    }
  };
  


export const addTeleDoctor = async(req, res) => {
    const userId = req.user?.id;
    console.log(userId)
    try {
        // if (req.user?.path !== "Healthcare Provider") 
        //     return res.status(403).json({ message: "Forbidden" });

        const { name, specialization, email } = req.body;
        const doctor = new Doctor({ name, specialization, email, hospital: userId });
        await doctor.save();
        res.status(201).json({ message: "Doctor added successfully" });
      } catch (err) {
        console.log(err)
        res.status(400).json({ error: err.message });
      }
}

export const getTeleDoctorforAdmin = async(req, res) => {

        try {
          if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
          const doctors = await Doctor.find({ hospital: req.user.id });
          res.json(doctors);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
   
      
}

export const postTeleAppointment  = async (req, res) => {
    try {
        const { userId, doctorId, date } = req.body;
        const appointment = new Appointment({ userId, doctorId, date });
        await appointment.save();
        res.status(201).json({ message: "Appointment booked successfully" });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

export const getTeleAppointment = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate("userId", "name email").populate("doctorId", "name specialization");
        res.json(appointments);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  
}


export const getAllTeleDoctors = async (req, res) => {
  
        try {
          const doctors = await Doctor.find().populate("hospital", "name");
          res.json(doctors);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
 
}
  
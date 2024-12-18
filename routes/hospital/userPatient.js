import express from "express";
import Appointment from "../../models/hospitals/hospitalSchema.js";
import User from "../../models/hospitals/userSchema.js"

const router = express.Router();

// View Available Doctors
router.get("/doctors", async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }, "name hospitalName location");
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Book Appointment
router.post("/book-appointment", async (req, res) => {
  try {
    const { patientId, doctorId, date, reason } = req.body;

    const newAppointment = new Appointment({ patientId, doctorId, date, reason });
    await newAppointment.save();

    res.status(201).json({ message: "Appointment booked successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

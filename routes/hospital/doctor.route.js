import express from "express";

import Doctor from "../../models/hospitals/DoctorSchema.js";
import { protect20, restrictTo } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Add a new doctor
router.post("/", protect20, restrictTo("Admin"), async (req, res) => {
  try {
    const { name, specialty } = req.body;
    const doctor = new Doctor({ name, specialty });
    await doctor.save();
    res.status(201).json({ message: "Doctor added successfully", doctor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a doctor
router.put("/:id", async (req, res) => {
  try {
    const { name, specialty } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, { name, specialty }, { new: true });
    res.json({ message: "Doctor updated successfully", doctor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a doctor
router.delete("/:id", async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

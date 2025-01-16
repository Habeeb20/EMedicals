import express from 'express';
import Appointment from '../../models/hospitals/appointmentSchema.js';
import HUser from '../../models/hospitals/userSchema.js';
import { verifyToken } from '../../middleware/verifyToken.js';


const hospitalrouter = express.Router();


hospitalrouter.post('/book', verifyToken, async (req, res) => {
  try {
    const { adminId, appointmentDate, sickness, appointmentTime, reasonForAppointment, patientDetails } = req.body;

   
    if (!adminId || !appointmentDate || !appointmentTime || !reasonForAppointment || !sickness) {
      console.log('All required fields must be filled')
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    const admin = await HUser.findById(adminId);
    console.log(admin)
    if (!admin || admin.role !== 'admin') {
      console.log("hospital not found")
      return res.status(404).json({ message: 'hospital not found' });
    }


    const appointment = new Appointment({
      patientId: req.user.id, 
      adminId,
      appointmentDate,
      appointmentTime,
      reasonForAppointment,
      sickness,
      patientDetails,
    });

    await appointment.save();

    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error booking appointment' });
  }
});

// Route for admin to retrieve all appointments
hospitalrouter.get('/appointments', verifyToken, async (req, res) => {
  try {
   
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

  
    const appointments = await Appointment.find({ adminId: req.user.id })
      .populate('patientId', 'name email phone') 
      .sort({ createdAt: -1 }); 

    res.status(200).json({ appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
});

export default hospitalrouter;

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




//route for the patient to delete appointment from the database


hospitalrouter.delete('/deleteAppointment/:id', verifyToken, async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const patientId = req.user.id; 

   
    const appointment = await Appointment.findById(appointmentId);

   
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

  
    if (appointment.patientId.toString() !== patientId) {
      return res.status(403).json({ message: 'Unauthorized to delete this appointment' });
    }

 
    await Appointment.findByIdAndDelete(appointmentId);

    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ message: 'Error deleting appointment' });
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




hospitalrouter.get('/get-appointments', verifyToken, async(req, res) => {
  try {
    if(req.user.role !== 'patient'){
      return res.status(403).json({message: 'Access denied'})
    }

    const appointment = await Appointment.find({patientId:req.user.id}).populate('adminId', 'name email phone').sort({createdAt:-1})

    res.status(200).json({appointment})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
})

export default hospitalrouter;

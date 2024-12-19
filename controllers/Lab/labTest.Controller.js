import LabTest from "../../models/Lab/LabTestModel.js";
import LabUser from "../../models/Lab/Lab.Model.js";
import Doctor from "../../models/Doctors/doctor.model.js";
import Patient from "../../models/Doctors/patient.model.js";
import mongoose from "mongoose";

export const LabBookAppointment = async(req, res) => {
  const {testName, price, patientName, patientContact} = req.body
  const labId = req.params.labId || req.body.labId;

  try {
    const Lab = await LabUser.findById(labId);
    if(!Lab){
      console.log("lab not found")
      return res.status(404).json({message: "lab not found"})
    }

    console.log(Lab)

    const doctor = await Doctor.findById(req.user.id)
    if(!doctor){
      console.log("doctor not found")
      return res.status(404).json({message: "doctor not found"})
    }

    const patient = await Patient.findById(req.user.id)
    if(!patient){
      console.log("patient not found")
      return res.status(404).json({message: "patient not found"})
    }

    const newAppointment = new LabTest({
      labId: new mongoose.Types.ObjectId(labId),
      patientId:new mongoose.Types.ObjectId(req.user.id), 
      doctorId: new mongoose.Types.ObjectId(req.user.id),
      testName,
      price,
      patientName,
      patientContact,
    })

    await newAppointment.save();
    console.log("new appointment creadted with a lab", newAppointment)

    res.status(201).json(newAppointment);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to book appointment' });
  }
}

export const getAppointmentofDoctorsForLab = async(req, res) => {
  const labId = req.user.id
  if(!labId || labId === 'undefined'){
    console.log("lab not found")
    return res.status(400).json({error: 'lab id is not found'})
  }

  try {
    const appointment = await LabUser.find({labId}).populate('doctorId')
    res.json(appointment)
  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'failed to fetch appointment'})
  }
}


export const getAppointmentofPatientsForLab  = async(req, res) => {
  const labId = req.user.id
  if(!labId || labId === 'undefined'){
    console.log("lab not found")
    return res.status(400).json({error: 'lab id is not found'})
  }

  try {
    const appointment = await LabUser.find({labId}).populate('patientId')
    res.json(appointment)
  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'failed to fetch appointment'})
  }

}



export const getLabAppointmentForDoctor = async(req, res) => {
  try {
    const doctorId = req.user.id;

    if(!mongoose.Types.ObjectId.isValid(doctorId)){
      return res.status(400).json({message:'Invalid patient ID'})
    }

    console.log("doctor Id:", doctorId)


    const doctorExists = await Doctor.findById(new mongoose.Types.ObjectId(doctorId))
    if(!doctorExists){
      return res.status(404).json({message: "doctor not found"})
    }


    const appointments = await LabUser.find({doctorId:new mongoose.Types.ObjectId(doctorId)}).populate('labId', 'name email');
    console.log("Appointments found:", appointments);

    return res.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error.message); 
    return res.status(500).json({ message: 'Server error', error: error.message }); 
  }
}




export const getLabAppointmentForPatient = async(req, res) => {
  try {
    const patientId = req.user.id;

    if(!mongoose.Types.ObjectId.isValid(patientId)){
      return res.status(400).json({message:'Invalid patient ID'})
    }

    console.log("doctor Id:", patientId)


    const doctorExists = await Patient.findById(new mongoose.Types.ObjectId(patientId))
    if(!doctorExists){
      return res.status(404).json({message: "doctor not found"})
    }


    const appointments = await LabUser.find({patientId:new mongoose.Types.ObjectId(patientId)}).populate('labId', 'name email');
    console.log("Appointments found:", appointments);

    return res.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error.message); 
    return res.status(500).json({ message: 'Server error', error: error.message }); 
  }
}

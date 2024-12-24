import LabTest from "../../models/Lab/LabTestModel.js";
import LabUser from "../../models/Lab/Lab.Model.js";
import Doctor from "../../models/Doctors/doctor.model.js";
import Patient from "../../models/Doctors/patient.model.js";
import mongoose from "mongoose";
import {User} from "../../models/user.models.js"
export const LabBookAppointment = async(req, res) => {
  const {testName,  patientName, patientContact} = req.body
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

   
    const newAppointment = new LabTest({
      labId: new mongoose.Types.ObjectId(labId),
      // patientId:new mongoose.Types.ObjectId(req.user.id), 
      doctorId: new mongoose.Types.ObjectId(req.user.id),
      testName,
    
      patientName,
      patientContact,
    })

    await newAppointment.save();
    console.log("new appointment created with a lab", newAppointment)

    res.status(201).json(newAppointment);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to book appointment' });
  }
}



export  const LabBookAppointmentforPatient = async(req, res) =>{
  const {testName,  patientName, patientContact} = req.body
  const labId = req.params.labId || req.body.labId;

  try {
    const Lab = await LabUser.findById(labId);
    if(!Lab){
      console.log("lab not found")
      return res.status(404).json({message: "lab not found"})
    }

    console.log(Lab)

    const patient = await User.findById(req.user.id)
    if(!patient){
      console.log("patient not found")
      return res.status(404).json({message: "doctor not found"})
    }

   
    const newAppointment = new LabTest({
      labId: new mongoose.Types.ObjectId(labId),
      // patientId:new mongoose.Types.ObjectId(req.user.id), 
      patientId: new mongoose.Types.ObjectId(req.user.id),
      testName,
    
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
    const appointment = await LabTest.find({labId}).populate('doctorId')
    console.log(appointment)
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


    const appointments = await LabTest.find({doctorId:new mongoose.Types.ObjectId(doctorId)}).populate('labId', 'name email');
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


    const doctorExists = await User.findById(new mongoose.Types.ObjectId(patientId))
    if(!doctorExists){
      return res.status(404).json({message: "doctor not found"})
    }


    const appointments = await LabTest.find({patientId:new mongoose.Types.ObjectId(patientId)}).populate('labId', 'name email');
    console.log("Appointments found:", appointments);

    return res.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error.message); 
    return res.status(500).json({ message: 'Server error', error: error.message }); 
  }
}


// export const editLabTest = async (req, res) => {
//   const labTestId = req.params.id;
//   const { testName, patientName, patientContact, testResult, status, AmountPaid, MedicalAdvice, drugPrescription } = req.body;


//   if (!mongoose.Types.ObjectId.isValid(labTestId)) {
//     return res.status(400).json({ message: 'Invalid Lab Test ID' });
//   }

//   try {
   
//     const labTest = await LabTest.findById(labTestId);

//     if (!labTest) {
//       return res.status(404).json({ message: 'Lab Test not found' });
//     }


//     if (testName) labTest.testName = testName;
//     if (patientName) labTest.patientName = patientName;
//     if (patientContact) labTest.patientContact = patientContact;
//     if (testResult) labTest.testResult = testResult;
//     if (status) labTest.status = status
//     if (AmountPaid) labTest.AmountPaid = AmountPaid;
//     if (MedicalAdvice) labTest.MedicalAdvice = MedicalAdvice;
//     if (drugPrescription) labTest.drugPrescription = drugPrescription

//     // Save the updated lab test
//     const updatedLabTest = await labTest.save();

//     console.log('Lab Test updated:', updatedLabTest);
//     res.status(200).json(updatedLabTest);
//   } catch (error) {
//     console.error('Error updating lab test:', error.message);
//     res.status(500).json({ message: 'Failed to update lab test', error: error.message });
//   }
// };


export const editLabTest = async(req, res) => {
  const {id} = req.params

  const LabTest1 = await LabTest.findById(id);
  if(!LabTest1) {
    res.status(404).json({message: "this is not found"})
  }

  if(LabTest1?._id.toString() !==req.user?.id){
    res.status(403);
    throw new Error("not authorized to update this")
  }

  const updates = {...req.body};

  const uploadFile = async(file) => {
    const result = await CloudinaryStorage.uploader.upload(file.tempFilePath, {
      folder: "schools"
    });
    return result.secure_url
  }

  if (req.files) {
    if (req.files.picture1) {
      updates.picture1 = await uploadFile(req.files.picture1);
    }
  }

  const updatedLabTest = await LabTest.findByIdAndUpdate(id, updates, {
    new: true
  });
  if(!updatedLabTest) {
    res.status(500);
    throw new Error("failed to update data")
  }

  res.status(200).json({
    message:"updated successfully",
    updatedLabTest,
  })
}
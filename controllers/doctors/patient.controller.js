import Patient from "../../models/Doctors/patient.model.js";
import Appointment from "../../models/Doctors/AppointmentDoctors.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import cloudinary from "cloudinary"





export const registerPatient = async (req, res) => {
  const { fullname, email, phoneNumber, password, state, homeAddress, LGA, allergics } = req.body;



  try {
    if(!fullname || !email || !phoneNumber || !password || !state || !homeAddress || !LGA || !allergics || !req.file ){
      console.log("A missing field is detected");
      return res.status(400).json({ message: "All fields are required" });
    }


    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ msg: 'Patient already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    const profilePicture = result.secure_url;


    const newPatient = new Patient({
      fullname,
      email,
      password: hashedPassword,
      profilePicture,
      phoneNumber,
      state,
      homeAddress,
      LGA,
      allergics
    });

    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ error: 'Error registering patient' });
  }
};

// Login Patient
export const loginPatient = async (req, res) => {
  const { email, password } = req.body;

  try {
    const patient = await Patient.findOne({ email });
    if (!patient) return res.status(404).json({ msg: 'Patient not found' });

    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Create token
    const token = jwt.sign({ id: patient._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, patient: { id: patient._id, fullname: patient.fullname, email: patient.email } });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Login failed' });
  }
};

// View Patient Profile
export const getPatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user.id);
    if (!patient) return res.status(404).json({ msg: 'Patient not found' });

    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get profile' });
  }
};

// Update Patient Profile
export const updatePatientProfile = async (req, res) => {
  const updates = req.body;
  try {
    const patient = await Patient.findByIdAndUpdate(req.user.id, updates, { new: true });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
};
































// export const registerpatient = async() => {
//     try {
//         const patient = new Patient(req.body);
//         await patient.save();
//         res.status(201).json({message: "patient registered successfully", patient})
//     } catch (error) {
//         res.status(500).json({error: error.message})
//     }
// }


// // Book an appointment
// export const bookAppointment = async (req, res) => {
//     const { doctorId, patientId, date, reason, location } = req.body;
//     try {
//       const appointment = new Appointment({
//         doctor: doctorId,
//         patient: patientId,
//         date,
//         reason,
//         location
//       });
//       await appointment.save();
  
//       // Add appointment to doctor and patient
//       await Doctor.findByIdAndUpdate(doctorId, { $push: { appointments: appointment._id } });
//       await Patient.findByIdAndUpdate(patientId, { $push: { appointments: appointment._id } });
  
//       res.status(201).json({ message: "Appointment booked successfully", appointment });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };



//   export const getAllPatients = async (req, res) => {
//     try {
//       const patients = await Patient.find().populate('appointments');
//       res.status(200).json(patients);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };

  
//   export const getAPatient = async (req, res) => {
//     try {
//       const patient = await Patient.findById(req.params.id).populate('appointments').populate("doctors");
//       res.status(200).json(patient);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
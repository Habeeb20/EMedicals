import User from "../../models/hospitals/userSchema.js"
import jwt from 'jsonwebtoken';
import Appointment from "../../models/hospitals/appointmentSchema.js"
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "cloudinary"
import nodemailer from "nodemailer"
import crypto from "crypto"
import bcrypt from "bcryptjs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: { folder: "schools" },
  });
  

const transporter = nodemailer.createTransport(({
    service:'gmail',
    auth: {
        user:"babatundeademola112@gmail.com",
        pass:"pknseuxqxzkoqdjg"
      },
}));


export const register = async (req, res) => {
  try {
    const { fullname, email, password, role, specialization } = req.body;
    if (role === 'doctor' && !specialization) {
      return res.status(400).json({ message: 'Specialization is required for doctors' });
    }



    const user = new User({ fullname, email, password, role, specialization });
    await user.save();

    res.status(201).json({ message: `${role} registered successfully` });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error', error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


export const edit = async(req, res) => {
    const {id} = req.params;

    const admin = await User.findById(id);
    if(admin){
        res.status(404)
        throw new Error("admin not found")
    }


    if(admin._id.toString() !== req.user.id){
        res.status(403);
        throw new Error("not authorized to update")
    }

    const updates = {...req.body};

    const uploadFile = async(file) => {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder:"Schools"
        });
        return result.secure_url;
    }
    if (req.files) {
        if (req.files.profilePicture) {
          updates.profilePicture = await uploadFile(req.files.profilePicture);
        }
    }

    const updatedAdmin = await User.findByIdAndUpdate(id, updates, {
        new: true,
    });
    if(!updatedAdmin){
        res.status(500)
        throw new Error("failed to update")
    }
}



// Register doctors, nurses, or patients
export const registerUser = async (req, res) => {
    const { fullname, email, password, role, specialization } = req.body;
  
    if (role === 'doctor' && !specialization) {
      return res.status(400).json({ message: 'Specialization is required for doctors' });
    }
  
    try {
      const newUser = new User({ fullname, email, password, role, specialization });
      await newUser.save();
      res.status(201).json({ message: `${role} registered successfully!` });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error });
    }
  };



  //login as a patient, doctors, or nurse

  export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  



  export const getAllPatients = async (req, res) => {
    const { hospitalId } = req.params; 
    try {
      const patients = await User.find({ role: 'patient', hospitalId });
      res.status(200).json(patients);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching patients for the hospital', error });
    }
  };
  

    // Get all registered patients
    export const getAllDoctors = async (req, res) => {
        const { hospitalId } = req.params; 
        try {
          const doctors = await User.find({ role: 'doctor', hospitalId });
          res.status(200).json(doctors);
        } catch (error) {
          res.status(500).json({ message: 'Error fetching doctors for the hospital', error });
        }
      };
      


      // Get all registered patients
      export const getAllNurses = async (req, res) => {
        const { hospitalId } = req.user._id; 
        console.log("this is the hospital id !!",hospitalId)
        try {
          const nurses = await User.find({ role: 'nurse', hospitalId });
          res.status(200).json(nurses);
        } catch (error) {
          res.status(500).json({ message: 'Error fetching nurses for the hospital', error });
        }
      };
      


  // Get all appointments
  export const getAllAppointments = async (req, res) => {
    const { hospitalId } = req.params; 
    try {
      const appointments = await Appointment.find({ hospitalId }).populate("patientId").populate("doctorId")
        .populate('patientId')
        .populate('doctorId');
      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching appointments for the hospital', error });
    }
  };
  

  // Get all doctor actions
export const getAllDoctorsActions = async (req, res) => {
    try {
      const actions = await Appointment.find({ status: { $ne: 'pending' } });
      res.status(200).json(actions);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching actions', error });
    }
  };
  











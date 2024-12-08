import ConsultDoctor from "../../models/QuickActions/consultDoctor.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import cloudinary from 'cloudinary'
import nodemailer from "nodemailer"
import crypto from "crypto"
import mongoose from "mongoose"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  


  const transporter = nodemailer.createTransport(({
    service:'gmail',
    auth: {
        user:"babatundeademola112@gmail.com",
        pass:"pknseuxqxzkoqdjg"
      },
}));


const sendOTPEmail = async(email, otp) => {
    const mailOptions = {
        from:process.env.EMAIL_USER,
        to:email,
        subject: 'Verify your email',
        text: `Your verification code is: ${otp}`,

    };
    
  await transporter.sendMail(mailOptions);
}


export const CregisterDoctor = async (req, res) => {
    const { fullname, email, phone, gender, state, LGA, address, specialization, availability, YOE } = req.body;
  
    try {
      // Collect missing fields
      const missingFields = [];
  
      if (!fullname) missingFields.push("fullname");
      if (!email) missingFields.push("email");
      if (!phone) missingFields.push("phone");
      if (!gender) missingFields.push("gender");
      if (!state) missingFields.push("state");
      if (!LGA) missingFields.push("LGA");
      if (!address) missingFields.push("address");
      if (!availability) missingFields.push("availability");
      if (!YOE) missingFields.push("YOE");
      if (!specialization) missingFields.push("specialization");
  
      // If any field is missing, return an error response
      if (missingFields.length > 0) {
        console.log("Missing fields:", missingFields);
        return res.status(400).json({ message: "All fields are required", missingFields });
      }
  
      // Check if doctor already exists
      const existingDoctor = await ConsultDoctor.findOne({ email });
      if (existingDoctor) {
        return res.status(400).json({ msg: "Doctor already registered" });
      }
  
      // Generate a unique number for the doctor
      const uniqueNumber = Math.random().toString(36).substring(2, 8);
  
      // Create a new doctor record
      const newDoctor = new ConsultDoctor({
        fullname,
        email,
        phone,
        gender,
        state,
        LGA,
        address,
        availability,
        YOE,
        specialization,
        uniqueNumber,
      });
  
      // Save the doctor record to the database
      await newDoctor.save();
      res.status(201).json(newDoctor);
    } catch (error) {
      console.error("Error registering doctor:", error);
      res.status(500).json({ error: "Error registering doctor" });
    }
  };
  


  
// export const CloginDoctor = async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       const doctor = await ConsultDoctor.findOne({ email });
//       if (!doctor) return res.status(404).json({ msg: 'Doctor not found' });
  
//       // Compare passwords
//       const isMatch = await bcrypt.compare(password, doctor.password);
//       if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
  
//       // Create token
//       const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
//       res.json({ token, doctor });
//     } catch (error) {
//       res.status(500).json({ error: 'Login failed' });
//     }
//   };
  
  
  export const CgetDoctorProfile = async (req, res) => {
    try {
      const doctor = await ConsultDoctor.findById(req.user.id);
      if (!doctor) return res.status(404).json({ msg: 'Doctor not found' });
      res.status(200).json(doctor)
  
    //   res.status(200).json({success: true, doctor:{
    //     _id: doctor._id,
    //     fullname:doctor.fullname,
    //     email:doctor.email,
    //     availability: doctor.availability,
    //     phone:doctor.phone,
    //     uniqueNumber:doctor.uniqueNumber,
    //     state:doctor.state,
    //     LGA:doctor.LGA,
    //     YOE:doctor.YOE,
    //     gender:doctor.gender,
    //     address:doctor.address,
    //     specialization:doctor.specialization
  
    //   }});
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Failed to get profile' });
    }
  };



  
export const CgetAllDoctors = async (req, res) => {
    try {
      const doctors = await ConsultDoctor.find();
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch doctors' });
    }
  };
  
  export const CgetDoctorDetails = async (req, res) => {
    try {
      const {id} = req.params;
      console.log(req.params);
      if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log("id not found")
        return res.status(400).json({ success: false, message: 'Invalid user ID' });
      }
  
      const patient = await ConsultDoctor.findById(id).select('-password');
      if(!patient){
        console.log("doctor not found")
        return res.status(404).json({ success: false, message: 'doctor not found' });
      }
      res.status(200).json(patient);
  
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Failed to get profile' });
    }
  }
  
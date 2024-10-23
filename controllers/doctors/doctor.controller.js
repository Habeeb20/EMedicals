import Doctor from "../../models/Doctors/doctor.model.js"
import Patient from "../../models/Doctors/patient.model.js"
import Appointment from "../../models/Doctors/AppointmentDoctors.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import cloudinary from 'cloudinary'
import nodemailer from "nodemailer"
import crypto from "crypto"
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







export const registerDoctor = async (req, res) => {
  const { fullname, email, phoneNumber,password, gender, state, LGA, officeAddress, currentWorkplace, specialization, dateOfBirth } = req.body;

  // Debugging: Log the request body and file
  console.log("Request Body:", req.body);
  console.log("Uploaded File:", req.file);

  try {
    // Check for missing fields including file
    if (!fullname || !email || !phoneNumber ||!password || !gender || !state || !LGA || !officeAddress || !currentWorkplace || !specialization || !dateOfBirth || !req.file) {
      console.log("A missing field is detected");
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ msg: 'Doctor already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Upload the profile picture to Cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    const profilePicture = result.secure_url;

    // Generate a unique number for the doctor
    const uniqueNumber = Math.random().toString(36).substring(2, 8);

    // Create a new doctor record
    const newDoctor = new Doctor({
      fullname,
      email,
      phoneNumber,
      password:hashedPassword,
      gender,
      state,
      LGA,
      officeAddress,
      currentWorkplace,
      specialization,
      dateOfBirth,
      profilePicture,
      uniqueNumber
    });

    // Save the doctor record to the database
    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (error) {
    console.error("Error registering doctor:", error);
    res.status(500).json({ error: 'Error registering doctor' });
  }
};


export const loginDoctor = async (req, res) => {
  const { email, password } = req.body;

  try {
    const doctor = await Doctor.findOne({ email });
    if (!doctor) return res.status(404).json({ msg: 'Doctor not found' });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Create token
    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, doctor });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};


export const getDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.user.id);
    if (!doctor) return res.status(404).json({ msg: 'Doctor not found' });

    res.status(200).json({success: true, doctor:{
      _id: doctor._id,
      fullname:doctor.fullname,
      email:doctor.email,
      address: doctor.address,
      profilePicture:doctor.profilePicture,
      uniqueNumber:doctor.uniqueNumber,
      state:doctor.state,
      LGA:doctor.LGA,
      officeAddress:doctor.officeAddress,
      gender:doctor.gender,
      currentWorkplace:doctor.currentWorkplace,
      specialization:doctor.specialization

    }});
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to get profile' });
  }
};


export const updateDoctorProfile = async (req, res) => {
  const updates = req.body;
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.user.id, updates, { new: true });
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
};


export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
};




































































































// export const register = async (req, res) => {
//   try {
//     const {
//       fullName,
//       dateOfBirth,
//       email,
//       password,
//       phoneNumber,
//       specialization,
//       licenseNumber,
//       qualifications,
//       yearsOfExperience,
//       state,
//       LGA,
//     } = req.body;

  
//     const requiredFields = {
//       fullName,
//       dateOfBirth,
//       email,
//       password,
//       phoneNumber,
//       specialization,
//       licenseNumber,
//       qualifications,
//       yearsOfExperience,
//       state,
//       LGA,
//     };

//     let missingFields = [];

//     for (const [field, value] of Object.entries(requiredFields)) {
//       if (!value) {
//         missingFields.push(field);
//       }
//     }

//     if (missingFields.length > 0) {
//       console.log(missingFields)
//       return res.status(400).json({
    
//         message: `The following fields are missing: ${missingFields.join(', ')}`,
      
//       });
//     }

//     // Check if doctor with email already exists
//     let doctor = await Doctor.findOne({ email });
//     if (doctor) return res.status(400).json({ msg: 'Doctor already exists' });

//     // Generate verification token and unique number
//     const verificationToken = Math.floor(100000 + Math.random() * 900000).toString(); // OTP generation
//     const uniqueNumber = `RL-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
//     const verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

//     // Upload profile picture and medical certificate using Cloudinary
//     const result = await cloudinary.v2.uploader.upload(req.file.path);
//     const profilePicture = result.secure_url;
//     const medicalCertificate = result.secure_url;

//     // Create new doctor
//     doctor = new Doctor({
//       ...req.body,
//       profilePicture,
//       medicalCertificate,
//       uniqueNumber,
//       verificationToken,
//       verificationTokenExpiresAt,
//     });

//     await doctor.save();

//     // Send OTP email to the doctor for verification
//     await sendOTPEmail(doctor.email, verificationToken);

//     res.status(201).json({
//       message: 'Doctor registered successfully',
//       doctor: { ...doctor._doc, password: undefined }, // Exclude password from response
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// };


// export const verifyEmail = async (req, res) => {
//     const { code } = req.body;
  
//     try {
//       const user = await Doctor.findOne({
//         verificationToken: code,
//         verificationTokenExpiresAt: { $gt: Date.now() },
//       });
  
//       if (!user) {
//         return res.status(400).json({ success: false, message: 'Invalid or expired verification code' });
//       }
  
//       user.isVerified = true;
//       user.verificationToken = undefined;
//       user.verificationTokenExpiresAt = undefined;
  
//       await user.save();
  
//       res.status(200).json({
//         success: true,
//         message: 'Email verified successfully',
//         user: { ...user._doc, password: undefined },
//       });
//     } catch (error) {
//       console.error('Error in verifyEmail: ', error);
//       res.status(500).json({ success: false, message: 'Server error' });
//     }
//   };

// export const login = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//       const doctor = await Doctor.findOne({ email });
//       if (!doctor) return res.status(400).json({ msg: 'Invalid credentials' });
  
//       const isMatch = await bcrypt.compare(password, doctor.password);
//       if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

//       doctor.lastLogin = new Date();
  
//       const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//       res.status(200).json({success: true, message: 'successfully logged in', token, doctor });
//     } catch (err) {
//         console.log(err)
//       res.status(500).json({ msg: 'Server error' });
//     }
// }

// export const logout = async (req, res) => {
// 	res.clearCookie("token");
// 	res.status(200).json({ success: true, message: "Logged out successfully" });
// };

// export const getprofile  = async (req, res) => {
//     try {
//         const doctor = await Doctor.findById(req.params.id)
//         .populate('patients')
//         .populate({
//             path: 'appointments',
//             populate: { path: 'patient', select: 'fullName email' }
//           });
//         res.json(doctor);
//       } catch (err) {
//         console.log(err)
//         res.status(500).json({ msg: 'Server error' });
//       }
// }

// export const getAlldoctors = async (req, res) => {
//     try {
//       const users = await Doctor.find().populate('patients appointments');
//       res.status(200).json(users);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };

// export const updateDoctorProfile = async (req, res) => {
//   try {
//     const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.status(200).json(doctor);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

//   export const deleteDoctor = async (req, res) => {
//     try {
//       await Doctor.findByIdAndDelete(req.params.id);
//       res.status(200).json({ message: "Doctor deleted successfully" });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };

//   export const forgotPassword = async (req, res) => {
// 	const { email } = req.body;
// 	try {
// 		const user = await Doctor.findOne({ email });

// 		if (!user) {
// 			return res.status(400).json({ success: false, message: "User not found" });
// 		}

// 	  // Generate a reset token
//     const resetToken = crypto.randomBytes(32).toString('hex');
//     const resetPasswordToken = jwt.sign({ resetToken }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     // Send an email with the reset link
//     const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`;

//     // Setup Nodemailer
//     const transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         user:"babatundeademola112@gmail.com",
//         pass:"pknseuxqxzkoqdjg"
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: user.email,
//       subject: 'Password Reset',
//       text: `You requested a password reset. Click the link below to reset your password: \n\n ${resetLink}`,
//     };

//     await transporter.sendMail(mailOptions);

// 		res.status(200).json({ success: true, message: "Password reset link sent to your email" });
// 	} catch (error) {
// 		console.log("Error in forgotPassword ", error);
// 		res.status(400).json({ success: false, message: error.message });
// 	}
// };

// export const resetPassword = async (req, res) => {
	
//     const { token } = req.params;
//     const { newPassword } = req.body;

// try {
//   // Verify the reset token
//   const decoded = jwt.verify(token, process.env.JWT_SECRET);
//   const { resetToken } = decoded;

//   // Find the user by the token
//   const user = await Doctor.findOne({ resetToken });
//   if (!user) {
//     return res.status(404).json({ message: 'Invalid token' });
//   }

//   // Hash the new password
//   const salt = await bcrypt.genSalt(10);
//   user.password = await bcrypt.hash(newPassword, salt);

//   await user.save();

//   res.status(200).json({ message: 'Password reset successfully' });
// } catch (err) {
//   res.status(500).json({ message: 'Server error' });
// }
// };

// export const getAllAppointments = async (req, res) => {
//     try {
//       const appointments = await Appointment.find().populate('doctor patient');
//       res.status(200).json(appointments);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };


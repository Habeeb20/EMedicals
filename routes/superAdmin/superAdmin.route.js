import express from "express"
import SuperAdmin from "../../models/superAdminModel/SuperAdmin.schema.js"
import bcryptjs from "bcryptjs"
import crypto from "crypto"
import nodemailer from "nodemailer"
import multerStorage from "multer-storage"
import cloudinary from "../../utils/cloudinary.js"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import multer from "multer"
import jwt from "jsonwebtoken"
import { verifyToken } from "../../middleware/verifyToken.js"
import Cemetery from "../../models/cemetary/Cemetery.js"
import undertaker from "../../models/underTaker/undertaker.js"
import mortuary from "../../models/mortuary/mortuarySchema.js"
import Doctor from "../../models/Doctors/doctor.model.js"
import Seller from "../../models/medicalPhamarcy/Seller.js"
import Hospital from "../../models/hospitals/userSchema.js"
import wellness from "../../models/wellness.js"
import LabModel from "../../models/Lab/Lab.Model.js"
import Patient from "../../models/Doctors/patient.model.js"
import AppointmentForDoctor from "../../models/Doctors/AppointmentDoctors.model.js"
import AppointmentForHospital from "../../models/hospitals/appointmentSchema.js"
// import AppointmentForLab from "../../models/Lab/"
const superAdminRouter = express.Router()
 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})


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




superAdminRouter.post("/superadminsignup", async(req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    try {
      
        if (!email || !password) {
            console.log('error');
            return res.status(400).json({ message: "All fields are required" });
        }

   
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Check if user already exists
        const existingUser = await SuperAdmin.findOne({ email });
        if (existingUser) {
            console.log('user exists');
            return res.status(400).json({ message: 'User already exists' });
        }

        // Validate password (minimum length, etc.)
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long' });
        }

        // Hash password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // OTP generation (more secure way using crypto)
        const verificationToken = crypto.randomBytes(6).toString('hex');
        const uniqueNumber = `RL-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
        const verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

        // // File upload handling (check if file exists)
        // if (!req.file) {
        //     return res.status(400).json({ message: 'Profile picture is required' });
        // }

      

        // Create new SuperAdmin user
        const user = new SuperAdmin({
            email, 
            password: hashedPassword, 
    
            uniqueNumber, 
            verificationToken,
            verificationTokenExpiresAt,
        });

        await user.save();

        // Send OTP email
        try {
            await sendOTPEmail(user.email, verificationToken);
        } catch (error) {
            console.error('Error sending OTP email:', error);
            return res.status(500).json({ message: 'Failed to send OTP email. Please try again later.' });
        }

        // Return success response
        res.status(201).json({
            message: 'User registered successfully. Please check your email to verify your account',
            user: { ...user._doc, password: undefined },
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong during registration' });
    }
});



superAdminRouter.post("/superadminlogin", async(req, res) => {
    const { email, password } = req.body;
     
    try {
        const user = await SuperAdmin.findOne({ email });
        if (!user || !(await bcryptjs.compare(password, user.password))) {
          return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
    
        
        user.lastLogin = new Date();

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
      
    
    
    
        res.status(200).json({
          success: true,
          message: 'Logged in successfully',
          user,
          token
          
        });
        console.log('user details',user, token)
      } catch (error) {
        console.error('Error in login: ', error);
        res.status(500).json({ success: false, message: 'Server error' });
      }
})


superAdminRouter.get("/superadmindashboard", verifyToken, async(req, res) => {
    try {
        const userId = req.user.id; 
        const user = await SuperAdmin.findById(userId).select('-password'); 

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
      res.status(200).json({
        success: true,
        user: {
            _id: user._id,
            email: user.email,
            profilePicture: user.profilePicture,
            lastLogin: user.lastLogin, 
            uniqueNumber: user.uniqueNumber,
    
          
        },
    });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong while fetching user profile' });
    }
})

superAdminRouter.get("/allcementery", async(req, res) => {
   try {
    const cemetery = await Cemetery.find({})
    return res.status(200).json(cemetery)
   } catch (error) {
    console.log(error)
    return res.status(500).json({message: error})
   }
})

superAdminRouter.get("/allundertaker", async(req, res) => {
    try {
        const Undertaker = await undertaker.find({})
        return res.status(200).json(Undertaker)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error})
    }
})


superAdminRouter.get("/allmortuary", async(req, res) => {
    try {
        const Mortuary = await mortuary.find({})
        return res.status(200).json(Mortuary)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error})
    }
})

superAdminRouter.get("/alldoctor", async(req, res) => {
    try {
        const doctor = await Doctor.find({})
        return res.status(200).json(doctor)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error})
    }
})


superAdminRouter.get("/allpharmacy", async(req, res) => {
    try {
        const pharmacy = await Seller.find({})
        return res.status(200).json(pharmacy)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error})
    }
})

superAdminRouter.get("/allhospital", async (req, res) => {
    try {
        const hospital = await Hospital.find({ role: 'admin' }); 
        return res.status(200).json(hospital);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
});


superAdminRouter.get("/allwellness", async(req, res) => {
    try {
        const Wellness = await wellness.find({ role: 'admin' }); 
        console.log(Wellness)
        return res.status(200).json(Wellness);
       
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
})

superAdminRouter.get("/labs", async(req, res) => {
    try {
        const lab = await LabModel.find({ role: 'admin' }); 
        return res.status(200).json(lab);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
})


superAdminRouter.get("/allpatientsforhospitals", async(req, res) => {
    try {
        const hospitalpatients = await Hospital.find({ role: 'patient' }).populate("adminId", "name");; 
        return res.status(200).json(hospitalpatients);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
})

superAdminRouter.get("/alldoctorsforhospitals", async(req, res) => {
    try {
        const hospitaldoctors = await Hospital.find({ role: 'doctor' }).populate("adminId", "name");; 
        return res.status(200).json(hospitaldoctors);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
})

superAdminRouter.get("/allnursesforhospitals", async(req, res) => {
    try {
        const hospitalnurse = await Hospital.find({ role: 'doctor' }).populate("adminId", "name");; 
        return res.status(200).json(hospitalnurse);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
})


superAdminRouter.get("/allpatient", async(req, res) => {
    try {
        const allpatient = await Patient.find({ role: 'doctor' }); 
        return res.status(200).json(allpatient);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
})

superAdminRouter.get("/allappointmentfordoctor", async (req, res) => {
    try {
        const allappointmentfordoctor = await AppointmentForDoctor.find({})
            .populate("doctorId", "fullname email")  // Populate doctorId and return fullname
            .populate("patientId", "fullname email"); // Populate patientId and return fullname

        return res.status(200).json(allappointmentfordoctor);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
});

superAdminRouter.get("/allappointmentforhospitals", async (req, res) => {
    try {
        const allappointmentforhospitals = await AppointmentForHospital.find({})
            .populate("adminId", "name email")  // Populate doctorId and return fullname
            .populate("patientId", "name email"); // Populate patientId and return fullname

        return res.status(200).json(allappointmentforhospitals);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
});


export default superAdminRouter


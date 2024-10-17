import Doctor from "../../models/Doctors/doctor.model.js"
import Patient from "../../models/Doctors/patient.model.js"
import Appointment from "../../models/Doctors/AppointmentDoctors.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import cloudinary from 'cloudinary'
import nodemailer from "nodemailer"

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

export const register = async ()=> {
    try {
        const { fullName, dateOfBirth, email, password, phoneNumber, specialization, licenseNumber, qualifications, yearsOfExperience, state, LGA } = req.body;

        if( !fullName || !dateOfBirth ||  !email || !password || !phoneNumber || !specialization|| !licenseNumber || !qualifications || !medicalCertificate || !yearsOfExperience || !state || !LGA ){
            console.log('error')
            return res.status(400).json({message: "All fields are required"})
        }
    
        let doctor = await Doctor.findOne({ email });
        if (doctor) return res.status(400).json({ msg: 'Doctor already exists' });


        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString(); // OTP generation
        const uniqueNumber = `RL-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
        const verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
        
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        const profilePicture = result.secure_url;
        const medicalCertificate = result.secure_url;
    
        doctor = new Doctor(...req.body,profilePicture, medicalCertificate, uniqueNumber,
            verificationToken,
            verificationTokenExpiresAt, );
        await doctor.save();

        await sendOTPEmail(doctor.email, verificationToken)
        res.status(201).json({ message: 'Doctor registered successfully', doctor:{...doctor.doc, password: undefined} });
      } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'Server error' });
      }
}




export const verifyEmail = async (req, res) => {
    const { code } = req.body;
  
    try {
      const user = await Doctor.findOne({
        verificationToken: code,
        verificationTokenExpiresAt: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(400).json({ success: false, message: 'Invalid or expired verification code' });
      }
  
      user.isVerified = true;
      user.verificationToken = undefined;
      user.verificationTokenExpiresAt = undefined;
  
      await user.save();
  
      res.status(200).json({
        success: true,
        message: 'Email verified successfully',
        user: { ...user._doc, password: undefined },
      });
    } catch (error) {
      console.error('Error in verifyEmail: ', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };


export const login = async () => {
    const { email, password } = req.body;
    try {
      const doctor = await Doctor.findOne({ email });
      if (!doctor) return res.status(400).json({ msg: 'Invalid credentials' });
  
      const isMatch = await bcrypt.compare(password, doctor.password);
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

      doctor.lastLogin = new Date();
  
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({success: true, message: 'successfully logged in', token, doctor });
    } catch (err) {
        console.log(err)
      res.status(500).json({ msg: 'Server error' });
    }
}

export const logout = async (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};




export const getprofile  = async () => {
    try {
        const doctor = await Doctor.findById(req.params.id)
        .populate('patients')
        .populate({
            path: 'appointments',
            populate: { path: 'patient', select: 'fullName email' }
          });
        res.json(doctor);
      } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'Server error' });
      }
}

export const getAlldoctors = async (req, res) => {
    try {
      const users = await Doctor.find().populate('patients appointments');
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


 // / Update doctor profile
export const updateDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




  export const deleteDoctor = async (req, res) => {
    try {
      await Doctor.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Doctor deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };




  export const forgotPassword = async (req, res) => {
	const { email } = req.body;
	try {
		const user = await Doctor.findOne({ email });

		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

	  // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordToken = jwt.sign({ resetToken }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send an email with the reset link
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`;

    // Setup Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user:"babatundeademola112@gmail.com",
        pass:"pknseuxqxzkoqdjg"
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset',
      text: `You requested a password reset. Click the link below to reset your password: \n\n ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);

		res.status(200).json({ success: true, message: "Password reset link sent to your email" });
	} catch (error) {
		console.log("Error in forgotPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};



export const resetPassword = async (req, res) => {
	
    const { token } = req.params;
    const { newPassword } = req.body;

try {
  // Verify the reset token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { resetToken } = decoded;

  // Find the user by the token
  const user = await Doctor.findOne({ resetToken });
  if (!user) {
    return res.status(404).json({ message: 'Invalid token' });
  }

  // Hash the new password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);

  await user.save();

  res.status(200).json({ message: 'Password reset successfully' });
} catch (err) {
  res.status(500).json({ message: 'Server error' });
}
};


///get  all appointment

export const getAllAppointments = async (req, res) => {
    try {
      const appointments = await Appointment.find().populate('doctor patient');
      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


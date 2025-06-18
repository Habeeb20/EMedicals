import bcryptjs from "bcryptjs"
import crypto from 'crypto'
import nodemailer from "nodemailer"
import cloudinary from "cloudinary"
import { User } from "../../models/user.models.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})


const transporter = nodemailer.createTransport({
  service:'gmail',
    auth: {
     user:"pknseuxqxzkoqdjg",
        pass:"babatundeademola112@gmail.com"
      },
 
})




const sendOTPEmail = async(email, otp) => {
    const mailOptions = {
        from:process.env.EMAIL_USER,
        to:email,
        subject: 'Verify your email',
        text: `Your verification code is: ${otp}`,

    };
    
  await transporter.sendMail(mailOptions);
}


export const signup = async (req, res) => {
    const {email, phone, password} = req.body;

    try {
        if(!email || !phone || !password){
            console.log('error')
            return res.status(400).json({message: "All fields are required"})
        }

        const existingUser = await User.findOne({email})
        if(existingUser){

            console.log('user exist')
            return res.status(400).json({ message: 'User already exists' });
        }

        if(phone.length > 11){
          return res.status(400).json({message: "phone number should not exceed 11 characters"})
        }
        if(phone.length < 11){
          return res.status(400).json({message: "phone number shouldnt be less than 11 characters"})
        }

        
       
    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString(); // OTP generation
    const uniqueNumber = `RL-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    const verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

   
    // const result = await cloudinary.v2.uploader.upload(req.file.path);
    // const profilePicture = result.secure_url;

    const user = new User({
        email, phone, password: hashedPassword, uniqueNumber,
        verificationToken,
        verificationTokenExpiresAt,
    })

    await user.save();
    try {
      // await sendOTPEmail(user.email, verificationToken);
      res.status(201).json({
          message: 'User registered successfully. Please check your email to verify your account',
          user: { ...user._doc, password: undefined },
        });
    } catch (error) {
      console.log(error)
      res.status(500).json({message: "an error occurred while saving"})
    }

  

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong during registration' });
    }
}

export const verifyEmail = async (req, res) => {
    const { code } = req.body;
  
    try {
      const user = await User.findOne({
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


  // Login controller
export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user || !(await bcryptjs.compare(password, user.password))) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }
  
      
      user.lastLogin = new Date();
      // await user.save();
  
      // // Generate JWT and set it in cookie
      // generateTokenAndSetCookie(res, user._id);
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
  };
  

  export const logout = async (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};



export const updateUserProfile = async (req, res) => {
    const {email, phone, password, profilePicture} = req.body

    try {
        const userId = req.user.Id;
        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({message:"user not found"})
        }

        user.email= email || user.email;
        user.phone = phone || user.phone;
       if(profilePicture){
        user.profilePicture = profilePicture;
       }
       await user.save()
       res.status(200).json({
        message: 'Profile updated successfully',
        user: {
            ...user.toObject(),
            password: undefined, 
        },
    });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong while updating profile' });
    }
}

export const getUserProfile = async(req, res) => {
    try {
        const userId = req.user.id; 
        const user = await User.findById(userId).select('-password'); 

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
            phone: user.phone,
          
        },
    });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong while fetching user profile' });
    }
}

export const forgotPassword = async (req, res) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });

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
        user:"essentialng23@gmail.com",
      pass:"clepxviuvbxqbedp"
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
  const user = await User.findOne({ resetToken });
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


export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};



export const updateUserStatus = async (req, res) => {
    try {
      const { userId, actionType } = req.body; 
  
      
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ msg: 'User not found' });
  
    
      if (actionType === 'block') {
        user.status = 'blocked';
      } else if (actionType === 'activate') {
        user.status = 'active';
      } else if (actionType === 'verify') {
        user.isVerified = true;
      }
  
    
      await user.save();
      res.status(200).json({ msg: 'User status updated successfully', user });
    } catch (err) {
      res.status(500).json({ msg: 'Server error', error: err.message });
    }
  };


  export const getAllusers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  export const isVerifiedUser = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.isVerified = true;
      await user.save();
  
      res.status(200).json({ message: 'User verified successfully!' });
      
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
      
    }
  }
  
  


  
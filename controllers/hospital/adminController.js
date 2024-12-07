import User from "../../models/hospitals/userSchema.js"
import jwt from 'jsonwebtoken';
import Appointment from "../../models/hospitals/appointmentSchema.js"
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "cloudinary"
import nodemailer from "nodemailer"
import crypto from "crypto"
import bcrypt from "bcryptjs";
import Staff from "../../models/hospitals/staffSchema.js";
import { protect2 } from "../../middleware/protect.js";
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
    if(!admin){
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
        if (req.files.picture1) {
          updates.picture1 = await uploadFile(req.files.picture1);
        }
        if (req.files.picture2) {
          updates.picture2 = await uploadFile(req.files.picture2);
        }

        if (req.files.picture3) {
          updates.picture3 = await uploadFile(req.files.picture3);
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



export const getAdminDashboard = async(req, res) => {


    const userId = req.user.id;

    let user = await User.findById(userId)
  
    if (!user) {
      res.status(404).json({message:"User not found."});
    }

    res.status(200).json(user);

  
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
      console.log(error)
      res.status(500).json({ message:  error.message });
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



  export const getAllHospital = async(req, res) => {
    try {
const hospital = await User.find({role: 'admin',})
res.status(200).json(hospital)
    } catch (error) {
      console.log(error)
      res.status(500).json({message: "hospitals not found"})
    }
  }














































  export const registerHospitalStaff = async (req, res) => {
    const { hospitalName, email, password, role} = req.body;
  
    if (!hospitalName || !email || !password || !role) {
      res.status(400);
      throw new Error("Username and password are required.");
    }

    const existingstaff = await Staff.findOne({ email });
    if (existingstaff) {
      res.status(400).json({message:"User with this username already exists."});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const staff = new Staff({
      hospitalName,
      email,
      password: hashedPassword,
      role
    });

    await staff.save();

    res.status(201).json({
      message: "User registered successfully.",
      staff,
    });
  

  }


  export const loginHospitalStaff = async(req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Username and password are required.");
    }
    const user = await Staff.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "email not found " });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(404).json({message: "Invalid  password."});
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message:"Login successful",
      token, user})

  }

export const doctordashboard = async(req, res) =>{

    const userId = req.user.id;

    let user = await Staff.findById(userId)
    if (!user) {
      user = await User.findById(userId);
    }
;
    if (!user) {
      res.status(404);
      throw new Error("User not found.");
    }

    res.status(200).json(user);

  
}

export const nursedashboard = async(req, res) =>{

  const userId = req.user.id;

  let user = await Staff.findById(userId)
  if (!user) {
    user = await User.findById(userId);
  }
;
  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  res.status(200).json(user);


}

export const patientdashboard = async(req, res) => {


    const userId = req.user.id;

    let user = await Staff.findById(userId);
    if (!user) {
      user = await User.findById(userId);
    }
    if (!user) {
      res.status(404);
      throw new Error("User not found.");
    }

    res.status(200).json(user);

  }

  
  export const doctoreditdashboard = async(req, res) => {

  

    const {id} = req.params

    const user = await Staff.findById(id);
    if (!user) {
      res.status(404);
      throw new Error("School not found.");
    }

    if (user._id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Not authorized to update this school.");
      }
      const updates = { ...req.body };

      const uploadFile = async (file) => {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "schools",
        });
        return result.secure_url;
      };

      if (req.files) {
        if (req.files.picture1) {
          updates.picture1 = await uploadFile(req.files.picture1);
        }
      }

    
   

    const updatedUser = await Staff.findByIdAndUpdate(id, updates, {
        new: true,
      });
      console.log(updatedUser)
      if (!updatedUser) {
        res.status(500);
        throw new Error("Failed to update exam.");
      }
    
      res.status(200).json({
        message: "Exam updated successfully.",
        updatedUser,
      });


  }


  export const nurseeditdashboard = async(req, res) => {

  

    const {id} = req.params

    const user = await Staff.findById(id);
    if (!user) {
      res.status(404);
      throw new Error("School not found.");
    }

    if (user._id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Not authorized to update this school.");
      }
      const updates = { ...req.body };

      const uploadFile = async (file) => {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "schools",
        });
        return result.secure_url;
      };

      if (req.files) {
        if (req.files.picture1) {
          updates.picture1 = await uploadFile(req.files.picture1);
        }
      }

    
   

    const updatedUser = await Staff.findByIdAndUpdate(id, updates, {
        new: true,
      });
      console.log(updatedUser)
      if (!updatedUser) {
        res.status(500);
        throw new Error("Failed to update exam.");
      }
    
      res.status(200).json({
        message: "Exam updated successfully.",
        updatedUser,
      });


  }



  export const patienteditdashboard = async(req, res) => {

  

    const {id} = req.params

    const user = await Staff.findById(id);
    if (!user) {
      res.status(404);
      throw new Error("School not found.");
    }

    if (user._id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Not authorized to update this school.");
      }
      const updates = { ...req.body };

      const uploadFile = async (file) => {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "schools",
        });
        return result.secure_url;
      };

      if (req.files) {
        if (req.files.picture1) {
          updates.picture1 = await uploadFile(req.files.picture1);
        }
      }

    
   

    const updatedUser = await Staff.findByIdAndUpdate(id, updates, {
        new: true,
      });
      if (!updatedUser) {
        res.status(500);
        throw new Error("Failed to update exam.");
      }
      res.status(200).json({
        message: "Exam updated successfully.",
        updatedUser,
      });


  }




  export const getAllDoctorsForAdmin = async (req, res) => {
    try {
     
      if (req.user.role !== 'admin') {
        res.status(403);
        throw new Error('Access denied: Admins only.');
      }
  
      const doctors = await Staff.find({ role: 'doctor' }); 
      res.status(200).json(doctors);
    } catch (error) {

      res.status(500).json({ message: 'Failed to retrieve doctors', error: error.message });
    }
  };

  export const getAllNursesForAdmin = async (req, res) => {
    try {
     
      if (req.user.role !== 'admin') {
        res.status(403);
        throw new Error('Access denied: Admins only.');
      }
  
      const nurses = await Staff.find({ role: 'nurse' }); 
  
  
      res.status(200).json(nurses);
    } catch (error) {
      // Return error if something goes wrong
      res.status(500).json({ message: 'Failed to retrieve nurses', error: error.message });
    }
  };

  
  export const getAllPatientsForAdmin = async (req, res) => {
    try {
     
      if (req.user.role !== 'admin') {
        res.status(403);
        throw new Error('Access denied: Admins only.');
      }
  
      const nurses = await Staff.find({ role: 'patient' }); 
  
  
      res.status(200).json(nurses);
    } catch (error) {
      // Return error if something goes wrong
      res.status(500).json({ message: 'Failed to retrieve nurses', error: error.message });
    }
  };
  
  




  export const getAllDoctorsForAdmin3 = async (req, res) => {
    try {
     
      if (req.user.role !== 'doctor') {
        res.status(403);
        throw new Error('Access denied: doctors only.');
      }
  
      const doctors = await Staff.find(); 
      res.status(200).json(doctors);
    } catch (error) {
      
      res.status(500).json({ message: 'Failed to retrieve doctors', error: error.message });
    }
  };



  











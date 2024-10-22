import Cemetery from '../../models/cemetary/Cemetery.js';
import cloudinary from 'cloudinary';
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs';
import pkg from 'uuid';
import mongoose from 'mongoose';
const { v4: uuidv4 } = pkg;


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});




// Signup controller
export const signup = async (req, res) => {
  const {
    name,
    email,
    password,
    phone,

    openingTime,
    closingTime,
    state,
    LGA,
    address,
    cemeterySpacePrice,
    casketName,
    casketPrice,
    serviceCategory,
    chapelName,
    chapelAddress,
    flowerName,
    flowerPrice,
    verseName,
    versePrice,
  } = req.body;

  try {
    // Check if the email already exists
    const existingCemetery = await Cemetery.findOne({ email });
    if (existingCemetery) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Upload images to Cloudinary
    const profilePictureUrl = req.files.profilePicture[0].path;
    const casketImageUrl = req.files.casketImage[0].path;
    const flowerImageUrl=req.files.flowerImage[0].path
    const verseImageUrl=req.files.verseImage[0].path

   
    const uniqueNumber = uuidv4();

 
    const newCemetery = new Cemetery({
      name,
      email,
      password: hashedPassword,
      phone,
      profilePicture: profilePictureUrl,
      openingTime,
      closingTime,
      state,
      LGA,
      address,
      cemeterySpacePrice,
      casketName,
      casketPrice,
      casketImage: casketImageUrl,
      serviceCategory,
      chapelName,
      chapelAddress,
      flowerName,
      flowerPrice,
      flowerImage: flowerImageUrl,
      verseName,
      versePrice,
      verseImage: verseImageUrl,
      uniqueNumber,
    });


    await newCemetery.save();

    res.status(201).json({ message: 'Cemetery created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
   
      const cemetery = await Cemetery.findOne({ email });
      if (!cemetery) {
        return res.status(400).json({ message: 'Invalid credentials.' });
      }
  
   
      const isPasswordValid = await bcrypt.compare(password, cemetery.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials.' });
      }
  

      const token = jwt.sign({ id: cemetery._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      res.status(200).json({ token, cemetery });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  };
  


export const getCemeteries = async (req, res) => {
  try {
    const cemeteries = await Cemetery.find();
    res.status(200).json(cemeteries);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cemeteries' });
  }
};

// Get single cemetery
export const getCemetery = async (req, res) => {
  try {
    const cemetery = await Cemetery.findById(req.params.id);
    if (!cemetery) return res.status(404).json({ error: 'Cemetery not found' });
    res.status(200).json(cemetery);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cemetery' });
  }
};

// Update cemetery
export const updateCemetery = async (req, res) => {
  try {
    const updatedData = req.body;
    const cemetery = await Cemetery.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!cemetery) return res.status(404).json({ error: 'Cemetery not found' });
    res.status(200).json(cemetery);
  } catch (error) {
    res.status(500).json({ error: 'Error updating cemetery' });
  }
};

// Delete cemetery
export const deleteCemetery = async (req, res) => {
  try {
    const cemetery = await Cemetery.findByIdAndDelete(req.params.id);
    if (!cemetery) return res.status(404).json({ error: 'Cemetery not found' });
    res.status(200).json({ message: 'Cemetery deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting cemetery' });
  }
};

export const getOtherCemeteryProfile = async (req, res) => {
    console.log('Request parameters:', req.params); 
    try {
      const { id } = req.params;
      console.log(req.params)
  
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log("id not found")
        return res.status(400).json({ success: false, message: 'Invalid user ID' });
      }
  
      const user = await Cemetery.findById(id).select('-password');
  
      if (!user) {
        console.log("User not found");
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      res.status(200).json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          state: user.state,
          LGA: user.LGA,
          profilePicture: user.profilePicture,
          uniqueNumber: user.uniqueNumber,
          cemeterySpacePrice: user.cemeterySpacePrice,
          serviceCategory: user.serviceCategory,
          chapelName: user.chapelName,
      
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Something went wrong' });
    }
  };



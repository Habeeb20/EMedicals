import Admin from '../../models/cemetary/Admin.js';
import Cemetery from '../../models/cemetary/Cemetery.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cloudinary from 'cloudinary';

export const signupAdmin = async (req, res) => {
    try {
      const { username, password, profilePicture } = req.body;
      
      // Upload profile picture to Cloudinary
      const result = await cloudinary.v2.uploader.upload(profilePicture, {
        folder: 'profile_pictures',
      });
  
      const admin = new Admin({
        username,
        password,
        profilePicture: result.secure_url,
      });
      
      await admin.save();
      res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error signing up admin', details: error.message });
    }
  };

  export const loginAdmin = async (req, res) => {
    try {
      const { username, password } = req.body;
      const admin = await Admin.findOne({ username });
      if (!admin) return res.status(404).json({ error: 'Admin not found' });
  
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
  
      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.status(200).json({ token, admin });
    } catch (error) {
      res.status(500).json({ error: 'Error logging in', details: error.message });
    }
  }
// Create Cemetery
export const createCemetery = async (req, res) => {
  const cemeteryData = req.body;

  try {
    const cemetery = new Cemetery(cemeteryData);
    await cemetery.save();
    res.status(201).json(cemetery);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};

// Update Cemetery
export const updateCemetery = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const cemetery = await Cemetery.findByIdAndUpdate(id, updates, { new: true });
    if (!cemetery) {
      return res.status(404).json({ message: 'Cemetery not found' });
    }
    res.json(cemetery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Cemetery
export const deleteCemetery = async (req, res) => {
  const { id } = req.params;

  try {
    const cemetery = await Cemetery.findByIdAndDelete(id);
    if (!cemetery) {
      return res.status(404).json({ message: 'Cemetery not found' });
    }
    res.json({ message: 'Cemetery deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getAllCemetery = async (req, res) => {
    try {
        const cemeteries = await Cemetery.find()
        return res.status(200).json({message: "successful"})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getCemeteryProfileById = async (req, res) => {
    try {
      const cemeteryId = req.params.id; // Get the cemetery ID from the request parameters
      const cemetery = await Cemetery.findById(cemeteryId); // Find cemetery by ID
  
      if (!cemetery) {
        return res.status(404).json({ message: 'Cemetery profile not found' });
      }
  
      return res.status(200).json(cemetery); // Return the found cemetery profile
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

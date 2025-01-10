
import bcryptjs from 'bcryptjs';
import User from '../../models/pharmacy/puser.model.js';
import {generateToken} from '../../utils/generateTokenAndSetCookie.js';
import jwt from "jsonwebtoken"
export const registerUser = async (req, res) => {
  const { name, email, password, phone,address, state, LGA  } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({ name, email, password, phone,address, state });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      LGA:user.LGA,
      state: user.state,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if(!user || !(await bcryptjs.compare(password, user.password))){
      return res.status(400).json({success: false, message: 'invalid credentials'})
    }
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      user,
      token
      
    });
    console.log('user details',user, token)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "server error"})
  }



};


export const profile = async (req, res) => {
  try {
    const pharmacy = await User.findById(req.user.id);
    if(!pharmacy) return res.status(404).json({msg: "account not found"})

    res.status(200).json({success:true, pharmacy})
  } catch (error) {
    console.log(error, "an error is here")
    res.status(500).json({error: 'failed to get profile'})
  }
}

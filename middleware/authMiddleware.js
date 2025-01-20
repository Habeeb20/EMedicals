import jwt from 'jsonwebtoken';
import Admin from '../models/cemetary/Admin.js';
import User from '../models/newPharmacy/userModel.js';
import { createError } from '../utils/error.js';
import Wellness from '../models/wellness.js';
import asyncHandler from "express-async-handler"
import Undertaker from '../models/underTaker/undertaker.js';
import TeleUser from '../models/Telemedicine/tUserModel.js';
import LabUser from '../models/Lab/Lab.Model.js';




const JWT_SECRET = "jwt_secret";

// Protect routes
export const protect20 = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User1.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is invalid" });
  }
};

// Restrict access based on role
export const restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};


export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.admin = await Admin.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};









export const isAuthenticate = async (req, res, next) => {
  try {
    const token = req.cookies.access_token; 

    if (!token) {
    
      return next(createError(401, "Unauthorized: No token provided"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
    
        return next(createError(403, "Forbidden: Invalid token"));
      }

      req.user = user; 
      next(); 
    });
  } catch (error) {
 
    next(error);
  }
};





export const auth = (roles = []) => {
    return (req, res, next) => {
        const token = req.header('Authorization').split(' ')[1];
        if (!token) return res.status(403).send('Access Denied');
        
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            next();
        } catch (error) {
            res.status(400).send('Invalid Token');
        }
    };
};





export const protect4 = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Extract token from header

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user info to request
      req.user = await Wellness.findById(decoded.id).select("-password");
      if (!req.user) {
        res.status(401);
        throw new Error("User not found.");
      }

      next(); // Proceed to the next middleware/controller
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed.");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token provided.");
  }
});




export const protect5 = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Extract token from header

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user info to request
      req.user = await Hospital.findById(decoded.id).select("-password");
      if (!req.user) {
        res.status(401);
        throw new Error("User not found.");
      }

      next(); // Proceed to the next middleware/controller
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed.");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token provided.");
  }
});




export const protect6 = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Extract token from header

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user info to request
      req.user = await TeleUser.findById(decoded.id).select("-password");
      if (!req.user) {
        res.status(401);
        throw new Error("User not found.");
      }

      next(); // Proceed to the next middleware/controller
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed.");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token provided.");
  }
});




export const protect8 = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {

      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to the request
      req.user = await LabUser.findById(decoded.id).select("-password");
      if (!req.user) {
        return res.status(404).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      console.error("Token verification error:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
};




export const protect10 = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {

      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to the request
      req.user = await Undertaker.findById(decoded.id).select("-password");
      if (!req.user) {
        return res.status(404).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      console.error("Token verification error:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
};






export const protect15 = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, please login");
    }

    // Verify Token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // Get user id from token
    const user = await User.findById(verified.id).select("-password");

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, please login");
  }
});

import jwt from "jsonwebtoken"
import User from "../models/pharmacy/puser.model.js"
// import Staff from "../models/hospitals/staffSchema.js";
import User1 from "../models/hospitals/userSchema.js";

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};


export const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};


export const protect3 = async (req, res, next) => {
    let token;
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1]; 
  
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
        // Attach user info to request
        req.user = await Staff.findById(decoded.id).select("-password");
        if (!req.user) {
          res.status(401).json({message:"User not found."});
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
  };
  


export const protect2 = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check the role from the token
      if (decoded.role === 'admin') {
        // Admin role, attach staff info to request
        req.user = await User1.findById(decoded.id).select('-password');
        if (!req.user) {
          res.status(401);
          throw new Error('Admin not found.');
        }
      } else if (decoded.role === 'doctor') {
        // Doctor role, attach doctor info to request
        req.user = await Staff.findById(decoded.id).select('-password');
        if (!req.user) {
          res.status(401);
          throw new Error('Doctor not found.');
        }
      } else {
        // Handle invalid role (not admin or doctor)
        res.status(403);
        throw new Error('Invalid role, access denied.');
      }

      next();  // Proceed to the next middleware/controller
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed.');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token provided.');
  }
};



export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Not authorized to access this route' });
    }
    next();
  };
};

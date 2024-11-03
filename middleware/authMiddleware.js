import jwt from 'jsonwebtoken';
import Admin from '../models/cemetary/Admin.js';
import User from '../models/Doctors/chat/user.model.js';
import { createError } from '../utils/error.js';
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




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
    const token = req.cookies.access_token; // Retrieve token from cookies

    if (!token) {
      // If no token found, send unauthorized error
      return next(createError(401, "Unauthorized: No token provided"));
    }

    // Verify token using JWT secret
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        // If token is invalid or expired, send forbidden error
        return next(createError(403, "Forbidden: Invalid token"));
      }

      req.user = user; // Attach decoded user data to request
      next(); // Proceed to the next middleware or route handler
    });
  } catch (error) {
    // Catch any unexpected errors and pass to error handler
    next(error);
  }
};


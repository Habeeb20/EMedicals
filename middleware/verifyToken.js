import jwt from 'jsonwebtoken';
import User from "../models/hospitals/userSchema.js"


export const verifyToken = (req, res, next) => {
  let token = req.header('authorization');

  token = token.split(' ')[1]
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
 
    req.user = decoded;
    next();
  } catch (e) {
    console.log(e)
    res.status(400).json({ msg: 'Token is not valid' });
  }
};







export const verifyToken2 = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,
      adminId: decoded.adminId, // Attach adminId to req.user
      role: decoded.role,
    };
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(403).json({ message: "Invalid token" });
  }
};


export const auth = (allowedRoles) => async (req, res, next) => {
  try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (!user || !allowedRoles.includes(user.role)) {
          return res.status(403).json({ error: 'Access denied' });
      }

      req.user = user;
      next();
  } catch (error) {
      res.status(401).json({ error: 'Please authenticate' });
  }
};






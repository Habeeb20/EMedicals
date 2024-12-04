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
    res.status(400).json({ msg: 'Token is not valid' });
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






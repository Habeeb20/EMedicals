import React from 'react';
import { Navigate } from 'react-router-dom';


const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token ? true : false; 
//   try {
//     const decodedToken = jwtDecode(token);
//     const currentTime = Date.now() / 1000;  // Get current time in seconds

//     // Check if token is expired
//     if (decodedToken.exp < currentTime) {
//       localStorage.removeItem('token'); // Remove expired token
//       return false;
//     }
    
//     return true;
//   } catch (error) {
//     return false;
//   }

 };


const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/userlogin" />;
};

export default PrivateRoute;

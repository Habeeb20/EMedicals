
import {jwtDecode}  from 'jwt-decode';

export const getSellerIdFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found in localStorage');
    return null;
  }

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.sellerId; 
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

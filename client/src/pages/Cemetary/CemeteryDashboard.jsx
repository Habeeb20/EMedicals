// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CemeteryDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_API_c}/cprofile`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch profile details.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading...</div>; // Show a loading indicator
  }

  if (!userData) {
    return <div className="text-center p-4">No user data available.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center">Dashboard</h1>
      <div className="mt-4 p-4 border rounded-lg shadow-md bg-white">
        <h2 className="text-xl font-semibold">Profile Information</h2>
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Phone:</strong> {userData.phone}</p>
        <p><strong>Gmail:</strong> {userData.gmail}</p>
        <p><strong>Opening Time:</strong> {userData.openingTime}</p>
        <p><strong>Closing Time:</strong> {userData.closingTime}</p>
        <p><strong>State:</strong> {userData.state}</p>
        <p><strong>LGA:</strong> {userData.LGA}</p>
        <p><strong>Address:</strong> {userData.address}</p>
        <p><strong>Cemetery Space Price:</strong> {userData.cemeterySpacePrice}</p>

        <h3 className="mt-4 text-lg font-semibold">Caskets</h3>
        {userData.caskets.length > 0 ? (
          userData.caskets.map((casket, index) => (
            <div key={index} className="mt-2 p-2 border rounded-lg">
              <p><strong>Name:</strong> {casket.name}</p>
              <p><strong>Price:</strong> {casket.price}</p>
              {casket.imageUrl && (
                <img src={casket.imageUrl} alt={casket.name} className="w-32 h-32 object-cover mt-2" />
              )}
            </div>
          ))
        ) : (
          <p>No caskets available.</p>
        )}

        <h3 className="mt-4 text-lg font-semibold">Chapel Information</h3>
        {userData.chapel.length > 0 ? (
          userData.chapel.map((chapel, index) => (
            <div key={index} className="mt-2 p-2 border rounded-lg">
              <p><strong>Name:</strong> {chapel.name}</p>
              <p><strong>Address:</strong> {chapel.address}</p>
            </div>
          ))
        ) : (
          <p>No chapel information available.</p>
        )}

        <h3 className="mt-4 text-lg font-semibold">Flowers</h3>
        {userData.flowers.length > 0 ? (
          userData.flowers.map((flower, index) => (
            <div key={index} className="mt-2 p-2 border rounded-lg">
              <p><strong>Name:</strong> {flower.name}</p>
              <p><strong>Price:</strong> {flower.price}</p>
              {flower.imageUrl && (
                <img src={flower.imageUrl} alt={flower.name} className="w-32 h-32 object-cover mt-2" />
              )}
            </div>
          ))
        ) : (
          <p>No flowers available.</p>
        )}

        <h3 className="mt-4 text-lg font-semibold">Verses</h3>
        {userData.verse.length > 0 ? (
          userData.verse.map((verse, index) => (
            <div key={index} className="mt-2 p-2 border rounded-lg">
              <p><strong>Name:</strong> {verse.name}</p>
              <p><strong>Price:</strong> {verse.price}</p>
              {verse.imageUrl && (
                <img src={verse.imageUrl} alt={verse.name} className="w-32 h-32 object-cover mt-2" />
              )}
            </div>
          ))
        ) : (
          <p>No verses available.</p>
        )}

        <h3 className="mt-4 text-lg font-semibold">Wears</h3>
        {userData.wears.length > 0 ? (
          userData.wears.map((wear, index) => (
            <div key={index} className="mt-2 p-2 border rounded-lg">
              <p><strong>Name:</strong> {wear.name}</p>
              <p><strong>Price:</strong> {wear.price}</p>
              {wear.imageUrl && (
                <img src={wear.imageUrl} alt={wear.name} className="w-32 h-32 object-cover mt-2" />
              )}
            </div>
          ))
        ) : (
          <p>No wears available.</p>
        )}
      </div>
    </div>
  );
};

export default CemeteryDashboard;

import React from 'react';

const SearchPage = ({ image, name, contact, email, location, state, localGovtArea, bio, uniqueNumber, category }) => {
  return (
    <div className="flex items-center space-x-4 p-4 border-b">
      <img src={image} alt={name} className="w-16 h-16 rounded-full" />
      <div>
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-gray-600">Contact: {contact}</p>
        <p className="text-gray-600">Email: {email}</p>
        <p className="text-gray-600">Location: {location}</p>
        <p className="text-gray-600">State: {state}</p>
        <p className="text-gray-600">Local Govt Area: {localGovtArea}</p>
        <p className="text-gray-600">Bio: {bio}</p>
        <p className="text-gray-600">uniqueNumber: {uniqueNumber}</p>
        <p className="text-gray-600">category: {category}</p>
      
      </div>
    </div>
  );
};

export default SearchPage;

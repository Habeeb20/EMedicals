
import React from "react";
import { FaPlus, FaCheck } from "react-icons/fa";

const SearchPage = ({ image, name, location, price, added }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md my-2">
    <div className="flex items-center space-x-4">
      <img src={image} alt="service" className="w-16 h-16 rounded-md" />
      <div>
        <h3 className="font-bold">{name}</h3>
        <p className="text-gray-500 text-sm">{location}</p>
        <p className="font-bold text-lg">€ {price}</p>
      </div>
    </div>
    {added ? (
      <div className="flex items-center space-x-2">
        <p className="text-green-500 font-semibold">1 added</p>
        <FaCheck className="text-green-500 text-xl" />
      </div>
    ) : (
      <FaPlus className="text-blue-500 text-xl" />
    )}
  </div>
);

export default SearchPage;

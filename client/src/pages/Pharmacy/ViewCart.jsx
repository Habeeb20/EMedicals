import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';

const ViewCart = () => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <>
        <Navbar />
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md md:max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Your cart</h2>
        <div className="space-y-4">
          {/* Cart Item */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="https://via.placeholder.com/60" // Replace with actual image URL
                alt="Product"
                className="w-16 h-16 rounded bg-blue-100 p-2"
              />
              <div className="ml-4">
                <p className="text-lg font-semibold">BioSil On Your Game</p>
                <p className="text-sm text-gray-500">60 capsules</p>
                <p className="text-lg font-semibold mt-1">€ 30,55</p>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={decrement}
                className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-lg font-bold text-purple-600"
              >
                -
              </button>
              <span className="mx-3 text-lg">{quantity}</span>
              <button
                onClick={increment}
                className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-lg font-bold text-purple-600"
              >
                +
              </button>
            </div>
          </div>

          {/* Duplicate the item for demonstration */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="https://via.placeholder.com/60" // Replace with actual image URL
                alt="Product"
                className="w-16 h-16 rounded bg-blue-100 p-2"
              />
              <div className="ml-4">
                <p className="text-lg font-semibold">BioSil On Your Game</p>
                <p className="text-sm text-gray-500">60 capsules</p>
                <p className="text-lg font-semibold mt-1">€ 30,55</p>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={decrement}
                className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-lg font-bold text-purple-600"
              >
                -
              </button>
              <span className="mx-3 text-lg">{quantity}</span>
              <button
                onClick={increment}
                className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-lg font-bold text-purple-600"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="border-t border-gray-300 mt-6 pt-4">
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Order amount</span>
            <span>€ 30,55</span>
          </div>
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Shipping costs</span>
            <span className="text-gray-500">Calculated in next step</span>
          </div>
          <div className="border-t border-gray-300 mt-4 pt-4 flex justify-between font-bold text-lg">
            <span>Total amount</span>
            <span>€ 34,00</span>
          </div>
        </div>

        {/* Place Order Button */}
        <Link to="/orderdetails">
        <button className="mt-6 w-full bg-purple-600 text-white py-3 rounded-lg text-lg font-bold hover:bg-purple-700">
          Place order
        </button>

        </Link>

      </div>
    </div>

    </>

  );
};

export default ViewCart;

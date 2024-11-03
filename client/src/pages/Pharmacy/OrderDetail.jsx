import React from 'react';
import Navbar from '../../components/Navbar';

const OrderDetails = () => {
  return (
    <>
        <Navbar/>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md md:max-w-lg bg-white shadow-lg rounded-lg p-6">
        {/* Back button */}
        <button className="text-gray-500 text-xl mb-4">{'←'}</button>

        {/* Order Header */}
        <h2 className="text-2xl font-bold">Order #192018</h2>
        <p className="text-sm text-gray-500 mb-6">13/10/2020</p>

        {/* Order Items */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="https://via.placeholder.com/60" // Replace with actual image URL
                alt="Product"
                className="w-16 h-16 rounded bg-purple-100 p-2"
              />
              <div className="ml-4">
                <p className="text-lg font-semibold">BioSil Capsules</p>
                <p className="text-sm text-gray-500">60 capsules</p>
                <p className="text-lg font-semibold mt-1">€ 30,55</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm">2 ordered</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="https://via.placeholder.com/60" // Replace with actual image URL
                alt="Product"
                className="w-16 h-16 rounded bg-purple-100 p-2"
              />
              <div className="ml-4">
                <p className="text-lg font-semibold">BioSil Capsules</p>
                <p className="text-sm text-gray-500">60 capsules</p>
                <p className="text-lg font-semibold mt-1">€ 30,55</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm">1 ordered</p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="border-t border-gray-300 mt-6 pt-4">
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Order amount</span>
            <span>€ 30,55</span>
          </div>
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Shipping costs</span>
            <span>€ 3,45</span>
          </div>
          <div className="border-t border-gray-300 mt-4 pt-4 flex justify-between font-bold text-lg">
            <span>Total amount</span>
            <span>€ 34,00</span>
          </div>
        </div>

        {/* View Full Order Button */}
        <button className="mt-6 w-full bg-purple-600 text-white py-3 rounded-lg text-lg font-bold hover:bg-purple-700 flex items-center justify-center">
          View full order <span className="ml-2">→</span>
        </button>
      </div>
    </div>
    </>

  );
};

export default OrderDetails;

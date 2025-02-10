import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/solid";

const MPaymentFailure = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const reference = params.get("reference");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
      <div className="bg-white p-8 shadow-lg rounded-lg text-center">
        <XCircleIcon className="w-16 h-16 text-red-500 mx-auto" />
        <h2 className="text-2xl font-semibold mt-4 text-red-700">
          Payment Failed
        </h2>
        <p className="text-gray-600 mt-2">
          Your payment could not be processed. Reference ID:
        </p>
        <p className="font-semibold text-gray-800">{reference}</p>
        <button
          className="mt-6 px-6 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 transition"
          onClick={() => navigate("/mmakepayment")}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default MPaymentFailure;

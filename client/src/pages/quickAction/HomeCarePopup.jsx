import React, { useState } from "react";
import m from "../../assets/EMedicals/sa.png"
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
const HomeCarePopup = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate()

  const closePopup = () => {
    setIsOpen(false);
    navigate("/get-home-care")
  };

  if (!isOpen) return null;

  return (
    <>
        <Navbar />
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-11/12 max-w-lg rounded-xl shadow-lg p-6">
        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src={m}
            alt="Home Care Service"
            className="w-3/4 max-w-xs mb-4"
          />
        </div>
        {/* Text Section */}
        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            Welcome to our Home Care Service!
          </h1>
          <p className="text-sm md:text-base text-gray-600 mb-6">
            We're delighted to support you with personalized, compassionate care
            right in the comfort of your home either for you or your loved ones.
            We provide you with options of caregivers, nurses, private fitness
            professionals, and lots more. We are solely facilitators and we are
            here to assist. Your well-being is our top priority!
          </p>
        </div>
      
        <div className="text-center">
          <button
            onClick={closePopup}
            className="w-full py-2 text-white bg-purple-500 rounded-lg hover:bg-purple-600 transition-all"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
    </>

  );
};

export default HomeCarePopup;

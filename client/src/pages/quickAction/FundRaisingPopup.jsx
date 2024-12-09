import React, { useState } from "react";
import m from "../../assets/EMedicals/pu.jpg"
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
const FundRaisingPopup = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate()

  const closePopup = () => {
    setIsOpen(false);
    navigate("/raisefund")
  };

  if (!isOpen) return null;

  return (
    <>
        <Navbar />
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#5A27FF] w-11/12 max-w-lg rounded-xl shadow-lg p-6">
      <h2 className="text-center text-white">Raise fund</h2>
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
       
          <p className="text-sm md:text-base text-white mb-6">
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
            className="w-full py-2 bg-white text-[#5A27FF] rounded-lg hover:bg-[#5A27FF] hover:text-black transition-all"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
    </>

  );
};

export default FundRaisingPopup;

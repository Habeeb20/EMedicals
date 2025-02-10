import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import im from "../../assets/EMedicals/floatingLogo.png";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { motion } from "framer-motion";

const UMakePayment = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(100000);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user email from localStorage or authentication state
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.email) {
      setEmail(user.email);
      console.log("User email:", user.email);
    }

    if (location.state?.amount) {
      setAmount(location.state.amount);
    }
  }, [location.state]);

  const handlePayment = async (e) => {
    e.preventDefault(); // Prevent form submission
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/paystack/pay`,
        { email, amount }
      );

      console.log("Paystack response:", response.data);

      if (response.data?.authorization_url) {
        window.location.href = response.data.authorization_url;
      } else {
        console.error("Authorization URL is missing.");
      }
    } catch (error) {
      console.error("Payment initiation failed", error);
      setError("Payment initiation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-xs mx-auto">
        <div className="flex justify-center mb-4">
          <img src={im} alt="logo" className="rounded-full w-20 h-20" />
        </div>

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">Make Payment</h2>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <form onSubmit={handlePayment}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <p className="text-lg font-semibold text-gray-700">Amount: ₦{amount.toLocaleString()}</p>

            <div className="flex items-center justify-center">
              <motion.button
                className="mt-5 w-full py-3 px-4 bg-blue-700 text-white font-bold rounded-lg shadow-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-2" />
                    Redirecting...
                  </span>
                ) : (
                  "Proceed to Payment"
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UMakePayment;

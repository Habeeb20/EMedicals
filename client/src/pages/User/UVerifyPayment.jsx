import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const UVerifyPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [reference, setReference] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [redirectUrl, setRedirectUrl] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const reference = params.get("reference");
        console.log(reference)

        if (!reference) {
          throw new Error("No payment reference found");
        }

        setReference(reference); // Store reference for display

        const response = await axios.get(
          `${import.meta.env.VITE_API}/paystack/verify?reference=${reference}`,
         
        );

    

        if (response.status === 200) {
          setSuccessMessage("payment successful, Redirecting...")
          setRedirectUrl(response.data.redirectUrl);
          setTimeout(() => {
            window.location.href = response.data.redirectUrl; // Redirect after receiving the URL
          }, 3000); 
          // navigate("/loginhospitaladmin");
     
        } else {
          console.log("payment failed")
          setErrorMessage('payment failed')
          navigate("/upayment-failed");
        }
      } catch (error) {
        console.error("error!!!", error);
        setErrorMessage("Payment verification failed.");
        navigate("/umakepayment");
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [location, navigate]);

  if (verifying) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold">Verifying your payment...</h2>
          <p className="text-gray-600">Please don't close this window, you will be redirected shortly</p>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">{errorMessage}</p>
          <p className="text-gray-600">Redirecting to payment failed page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-green-600">
          Payment Successful
        </h2>
        <p className="text-gray-600">
          Your payment was successful. Reference: {reference}
        </p>
      </div>
    </div>
  );
};

export default UVerifyPayment;





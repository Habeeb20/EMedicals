import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import toast from "react-hot-toast";
const SelectedCare = () => {
  const location = useLocation();
  const { selectedOption } = location.state || {};
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    contact: "",
    location: "",
    address: "",
    duration: "",
    typeOfCare: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (selectedOption === "Doctor") {
          const [responseA, responseB] = await Promise.all([
            fetch(`${import.meta.env.VITE_API_D}/doctorgetall`),
            fetch(`${import.meta.env.VITE_API_HO}/doctorgetall`),
          ]);

          if (!responseA.ok || !responseB.ok) {
            throw new Error("Failed to fetch data from one or both endpoints");
          }

          const dataA = await responseA.json();
          const dataB = await responseB.json();
          const combinedData = [
            ...dataA,
            ...dataB.filter((item) => item.role === "doctor"),
          ];
          setData(combinedData);
        } else if (selectedOption === "Nurse") {
          const response = await fetch(
            `${import.meta.env.VITE_API_HO}/nursegetall`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch data for nurses");
          }
          const result = await response.json();
          setData(result);
        } else {
          setError("Invalid selection");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedOption]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedItem) {
      // Email simulation: Replace with your backend API call
      console.log("Form submitted to:", selectedItem.email, formData);
      toast.success(`Form submitted to: ${selectedItem.email}`);
      setIsModalOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Get a {selectedOption}
        </h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-lg flex flex-col"
            >
              <p>
              <img
  src={item.profilePicture}
  alt={item.email || "Profile Picture"}
  className="w-24 h-24 rounded-full object-cover mx-auto"
/>

                <strong>Name:</strong> {item.fullname || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {item.email || "N/A"}
              </p>
              <p>
                <strong>Phone:</strong> {item.phoneNumber || item.phone}
              </p>
              <p>
                <strong>Gender:</strong> {item.gender || "N/A"}
              </p>
              <button
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={() => {
                  setSelectedItem(item);
                  setIsModalOpen(true);
                }}
              >
                Book
              </button>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full h-96 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Booking Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.name}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="age"
                placeholder="Enter your age"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.age}
                onChange={handleInputChange}
              />
              <input
                type="tel"
                name="contact"
                placeholder="Enter your contact"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.contact}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="location"
                placeholder="Enter your location"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.location}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="address"
                placeholder="Enter your address"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.address}
                onChange={handleInputChange}
              />
              <select
                name="duration"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.duration}
                onChange={handleInputChange}
              >
                <option value="">Select Duration</option>
                {[...Array(8).keys()].map((i) => (
                  <option key={i + 1} value={`${i + 1} week`}>
                    {i + 1} week
                  </option>
                ))}
              </select>
              <select
                name="typeOfCare"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.typeOfCare}
                onChange={handleInputChange}
              >
                <option value="">Select Type of Care</option>
                <option value="Basic Home Check">Basic Home Check</option>
                <option value="Recovery Care">Recovery Care</option>
                <option value="Rehabilitation Care">
                  Rehabilitation Care
                </option>
              </select>
              <p className="text-sm text-red-500">
                Note: Please ensure all information is accurate before
                submitting and note that you will be requested to pay 5000 naira before your selected personnel.
              </p>
              <button
                type="submit"
                className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
              >
                Submit
              </button>
            </form>
            <button
              className="mt-4 w-full bg-gray-300 text-black p-2 rounded hover:bg-gray-400"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectedCare;

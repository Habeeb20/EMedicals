import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";

const FormLabAppointment = () => {
  const { labId } = useParams();
  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [testName, setTestName] = useState("");
  const [price, setPrice] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientContact, setPatientContact] = useState("");
  const [loading, setLoading] = useState(false);

  const testOptions = [
    "Genotype",
    "checkUps",
    "Blood Test",
    "Urine Test",
    "X-ray",
    "Stool Test",
    "Blood Group",
    "HIV/AIDS",
    "Malaria",
    "Typhoid",
    "Tuberculosis",
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication token not found. Please log in.");
      return;
    }
    setDoctorId(token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const appointmentData = {
      labId,
      doctorId,
      patientId,
      testName,
      patientName,
      patientContact,
    };

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${import.meta.env.VITE_API_L}/booklabappointment/${labId}`, appointmentData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setLoading(false);
      toast.success("Appointment booked successfully!");
    } catch (error) {
      console.error("Error booking appointment:", error);
      setLoading(false);
      toast.error("Failed to book appointment. Please try again.");
    }
  };

  const handleTestChange = (selectedTestName) => {
    setTestName(selectedTestName);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-blue-300 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center mb-6">Book an Appointment</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* <div>
              <label htmlFor="testName" className="block text-sm font-medium text-gray-700">
                Name of Test
              </label>
              <select
                id="testName"
                value={testName}
                onChange={(e) => handleTestChange(e.target.value)}
                required
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              >
                <option value="" disabled>
                  Select a test
                </option>
                {testOptions.map((test) => (
                  <option key={test} value={test}>
                    {test}
                  </option>
                ))}
              </select>
            </div> */}

            <label className="block text-sm font-medium text-gray-700">
                Name of Test
              </label>
              <div className="mt-2 flex flex-wrap gap-4">
                {testOptions.map((test, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="radio"
                      id={`test-${index}`}
                      name="testName"
                      value={test}
                      checked={testName === test}
                      onChange={(e) => setTestName(e.target.value)}
                      required
                      className="h-4 w-4 text-blue-600 focus:ring focus:ring-blue-200"
                    />
                    <label
                      htmlFor={`test-${index}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {test}
                    </label>
                  </div>
                ))}
              </div>

            <div>
              <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">
                Name of Patient
              </label>
              <input
                type="text"
                id="patientName"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>

            <div>
              <label htmlFor="patientContact" className="block text-sm font-medium text-gray-700">
                Contact of Patient
              </label>
              <input
                type="text"
                id="patientContact"
                value={patientContact}
                onChange={(e) => setPatientContact(e.target.value)}
                required
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>

            <div className="text-center mt-6">
              <button
                type="submit"
                className={`w-full px-4 py-2 rounded-md text-white ${
                  loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
                } focus:outline-none`}
                disabled={loading}
              >
                {loading ? "sending..." : "Book Appointment"}
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default FormLabAppointment;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar";
import HideGmailPart from "../HideGmailPart";
import axios from "axios";
const RaiseFund = () => {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState([])
  const [error, setError] = useState('')
  const [loading ,setLoading] = useState(false)
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

  const options = [
    "Raise fund for myself to treat health Conditions",
    "Raise fund for a family memeber or friend",
    "Raise fund for a charity, religiouse organisation etc",

  ];

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = () => {
    if (selectedOption) {
      navigate("/selectedhomecare", { state: { selectedOption } });
    } else {
      toast.error("Please select an option");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(token);
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get(`${import.meta.env.VITE_API}/getprofile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (err) {
        console.error(err); 
        if (err.response?.status === 401) {
          setError('Unauthorized access, please login again');
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setError('Failed to fetch profile');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  if (loading) return <p className="text-center text-indigo-900">Loading profile...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
        <Navbar />
        <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center px-4 py-2 border-b">
        <button onClick={() => navigate(-1)} className="text-lg">&#8592;</button>
        <h1 className="text-lg font-bold ml-4">Hi  <HideGmailPart email={user.email} /> select who you want to raise funds for</h1>
      </div>

      {/* Search Input
      <div className="px-4 mt-4">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
          <span className="material-icons text-gray-500 mr-2">search</span>
          <input
            type="text"
            placeholder="Search care"
            className="flex-1 bg-transparent outline-none text-gray-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div> */}

      {/* Options */}
      <div className="mt-4 px-4 space-y-4">
        {filteredOptions.map((option, index) => (
          <label
            key={index}
            className="flex items-center justify-between bg-gray-100 rounded-lg p-4 cursor-pointer"
          >
            <span className="text-gray-700">{option}</span>
            <input
              type="radio"
              name="careOption"
              value={option}
              checked={selectedOption === option}
              onChange={() => setSelectedOption(option)}
              className="form-radio w-5 h-5 text-purple-500 focus:ring-purple-500"
            />
          </label>
        ))}
      </div>

      {/* Submit Button */}
      <div className="px-4 mt-6">
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-purple-500 text-white text-center font-bold rounded-full hover:bg-purple-600 transition"
        >
          Select
        </button>
      </div>
    </div>
    </>

  );
};

export default RaiseFund;

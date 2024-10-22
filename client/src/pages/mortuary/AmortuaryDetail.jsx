import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MessageModal from "./MessageModal";
import Navbar from "../../components/Navbar";
import { FaShareAlt } from "react-icons/fa";

const AmortuaryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leader, setLeader] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("GENERAL");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShare = (leader) => {
    if (navigator.share) {
      navigator
        .share({
          title: leader.name,
          text: `Check out this mortuary: ${leader.name}`,
          url: window.location.href,
        })
        .then(() => console.log("Successfully shared"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert("Sharing not supported on this device.");
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (!id) {
      setError("User ID is not found");
    }

    axios
      .get(`${import.meta.env.VITE_API_m}/mortuarydetails/${id}`)
      .then((response) => {
        setLeader(response.data.user);
        setError(null);
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to load profile. Please try again later.");
      });

    axios
      .get(`${import.meta.env.VITE_API_m}/mortuarydetails/${id}/comments`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching comments", error);
      });
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const userName = localStorage.getItem("email");
    const token = localStorage.getItem("token"); 
  
    if (!newComment || !userName || !token) return;  
  
    setLoading(true);
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_m}/mortuarydetails/${id}/comments`,
        {
          mortuaryId: id,         
          userName,                   
          commentText: newComment ,
        
        },
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`, // Send token in Authorization header
        //   },
        // }
      );
      setComments([...comments, response.data]);
      setNewComment("");
      toast.success("Comment posted successfully!");
    } catch (error) {
      console.error("Error posting comment", error);
      toast.error("Failed to post comment.");
    } finally {
      setLoading(false);
    }
  };
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        >
          Reload
        </button>
      </div>
    );
  }

  if (!leader) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        <p className="text-lg font-semibold mt-4">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="p-4 md:p-8 max-w-full mx-auto bg-gray-50 min-h-screen">
        {/* Funeral Home Card */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row md:space-x-4 items-center md:items-start">
          <img
            src={leader.profilePicture || "https://via.placeholder.com/150"}
            alt={leader.name}
            className="w-32 h-32 rounded-md object-cover"
          />
          <div className="flex flex-col justify-between text-center md:text-left mt-4 md:mt-0">
            <h2 className="font-bold text-2xl">{leader.name}</h2>
            <h6 className="font-bold ">State: {leader.state}</h6>
            <h6 className="font-bold ">LGA: {leader.localGovtArea}</h6>
            <h6 className="font-bold ">Address: {leader.address}</h6>
            <h6 className="font-bold ">Unique Number: {leader.uniqueNumber}</h6>
            <h6 className="font-bold ">
              Years in Profession: {leader.yearsInProfession} years
            </h6>
            <div className="flex items-center justify-center md:justify-start space-x-1 text-green-600">
              <FaStar />
              <span>4.7</span>
            </div>
            <p className="text-gray-400 text-sm">{leader.category}</p>
          </div>
        </div>

        {/* Opening and Closing Times */}
        <div className="flex justify-between mt-6">
          <div className="bg-gray-200 text-gray-600 p-2 rounded-lg text-sm">
            <p>Opening time</p>
            <p>1:00am</p>
          </div>
          <div className="bg-gray-200 text-gray-600 p-2 rounded-lg text-sm">
            <p>Closing time</p>
            <p>1:00am</p>
          </div>
        </div>

        {/* Services */}
        <div className="flex flex-wrap space-x-2 mt-6">
          {[
            "Cemetery",
            "Burial Service",
            "Cremation",
            "Casket",
            "Pregnancy",
          ].map((service, index) => (
            <span
              key={index}
              className="bg-green-200 text-green-700 px-3 py-1 rounded-full text-sm my-1"
            >
              {service}
            </span>
          ))}
        </div>

        {/* About Section */}
        <div className="mt-6">
          <button
            onClick={() => handleShare(leader)}
            className="bg-green-900 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <FaShareAlt className="mr-2" />
            Share
          </button>
          <h3 className="font-bold text-lg">About</h3>
          <p className="text-gray-600 text-sm mt-2">{leader.bio}</p>
          <button className="text-green-600 font-semibold mt-2">
            Contact:{" "}
          </button>
          <h5>Phone Number: {leader.phonenum}</h5>
          <h5>Email: {leader.email}</h5>
        </div>

        {/* Calendar */}
        <div className="flex space-x-2 mt-6 overflow-x-auto">
          {[
            { day: "Mon", date: "21" },
            { day: "Tue", date: "22" },
            { day: "Wed", date: "23", active: true },
            { day: "Thu", date: "24" },
            { day: "Fri", date: "25" },
            { day: "Sat", date: "26" },
          ].map((item, index) => (
            <div
              key={index}
              className={`p-2 text-center rounded-lg ${
                item.active
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              <p>{item.day}</p>
              <p>{item.date}</p>
            </div>
          ))}
        </div>

        {/* Booking Times */}
        <div className="flex flex-wrap space-x-2 mt-6">
          {[
            "09:00 AM",
            "10:00 AM",
            "11:00 AM",
            "01:00 PM",
            "02:00 PM",
            "04:00 PM",
          ].map((time, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-sm mt-2"
            >
              {time}
            </span>
          ))}
        </div>
        {/*send a direct message*/}
        <button
          onClick={handleOpenModal}
          className="text-green-600 font-semibold mt-2"
        >
          Send a direct message to this mortician
        </button>

        <MessageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          mortuaryId={id}
        />

        {/* Comments */}
        <div className="mt-6">
          <h3 className="font-bold text-lg">Comments</h3>
          {comments.length > 0 ? (
            <div className="mt-4 space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment._id}
                  className="p-3 bg-gray-100 rounded-lg shadow-md"
                >
                  <p className="text-sm font-semibold text-gray-800">
                    {comment.userName}
                  </p>{" "}
                  {/* Updated to access userName */}
                  <p className="text-gray-600 text-sm">
                    {comment.commentText}
                  </p>{" "}
                  {/* Updated to access commentText */}
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-gray-600">No comments yet.</p>
          )}
        </div>

        <form onSubmit={handleCommentSubmit} className="mt-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Write a comment..."
            disabled={loading}
          />
          <button
            type="submit"
            className={`mt-2 w-full py-2 rounded-md ${
              loading ? "bg-gray-400" : "bg-green-600 text-white"
            }`}
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Comment"}
          </button>
        </form>

        <ToastContainer />
      </div>
    </>
  );
};

export default AmortuaryDetail;

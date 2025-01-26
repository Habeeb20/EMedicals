import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import im from "../../assets/EMedicals/ikmmm.png"
import { FaEye } from "react-icons/fa";
import {
  FaSearch,
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaShareAlt,
} from "react-icons/fa";
import Navbar from "../../components/Navbar";
import { ToastContainer } from "react-toastify";
const UndertakerDetails = () => {
    const { id } = useParams();
    const [undertaker, setUndertaker] = useState(null);
    const [showFullDetails, setShowFullDetails] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userLocation, setUserLocation] = useState("");
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    const handleShare = (cemetery) => {
        if(navigator.share){
          navigator.share({
            title: cemetery.name,
            text: `check out this cemetery; ${cemetery.name}`,
            url: window.location.href,
          }).then(() => console.log("successfully shared"))
            .catch((error) => console.log("error sharing the url"))
        }else {
          alert("sharing not supported on this device")
        }
      }

      useEffect(() => {
        if(!id){
          setError("user id is not found")
        }
    
        axios
          .get(`${import.meta.env.VITE_API_U}/anundertaker/${id}`)
          .then((response) => {
            setUndertaker(response.data.undertaker);
            console.log(response.data)
            setError(null)
          })
          .catch((error) => {
            console.log(error);
            setError("failed to load profile. please try again")
    
          })
    
          axios
          .get(`${import.meta.env.VITE_API_U}/cdetails/${id}/comment`)
          .then((response) => {
            setComments(response.data);
            console.log(response.data)
          })
          .catch((error) => {
            console.error("Error fetching comments", error);
          });
    
      }, [id]);
    

      const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const userName = localStorage.getItem("email");
        if (!newComment || !userName) return;
    
        setLoading(true);
    
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_U}/cdetails/${id}/comment`,
            {
              mortuaryId: id,
              userName,
              commentText: newComment,
            }
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
      if(!undertaker){
        return(
          <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          <p className="text-lg font-semibold mt-4">Loading...</p>
        </div>
        )
      }
      
  if(error){
    return(
      <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-red-500">{error}</p>
      <button
        onClick={() => window.location.reload()}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
      >
        Reload
      </button>
    </div>
    )
  }
    
  return (
    <div>
    <Navbar />
    <div className="p-4 md:p-8 max-w-full mx-auto bg-gray-50 min-h-screen">
        {/* Funeral Home Card */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row md:space-x-4 items-center md:items-start">
          <img
            src={undertaker.picture1|| undertaker.picture2|| undertaker.picture3|| undertaker.picture4|| im }
            alt={undertaker.name}
            className="w-32 h-32 rounded-md object-cover"
          />
          <div className="flex flex-col justify-between text-center md:text-left mt-4 md:mt-0">
            <h2 className="font-bold text-2xl">{undertaker.name}</h2>
            <h6 className="font-bold ">State: {undertaker.state}</h6>
            <h6 className="font-bold ">LGA: {undertaker.LGA}</h6>
            <h6 className="font-bold ">Address: {undertaker.address}</h6>
            {/* <h6 className="font-bold ">Unique Number: {undertaker.uniqueNumber}</h6> */}
            
            {/* <h6 className="font-bold ">
              Years in Profession: {leader.yearsInProfession} years
            </h6> */}
            <div className="flex items-center justify-center md:justify-start space-x-1 text-green-600">
              <FaStar />
              <span>4.7</span>
            </div>
     
          </div>
        </div>

        {/* Opening and Closing Times */}
        <div className="flex  mt-6">
          <div className="bg-gray-200 text-gray-600 p-2 mr-4 rounded-lg text-sm">
            <p>Opening time</p>
            <p>{undertaker.openingTime}</p>
          </div>
          <div className="bg-gray-200 text-gray-600 p-2  rounded-lg text-sm">
            <p>Closing time</p>
            <p>{undertaker.closingTime}</p>
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
          {/* <p className="text-gray-600 text-sm mt-2">{leader.bio}</p> */}
          <button className="text-green-600 font-semibold mt-2">
            Contact:{" "}
          </button>
          <h5>Phone Number: {undertaker.phone}</h5>
          <h5>Email: {undertaker.email}</h5>
        </div>

        
     

        {/* Comments */}
        <div className="mt-6">
          <h3 className="font-bold text-lg">Reviews</h3>
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
      
    </div>
  )
}

export default UndertakerDetails

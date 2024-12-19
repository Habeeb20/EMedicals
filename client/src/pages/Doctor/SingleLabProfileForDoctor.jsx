import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { FaShareAlt } from "react-icons/fa";
const SingleLabProfileForDoctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lab, setLab] = useState(null);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState('')
  const [doctor, setDoctor] = useState([ ])
  const handleShare = (lab) => {
    if (navigator.share) {
      navigator
        .share({
          title: lab.name,
          text: `check out this cemetery; ${lab.name}`,
          url: window.location.href,
        })
        .then(() => console.log("successfully shared"))
        .catch((error) => console.log("error sharing the url"));
    } else {
      alert("sharing not supported on this device");
    }
  };

  useEffect(() => {
    if (!id) {
      setError("user id not found");
    }

    axios
      .get(`${import.meta.env.VITE_API_L}/ldetails/${id}`)
      .then((response) => {
        setLab(response.data);
        setError(null);
      })
      .catch((error) => {
        console.log(error);
        setError("failed to load data, please try again later");
      });

    axios
      .get(`${import.meta.env.VITE_API_L}/ldetails/${id}/comments`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.log("error fetching comments");
      });
  }, [id]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        if (!token) {
          throw new Error("token not found");
        }

        setLoading(true);

        const response = await axios.get(
          `${import.meta.env.VITE_API_D}/doctorprofile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        console.log(response.data);
        setDoctor(response.data.doctor);
        toast.success("successfully fetched");
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const userName = localStorage.getItem("email");
    if (!newComment || !userName) return;

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_L}/ldetails/${id}/comments`,
        {
          labId: id,
          userName,
          commentText: newComment,
        }
      );

      setComments([...comments, response.data]);
      setNewComment("");
      toast.success("comment posted successfully!");
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

  if (!lab) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        <p className="text-lg font-semibold mt-4">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className=" bg-gray-100 flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="hidden md:block w-1/4 bg-white shadow-lg p-6">
          <div className=" mb-4 flex justify-between items-center w-16 h-16 rounded-full object-cover">
            <img
              src={doctor.profilePicture}
              alt="Logo"
              className="h-12 w-auto"
            />
          </div>
          <nav className="flex flex-col space-y-4">
            <a
              href="/doctordashboard"
              className="text-gray-700 flex items-center space-x-2 hover:bg-gray-200 p-2 rounded-lg"
            >
              <span>Overview</span>
            </a>

            <a
              href="/doctorappointment"
              className="text-gray-700 flex items-center space-x-2 hover:bg-gray-200 p-2 rounded-lg"
            >
              <span>Appointments</span>
            </a>
            <a
              href="/alllabs"
              className="text-blue-700 flex items-center space-x-2 hover:bg-gray-200 p-2 rounded-lg"
            >
              <span>Labs</span>
            </a>
            <a
              href="/seepatientresult"
              className="flex items-center space-x-2 hover:bg-gray-200 p-2 rounded-lg"
            >
              <span>see your patients' results</span>
            </a>
            <a
              href="/doctorprofile"
              className="text-gray-700 flex items-center space-x-2 hover:bg-gray-200 p-2 rounded-lg"
            >
              <span>Patients</span>
            </a>
            <a
              href="/chatlogin"
              className="text-gray-700 flex items-center space-x-2 hover:bg-gray-200 p-2 rounded-lg"
            >
              <span>Chats</span>
              <span className="bg-red-500 text-white text-xs rounded-full px-2">
                10
              </span>
            </a>
            {doctor && (
              <>
                <img
                  src={doctor.profilePicture}
                  alt="Profile Picture"
                  className="w-16 h-16 rounded-full object-cover mx-auto mb-7"
                />
                <p className="font-semibold">Your name: {doctor.fullname}</p>
                <p className="font-semibold">Your Email: {doctor.email}</p>
                <p className="font-semibold">
                  Your Phone number: {doctor.phoneNumber}
                </p>
              </>
            )}

            <a
              href="#"
              className="text-red-500 flex items-center space-x-2 hover:bg-gray-200 p-2 rounded-lg"
            >
              <span>Logout</span>
            </a>
          </nav>
          <div className="mt-auto hidden lg:block">
            <p className="text-xs text-gray-500">Address:</p>
            <p className="text-sm text-gray-700">{doctor.state}</p>
            <p className="text-sm text-gray-700">{doctor.officeAddress}</p>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 lg:mb-6">
            <div className="text-2xl font-semibold">Patients</div>
            <div className="flex space-x-2 mt-4 lg:mt-0 items-center w-full lg:w-auto">
              <input
                type="text"
                placeholder="Search pathology results"
                className="border border-gray-300 rounded-lg px-4 py-2 w-full lg:w-auto"
              />
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full lg:w-auto">
                Search
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mb-4 lg:mb-6">
            <div className="bg-white shadow-md rounded-lg p-4 flex-1 text-center">
              <h3 className="text-xl text-blue-700">202</h3>
              <p className="text-sm text-gray-500">Total Patient</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 flex-1 text-center">
              <h3 className="text-xl text-green-500">202</h3>
              <p className="text-sm text-gray-500">In Patient</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 flex-1 text-center">
              <h3 className="text-xl text-red-500">202</h3>
              <p className="text-sm text-gray-500">Out Patient</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row md:space-x-4 items-center md:items-start">
            <img
              src={lab.picture1 || "https://via.placeholder.com/150"}
              alt={lab.name}
              className="w-32 h-32 rounded-md object-cover"
            />
          </div>

          <div className="flex flex-col justify-between text-center md:text-left mt-4 md:mt-0">
            <h2 className="font-bold text-2xl">{lab.name}</h2>
            <h6 className="font-bold ">State: {lab.state}</h6>
            <h6 className="font-bold ">LGA: {lab.LGA}</h6>
            <h6 className="font-bold ">Address: {lab.location}</h6>
            <h6 className="font-bold ">Unique Number: {lab.uniqueNumber}</h6>
            <h6 className="font-bold p-4 ">Tests and Prices</h6>
            <h6 className="font-semibold">
              {" "}
              {lab.testA}  {-lab.testAPrice}#
            </h6>
            <h6 className="font-semibold">
              {" "}
              {lab.testB}  {-lab.testBPrice}#
            </h6>
            <h6 className="font-semibold ">
              {" "}
              {lab.testC}     {-lab.testCPrice}#
            </h6>
            <h6 className="font-semibold">
              {" "}
              {lab.testD} {-lab.testDPrice}#
            </h6>
            <h6 className="font-semibold">
              {" "}
              {lab.testE}  {-lab.testEPrice}#
            </h6>
            <h6 className="font-semibold">
              {" "}
              {lab.testF}  {-lab.testFPrice}#
            </h6>
            <h6 className="font-semibold">
              {" "}
              {lab.testG}  {-lab.testGPrice}#
            </h6>
            <h6 className="font-semibold">
              {" "}
              {lab.testH}  {-lab.testHPrice}#
            </h6>
            <h6 className="font-semibold">
              {" "}
              {lab.testI}  {-lab.testIPrice}#
            </h6>
            <h6 className="font-semibold">
              {" "}
              {lab.testJ}  {-lab.testJPrice}#
            </h6>
          </div>
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
     
      </div>
      
    </div>
  );
};

export default SingleLabProfileForDoctor;

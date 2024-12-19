import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import { FaShareAlt } from 'react-icons/fa'
const SingleLab = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [lab, setLab] = useState(null)
    const [loading, setLoading] = useState(false)
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")

    const handleShare = (lab) => {
        if(navigator.share){
            navigator.share({
              title: lab.name,
              text: `check out this cemetery; ${lab.name}`,
              url: window.location.href,
            }).then(() => console.log("successfully shared"))
              .catch((error) => console.log("error sharing the url"))
          }else {
            alert("sharing not supported on this device")
          }
    }

    useEffect(() => {
        if(!id){
            setError("user id not found")
        }

        axios.get(`${import.meta.env.VITE_API_L}/ldetails/${id}`)
             .then((response) => {
                setLab(response.data)
                setError(null)
             })
             .catch((error) => {
                console.log(error);
                setError("failed to load data, please try again later")
             })


             axios.get(`${import.meta.env.VITE_API_L}/ldetails/${id}/comments`)
                  .then((response) => {
                    setComments(response.data);
                  })
                  .catch((error) => {
                    console.log("error fetching comments")
                  })
    }, [id])

    const handleCommentSubmit = async(e) => {
        e.preventDefault();
        const userName = localStorage.getItem("email");
        if(!newComment || !userName) return;

        setLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_L}/ldetails/${id}/comments`, {
                labId: id,
                userName,
                commentText: newComment,
            });

            setComments([...comments, response.data]);
            setNewComment("")
            toast.success("comment posted successfully!")
        } catch (error) {
            console.error("Error posting comment", error);
            toast.error("Failed to post comment.");
          } finally {
            setLoading(false);
          }
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


      if(!lab){
        return(
          <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          <p className="text-lg font-semibold mt-4">Loading...</p>
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
            src={lab.profilePicture || "https://via.placeholder.com/150"}
            alt={lab.name}
            className="w-32 h-32 rounded-md object-cover"
          />

<div className="flex flex-col justify-between text-center md:text-left mt-4 md:mt-0">
            <h2 className="font-bold text-2xl">{lab.name}</h2>
            <h6 className="font-bold ">State: {lab.state}</h6>
            <h6 className="font-bold ">LGA: {lab.LGA}</h6>
            <h6 className="font-bold ">Address: {lab.address}</h6>
            <h6 className="font-bold ">Unique Number: {lab.uniqueNumber}</h6>
            <h6 className="font-bold ">Tests and Prices</h6>
            <h6 className="font-semibold"> {lab.testA} - {lab.testAPrice}</h6>
            <h6 className="font-semibold"> {lab.testB} - {lab.testBPrice}</h6>
            <h6 className="font-semibold"> {lab.testC} - {lab.testCPrice}</h6>
            <h6 className="font-semibold"> {lab.testD} - {lab.testDPrice}</h6>
            <h6 className="font-semibold"> {lab.testE} - {lab.testEPrice}</h6>
            <h6 className="font-semibold"> {lab.testF} - {lab.testFPrice}</h6>
            <h6 className="font-semibold"> {lab.testG} - {lab.testGPrice}</h6>
            <h6 className="font-semibold"> {lab.testH} - {lab.testHPrice}</h6>
            <h6 className="font-semibold"> {lab.testI} - {lab.testIPrice}</h6>
            <h6 className="font-semibold"> {lab.testJ} - {lab.testJPrice}</h6>


            <div className="flex items-center justify-center md:justify-start space-x-1 text-green-600">
              <FaStar />
              <span>4.7</span>
            </div>

          </div>
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
          <h5>Phone Number: {lab.phone}</h5>
          <h5>Email: {lab.email}</h5>
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
  )
}

export default SingleLab

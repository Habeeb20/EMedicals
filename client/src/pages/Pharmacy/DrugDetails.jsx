import React,{useState,useEffect} from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';
import axios from 'axios'
import Navbar from '../../components/Navbar';
import toast from "react-hot-toast"
import { Link, useParams } from 'react-router-dom';
const DrugDetails = () => {
  const {id} = useParams();
  const [drug, setDrug] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if(!id){
      setError("user id is not found")
    }
    const fetchData = async()=> {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_PH}/getadrug/${id}`, {
          headers:{
            "Content-Type": 'application/json'
          }
        })
        console.log(response)
        setDrug(response.data)
        toast.success("drugs details successfully fetched")
      } catch (error) {
        console.log(error)
        setError(error)
        toast.error("an error occurred")
      }finally{
        setLoading(false)
      }
    }; fetchData()
  }, [id]); 

  if(!drug){
    return(
      <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      <p className="text-lg font-semibold mt-4">Loading...</p>
    </div>
    )
  }
  return (
    <>
      <Navbar/>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white max-w-lg w-full rounded-lg shadow-lg overflow-hidden">
    
        <div className="bg-purple-100 flex justify-center items-center p-8">
          <img
            src={drug.profilePicture} 
            alt="drugs details Emedicals"
            className="w-32 h-auto object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-gray-800">{drug.name}</h2>
            
            <p className="text-xl font-bold text-gray-900">€{drug.price}</p>
          </div>
          <p className="text-sm text-gray-500 mb-2">150 ml</p>
          <p>An {drug.category} drug</p>
          
          {/* Description */}
          <h3 className="text-md font-semibold text-gray-700 mt-4">Description</h3>
          <p className="text-sm text-gray-600 mt-2">{drug.description}
            . deal for when looking after baby before and after feeding, nappy change, ideal on the go.
            Ideal for use during infection epidemics, to reduce the risk of spreading infection.
          </p>
          <ul className="text-sm text-gray-600 mt-2 list-disc list-inside">
            <li>Hypoallergenic* and tested under dermatological control</li>
            <li>No ingredients from animal origin</li>
          </ul>
        
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 p-4 bg-gray-50 border-t">
      
        <button className="flex-1 bg-purple-500 text-white py-3 rounded-lg flex items-center justify-center hover:bg-purple-600">
        <Link to="/viewcart">
            Add to cart <FaShoppingCart className="ml-2" />
      

        </Link>
        </button>
      
          <button className="flex-1 bg-purple-100 text-purple-700 py-3 rounded-lg flex items-center justify-center hover:bg-purple-200">
            View full product detail <HiArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
    </>

  );
};

export default DrugDetails;

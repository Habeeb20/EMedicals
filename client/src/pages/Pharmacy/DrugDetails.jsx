import React,{useState,useEffect} from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';
import axios from 'axios'
import Navbar from '../../components/Navbar';
import toast from "react-hot-toast"
import { Link, useParams } from 'react-router-dom';
import drugs from "../../assets/EMedicals/drug.png"
import { FaPhoneAlt } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
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
        const response = await axios.get(`${import.meta.env.VITE_API_MP2}/aproduct/${id}`, {
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
            src={drug.profilePicture || drugs} 
            alt="drugs details Emedicals"
            className="w-32 h-auto object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-gray-800">{drug.name}</h2>
            
            <p className="text-xl font-bold text-gray-900">{drug.sellingPrice}</p>
          </div>
          <p className="text-sm text-gray-500 mb-2">150 ml</p>
       
          
          {/* Description */}
          <h3 className="text-md font-semibold text-gray-700 mt-4">Description</h3>
          <p className="text-sm text-gray-600 mt-2">{drug.description}

          </p>
          <div className="flex-col col-span-2">
          <h3 className='flex col-span-2 font-semibold'>Pharmacy details</h3>
          <p className="text-black">Name:{drug.sellerId?.name}</p>
          <p className="text-black">Phone Number:{drug.sellerId?.phone}</p>
          <p className="text-black">Email:{drug.sellerId?.email}</p>
          <p className="text-black">State:{drug.sellerId?.state}</p>
          <p className="text-black">LGA:{drug.sellerId?.LGA}</p>
          <p className="text-black">location:{drug.sellerId?.location}</p>
          </div>
        
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 p-4 bg-gray-50 border-t">
        <button 
  className="flex-1 bg-purple-500 text-white py-3 rounded-lg flex items-center justify-center hover:bg-purple-600"
>
  <a href={`tel:${drug.sellerId?.phone}`} className="flex items-center">
    Call the pharmacy <FaPhoneAlt className="ml-2" />
  </a>
</button>

<button 
  className="flex-1 bg-purple-100 text-purple-700 py-3 rounded-lg flex items-center justify-center hover:bg-purple-200"
>
  <a 
    href={`https://wa.me/${drug.sellerId?.phone}`} 
    target="_blank" 
    rel="noopener noreferrer"
    className="flex items-center"
  >
    Chat on WhatsApp <IoLogoWhatsapp className="ml-2" />
  </a>
</button>
        </div>
      </div>
    </div>
    </>

  );
};

export default DrugDetails;

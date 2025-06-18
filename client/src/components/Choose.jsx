import { useState } from "react";
import im from "../assets/EMedicals/floatingLogo.png"

import { Link } from "react-router-dom";
import NavbarOthers from "./NavbarOthers";
const Choose = () => {
 

  return (
    <>
    <NavbarOthers />
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-xs mx-auto ">
        <div className="flex justify-center mb-0">
          <img src={im} alt="logo" className="rounded-full" />
        </div>

        <div className="bg-white shadow-md rounded px-8 pt-1 pb-10 mt-1">
          <h2 className="text-2xl font-semibold mb-6 text-center">Login as</h2>
        
          <form >
            <div className="mb-4">
          
              <Link to="/userlogin">
              <button   className=" bg-blue-500  text-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              User

              </button>

              </Link>
  
              
           
            </div>

            <div className="mb-6">
              <label
                className="block text-center text-gray-700 text-sm font-bold mb-2"

              >
                or
              </label>
              <div className="relative">
              <Link to="/adminhome">
              <button   className=" bg-blue-500 text-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              Admin

              </button>

              </Link>
              </div>
            </div>

           
          </form>
        </div>
      </div>
    </div>
    </>
   
  );
};

export default Choose;


import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import SearchPage from "./SearchPage";
import Navbar from "../../components/Navbar";
import im from "../../assets/EMedicals/Image (1).png"
const CemeteryPage = () => {
  return (
  <>
  <Navbar />
      <div className="p-4">
      <header className="flex items-center justify-between p-2 bg-white shadow-md">
        <div className="flex items-center bg-gray-100 p-2 rounded-lg">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="What do you need?"
            className="bg-transparent outline-none ml-2"
          />
        </div>
      </header>

      {/* Categories */}
      <div className="flex space-x-2 my-4">
        <Link to="/" className="bg-gray-100 px-4 py-2 rounded-full">
          Government
        </Link>
        <Link to="/private" className="bg-gray-100 px-4 py-2 rounded-full">
          Private
        </Link>
        <Link to="/hospital" className="bg-green-200 px-4 py-2 rounded-full">
          Hospital
        </Link>
        <Link to="/military" className="bg-gray-100 px-4 py-2 rounded-full">
          Military
        </Link>
      </div>

      {/* Services */}
      <div>
        <SearchPage
          image={im}
          name="God is Able Funeral Homes and Cremation Service"
          location="Ijakoto, Surulere"
          price="30.55"
          added={false}
        />
        <SearchPage
          image={im}
          name="Gods Delight Funeral Homes"
          location="Ijakoto, Surulere"
          price="30.55"
          added={true}
        />
      </div>
    </div>
  </>
  );
};

export default CemeteryPage;

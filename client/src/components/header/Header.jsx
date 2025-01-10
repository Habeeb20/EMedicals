import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectName, SET_LOGIN } from "../../redux/features/auth/authSlice";
import { logoutUser } from "../../services/authService";
import Navbar from "../Navbar";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName);

  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/login");
  };

  return (
    <>
    <Navbar />
 <div className="--pad header">
      <div className="bg-purple-500">
        <h3>
          <span className="text-white">Welcome, </span>
          <span className="text-white">{name}</span>
        </h3>
        <button onClick={logout} className="text-white">
          Logout
        </button>
      </div>
      <hr />
    </div>
    </>
   
  );
};

export default Header;

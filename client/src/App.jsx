import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Hospital/Doctors/signup";
import LandingHome from "./pages/LandingHome";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import UserSignup from "./pages/User/UserSignup";
import UserLogin from "./pages/User/UserLogin";
import UserVerifyEmail from "./pages/User/UserVerifyEmail";
import UserForgotPassword from "./pages/User/UserForgotPassword";
import UserResetPassword from "./pages/User/UserResetPassword";
import UserLandingProfile from "./pages/User/UserLandingProfile";
import Choose from "./components/Choose";
import AdminHome from "./components/AdminHome";
import DoctorSignup from "./pages/Doctor/DoctorSignup";
import AfterDeathService from "./pages/Cemetary/AfterDeath";

import CemeteryPage from "./pages/Cemetary/CemeteryPage";
import MortuarySignup from "./pages/mortuary/MortuarySignup";
import AmortuaryDetail from "./pages/mortuary/AmortuaryDetail";
import PrivateRoute from "./components/PrivateRoute";
import CemeterySignUp from "./pages/Cemetary/CemeterySgnup";
import CemeteryLogin from "./pages/Cemetary/CemeteryLogin";
import CemeteryDashboard from "./pages/Cemetary/CemeteryDashboard";
import AllCemeteries from "./pages/Cemetary/AllCemeteries";
import Acemetery from "./pages/Cemetary/Acemetery";
import GetAllCemetery from "./pages/Cemetary/GetAllCemetery";

const App = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Choose />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/" element={<LandingHome />} />
        <Route path="/usersignup" element={<UserSignup />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/userverifyEmail" element={<UserVerifyEmail />} />
        <Route path="/userforgotpassword" element={<UserForgotPassword />} />
        <Route path="/userresetpassword" element={<UserResetPassword />} />
        <Route path="/userlandingprofile" element={<UserLandingProfile />} />




          //protected Routes
        <Route path="/cemeterypage" element={<PrivateRoute><CemeteryPage /></PrivateRoute> } />
        <Route path="/mortuarydetail/:id" element={<PrivateRoute><AmortuaryDetail /></PrivateRoute>} />


        <Route path="/cemeterydashboard" element={<PrivateRoute><CemeteryDashboard /></PrivateRoute>} />
        <Route path="/cemeteries" element={<PrivateRoute><AllCemeteries /></PrivateRoute>} />
        <Route path="/cemeterydetail/:id" element={<PrivateRoute><Acemetery /></PrivateRoute>} />
        <Route path="/getallcemetery" element={<PrivateRoute><GetAllCemetery /></PrivateRoute> } />








        //doctor
        <Route path="/doctorsignup" element={<DoctorSignup />} />


        //cemetary
        <Route path="/afterdeathsearviceuser" element={<AfterDeathService />} />
        <Route path="/cemeterysignup" element={<CemeterySignUp />} />
        <Route path="/cemeterylogin" element={<CemeteryLogin />} />
        <Route path="/cemeterydashboard" element={<CemeteryDashboard />} />



        //mortuary
        <Route path="/mortuarysignup" element={<MortuarySignup />} />
      



      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;

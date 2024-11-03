import React, {useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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




import LoginDoctor from "./pages/Doctor/LoginDoctor";
import ProfileDoctor from "./pages/Doctor/ProfileDoctor";
import Doctors from "./pages/Doctor/patients/Doctors";
import PatientSignup from "./pages/Doctor/patients/PatientSignup";
import ProfilePatient from "./pages/Doctor/patients/ProfilePatient";
import PatientLogin from "./pages/Doctor/patients/PatientLogin";
import AppointmentForm from "./pages/Doctor/AppointmentForm";
import { DoctorAppointment } from "./components/Doctor/DoctorAppointment";
import { DoctorDashboard } from "./components/Doctor/DoctorDashboard";
import io from "socket.io-client"
import ChatLogin from "./pages/Doctor/chat/ChatLogin";
import ChatSignup from "./pages/Doctor/chat/ChatSignup";
import { useAuthContext } from "./components/Doctor/context/AuthContext";
import ChatWindow from "./pages/Doctor/chat/ChatWindow";
import PatientMoreDetails from "./pages/Doctor/patients/PatientMoreDetails";
import GetAppointmentsPatients from "./pages/Doctor/patients/GetAppointmentsPatients";

import DoctorDetails from "./pages/Doctor/DoctorDetails";
import MedicalHitoryForm from "./pages/Doctor/patients/MedicalHitoryForm";
import MedicalHitory from "./pages/Doctor/patients/MedicalHitory";
import DonateForm from "./pages/Doctor/patients/DonateForm";
import Donation from "./pages/Doctor/patients/Donation";
import DiagnosisPatient from "./pages/Doctor/patients/DiagnosisPatient";
import TestMedical from "./pages/Doctor/patients/TestMedical";
import SeePatientResult from "./pages/Doctor/SeePatientResult";
import SeeYourMedicalResult from "./pages/Doctor/patients/seeYourMedicalResult";

import LoginPharmacy from "./pages/Pharmacy/LoginPharmacy";
import RegisterPharmacy from "./pages/Pharmacy/RegisterPharmacy";
import ProfilePharmacy from "./pages/Pharmacy/ProfilePharmacy";
import SearchDrugs from "./pages/Pharmacy/SearchDrugs";
import DrugDetails from "./pages/Pharmacy/DrugDetails";
import ViewCart from "./pages/Pharmacy/ViewCart";
import OrderDetails from "./pages/Pharmacy/OrderDetail";
// const socket = io("http://localhost:8000");
const App = () => {
  const { authUser } = useAuthContext();
  console.log(authUser);


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
        <Route
          path="/cemeterypage"
          element={
            <PrivateRoute>
              <CemeteryPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/mortuarydetail/:id"
          element={
            <PrivateRoute>
              <AmortuaryDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/cemeterydashboard"
          element={
            <PrivateRoute>
              <CemeteryDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/cemeteries"
          element={
            <PrivateRoute>
              <AllCemeteries />
            </PrivateRoute>
          }
        />
        <Route
          path="/cemeterydetail/:id"
          element={
            <PrivateRoute>
              <Acemetery />
            </PrivateRoute>
          }
        />
        <Route
          path="/getallcemetery"
          element={
            <PrivateRoute>
              <GetAllCemetery />
            </PrivateRoute>
          }
        />
        <Route
          path="/doctor/:doctorId/book-appointment"
          element={<AppointmentForm />}
        />

        <Route path="/getpatientappointments" element={<PrivateRoute><GetAppointmentsPatients /></PrivateRoute>} />


        <Route path="/doctorappointment" element={<DoctorAppointment />} />
        //doctor
        <Route path="/doctorsignup" element={<DoctorSignup />} />
        <Route path="/doctorlogin" element={<LoginDoctor />} />
        <Route path="/doctorprofile" element={<ProfileDoctor />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctordashboard" element={<DoctorDashboard />} />
        <Route path="/doctordetails/:id" element={<DoctorDetails />} />
        //chat
        <Route
          path="/chatwindow"
          element={authUser ? <ChatWindow /> : <Navigate to={"/chatlogin"} />}
        />
        <Route
          path="/chatlogin"
          element={authUser ? <Navigate to={"/chatwindow"} /> : <ChatLogin />}
        />
        <Route
          path="/chatsignup"
          element={authUser ? <Navigate to={"/chatwindow"} /> : <ChatSignup />}
        />


        //patient
        <Route path="/patientsignup" element={<PatientSignup />} />
        <Route path="/patientlogin" element={<PatientLogin />} />
        <Route path="/patientprofile" element={<ProfilePatient />} />
        <Route path="/patientmore/:id" element={<PatientMoreDetails />} />
        <Route path="/registermedicalhistory" element={<MedicalHitoryForm />} />
        <Route path="/medicalhistories" element={<MedicalHitory />} />
        <Route path="/registerdonation" element={<DonateForm />} />
        <Route path="/patientdonations" element={<Donation />} />
        <Route path="/patientdiagnosis" element={<DiagnosisPatient />} />
        <Route path="/medicaltestresult/:patientId" element={<TestMedical />} />
        <Route path="/seepatientresult" element={<SeePatientResult />} />
        <Route path="/patientdiagnosis" element={<SeeYourMedicalResult />} />


        //cemetary
        <Route path="/afterdeathsearviceuser" element={<AfterDeathService />} />
        <Route path="/cemeterysignup" element={<CemeterySignUp />} />
        <Route path="/cemeterylogin" element={<CemeteryLogin />} />
        <Route path="/cemeterydashboard" element={<CemeteryDashboard />} />
        //mortuary
        <Route path="/mortuarysignup" element={<MortuarySignup />} />





        //pharmacy
        <Route path="/pharmacistlogin" element={<LoginPharmacy />} />
        <Route path="/registerpharmacy" element={<RegisterPharmacy />}  />
        <Route path="/profilepharmacy"  element={<ProfilePharmacy />} />
        <Route path="/searchdrugs" element={<SearchDrugs />}/>
        <Route path="/drugsdetails/:id" element={<DrugDetails />}/>
        <Route path="/viewcart" element={<ViewCart />} />
        <Route path="/orderdetails" element={<OrderDetails  />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;

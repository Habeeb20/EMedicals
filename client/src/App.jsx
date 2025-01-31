import React, {useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";
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

import LoginHospitalAdmin from "./pages/Hospital/Admin/LoginHospitalAdmin";
import SignupHospitalAdmin from "./pages/Hospital/Admin/SignupHospitalAdmin";

import LoginDoctorHospital from "./pages/Hospital/Doctors/LoginDoctorhospital";
import LoginPatientHospital from "./pages/Hospital/patients/LoginPatientHospital";
import DoctorDashboardHospital from "./pages/Hospital/Doctors/DoctorDashboardHospital";
import PopModal from "./pages/Hospital/PopModal";
import LoginNurseHospital from "./pages/Hospital/Nurse/LoginNurseHospital";
import NurseDashboardHospital from "./pages/Hospital/Nurse/NurseDashboardHospital";
import PatientDashboardHospital from "./pages/Hospital/patients/PatientDashboardHospital";
import WellLogin from "./pages/wellness/WellLogin";
import WellRegister from "./pages/wellness/WellRegister";
import WellDashboard from "./pages/wellness/WellDashboard";
import WellnessDetails from "./pages/wellness/WellnessDetails";
import Testing from "./pages/User/Testing";
import ConsultDoctor from "./pages/quickAction/ConsultADoctor";
import ConsultADoctorList from "./pages/quickAction/ConsultADoctorList";
import HomeCarePopup from "./pages/quickAction/HomeCarePopup";
import SelectHomeCare from "./pages/quickAction/SelectHomeCare";
import GetHomeCare from "./pages/quickAction/GetHomecare";
import FindDrugs from "./pages/quickAction/FindDrugs";
import FundRaisingPopup from "./pages/quickAction/FundRaisingPopup";
import RaiseFund from "./pages/quickAction/RaisingFund";
import SignupModalTelemedicine from "./pages/Telemedicine/SignupModalTelemedicine";
import TeleDashboard from "./pages/Telemedicine/TeleDashboard";
import LoginTeleMedicine from "./pages/Telemedicine/LoginTeleMedicine";
import AboutUs from "./pages/AboutUs";
import TeleHospital from "./pages/Telemedicine/TeleHospital";

import LabPatientDetails from "./pages/Lab/LabPatientDetails";
import LabRegister from "./pages/Lab/LabRegister";
import LabLogin from "./pages/Lab/LabLogin";
import LabDashboard from "./pages/Lab/LabDashboard";
import LabsForDoctors from "./pages/Doctor/LabsForDoctors";
import SingleLabProfileForDoctor from "./pages/Doctor/singleLabProfileForDoctor";
import FormLabAppointment from "./pages/Lab/FormLabAppointment";
import UserLabDashboard from "./pages/Lab/UserLabDashboard";
import SingleLab from "./pages/Lab/SingleLab";
import PatientLabFormAppointment from "./pages/Lab/patientLabFormAppointment";
import HospitalLandingPage from "./pages/Hospital/HospitalLandingPage";



//newPharmacy
// import Home from "./pages/Home/Home"
// import NPLogin from "./pages/auth/Login"
// import NPRegister from  "./pages/auth/Register"
// import Forgot from "./pages/auth/Forgot";
// import Reset from "./pages/auth/Reset";
// import NPDashboard from "./pages/dashboard/Dashboard";
// import Sidebar from "./components/sidebar/Sidebar";
// import Layout from "./components/layout/Layout";
// import { useDispatch } from "react-redux";
// import { getLoginStatus } from "./services/authService";
// import { SET_LOGIN } from "./redux/features/auth/authSlice";
// import AddProduct from "./pages/addProduct/AddProduct";
// import ProductDetail from "./components/product/productDetail/ProductDetail";
// import EditProduct from "./pages/editProduct/EditProduct";
// import Profile from "./pages/profile/Profile";
// import EditProfile from "./pages/profile/EditProfile";

// import Contact from "./pages/contact/Contact";
import DashboardHospital from "./pages/Hospital/Admin/DashboardHospital";
import AllDoctorsForAdmin from "./pages/Hospital/Admin/AllDoctorsForAdmin";
import AllNursesForAdmin from "./pages/Hospital/Admin/AllNursesForAdmin";
import AllPatientForAdmin from "./pages/Hospital/Admin/AllPatientForAdmin";
import DashboardAnalytics from "./pages/Hospital/Admin/DashboardAnalytics";
import LoginUndertaker from "./pages/undertaker/LoginUndertaker";
import SignupUndertaker from "./pages/undertaker/SignupUndertaker";

import DashboardUndertaker from "./pages/undertaker/DashboardUndertaker";
import UndertakerDetails from "./pages/undertaker/UndertakerDetails";
import AllUndertaker from "./pages/undertaker/AllUndertaker";
import HospitalResult from "./pages/Hospital/Admin/HospitalResult";


import MedicalphamarcyLogin from "./pages/medicalPharmacy/Login"
import MedicalphamarcySignup from "./pages/medicalPharmacy/Signup"
import MedicalDashboard from "./pages/medicalPharmacy/Dashboard"
import HRMSLogin from "./pages/HRMS/HRMSLogin";
import HRMSSignup from "./pages/HRMS/HRMSSignup";
import HRMSDashboard from "./pages/HRMS/HRMSDashboard";
import EmployeeDetails from "./pages/HRMS/EmployeeDetails";
import DeathRecordForHospital from "./pages/Hospital/Admin/DeathRecordForHospital";
import MortuaryLogin from "./pages/mortuary/MortuaryLogin";
import GenerateLetter from "./pages/HRMS/GenerateLetter";
import MortuaryDashboard from "./pages/mortuary/admin/MortuaryDashboard";
import AdminDashbord from "./pages/SuperAdmin/AdminDashbord";
import SuperAdminLogin from "./pages/SuperAdmin/SuperAdminLogin";
import SuperAdminSignup from "./pages/SuperAdmin/superAdminSignup";

axios.defaults.withCredentials = true;


const App = () => {

  const { authUser } = useAuthContext();
  console.log(authUser);

  // useEffect(() => {
  //   async function loginStatus() {
  //     const status = await getLoginStatus();
  //     dispatch(SET_LOGIN(status));
  //   }
  //   loginStatus();
  // }, [dispatch]);


  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
      <Route path="/" element={<LandingHome />} />
        <Route path="/signin" element={<Choose />} />
        <Route path="/adminhome" element={<AdminHome />} />
      
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

        <Route path="/mlogin" element={<MortuaryLogin />} />
        <Route path="/mortuarydashboard" element={<MortuaryDashboard />} />
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



        //hospital
        <Route path="/loginhospitaladmin" element={<LoginHospitalAdmin />} />
        <Route path="/signuphospitaladmin" element={<SignupHospitalAdmin />} />
        <Route path="/alldoctorsforadmin" element={<AllDoctorsForAdmin />} />
        <Route path="/allnursesforadmin" element={<AllNursesForAdmin />} />
        <Route path="/allpatientforadmin" element={<AllPatientForAdmin />} />
        <Route path="/dashboardAnalytics" element={<DashboardAnalytics />} />
        <Route path="/dashboardHospital" element={<DashboardHospital/>} />
        <Route path="/deathrecordforhospital" element={<DeathRecordForHospital />} />
        <Route path="/appointment/:patientId/sendresult" element={<HospitalResult />} />


        <Route path="/logindoctordashboardhospital" element={<LoginDoctorHospital />} />
        <Route path="/loginpatienthospital" element={<LoginPatientHospital />} />
        <Route path="/doctordashboardhospital" element={<DoctorDashboardHospital />} />
        <Route path="/loginnursehospital" element={<LoginNurseHospital />} />
        <Route path="/nursedashboardhospital" element={<NurseDashboardHospital />} />
        <Route path="/loginpatienthospital" element={<LoginPatientHospital />} />
        <Route path="/patientdashboardhospital" element={<PatientDashboardHospital />} />
        <Route path="/popmodal" element={<PopModal />} />




        ///wellness
        <Route path="/wellnesslogin" element={<WellLogin />} />
        <Route path="/wellnessregister" element={<WellRegister />} />
        <Route path="/wellnessdashboard" element={<WellDashboard />} />
        <Route path="/wellness/:id" element={<WellnessDetails />} />

        

        
        ///undertaker
        <Route path="/undertakerlogin" element={<LoginUndertaker />} />
        <Route path="/undertakerregister" element={<SignupUndertaker />} />
        <Route path="/undertakerdashboard" element={<DashboardUndertaker />} />
        <Route path="/undertakerdetails/:id" element={<UndertakerDetails />} />
        <Route path = "/undertakers" element={<AllUndertaker />} />




          <Route path="/testing" element={<Testing />} />

          //quickAction


          <Route path="/consultadoctor" element={<ConsultDoctor />} />
          <Route path="/consultadoctorlist" element={<ConsultADoctorList />} />
          <Route path="/gethomecare" element={<HomeCarePopup />} /> 
          <Route path="/get-home-care" element={<GetHomeCare />} />
          <Route path="/selectedhomecare" element={<SelectHomeCare />} />
          <Route path="/finddrugs" element={<FindDrugs />} />
          <Route path="/fundraisingpopup" element={<FundRaisingPopup />} />
          <Route path="/raisefund" element={<RaiseFund />} />

          //SignupModalTelemedicine

          <Route path="/SignupModalTelemedicine" element={<SignupModalTelemedicine />} />
          <Route path="/teledashboard" element={<TeleDashboard />} />
          <Route path="/logintelemedicine" element={<LoginTeleMedicine />} />
          <Route path="/telehospitals" element={<TeleHospital />} />


          //aboutus
          <Route path="/aboutus" element={<AboutUs />} />


          //lab
          <Route path="/labregister" element={<LabRegister />} />
          <Route path="/lablogin" element={<LabLogin />} />
          <Route path="/alllabs" element={<LabsForDoctors />} />
          <Route path="/labdashboard" element={<LabDashboard />} />
          <Route path="/labdetails/:id" element={<SingleLabProfileForDoctor />} />
          <Route path="/singlelabdetails/:id" element={<SingleLab />} />
          <Route path="/userlabdashboard" element={<UserLabDashboard />} />
          <Route path="/lab/labbookappointment/:labId" element={<FormLabAppointment />} />
          <Route path="/lab/labbookappointmentforpatient/:labId" element={<PatientLabFormAppointment />} />

          {/* <Route path="/lab" element={<LabAppointment />} /> */}

          <Route path="/lab2" element={<LabPatientDetails />} />
      


          


          //newPharmacy
          {/* <Route path="/newpharmcy" element={<Home />} />
          <Route path="/login" element={<NPLogin />} />
          <Route path="/register" element={<NPRegister />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/resetpassword/:resetToken" element={<Reset />} /> */}
{/* 

          <Route
          path="/dashboard"
          element={
            <Sidebar>
              <Layout>
                <NPDashboard />
              </Layout>
            </Sidebar>
          }
        /> */}

{/* <Route
          path="/add-product"
          element={
            <Sidebar>
              <Layout>
                <AddProduct />
              </Layout>
            </Sidebar>
          }
        /> */}


{/* <Route
          path="/product-detail/:id"
          element={
            <Sidebar>
              <Layout>
                <ProductDetail />
              </Layout>
            </Sidebar>
          }
        />

<Route */}
          {/* path="/edit-product/:id"
          element={
            <Sidebar>
              <Layout>
                <EditProduct />
              </Layout>
            </Sidebar>
          }
        /> */}


{/* <Route
          path="/profile"
          element={
            <Sidebar>
              <Layout>
                <Profile />
              </Layout>
            </Sidebar>
          }
        /> */}


{/* <Route
          path="/edit-profile"
          element={
            <Sidebar>
              <Layout>
                <EditProfile />
              </Layout>
            </Sidebar>
          }
        />
 */}
{/* 
<Route
          path="/contact-us"
          element={
            <Sidebar>
              <Layout>
                <Contact />
              </Layout>
            </Sidebar>
          }
        /> */}



      //medical pharmacy
          <Route path="/medicalpharmacylogin" element={<MedicalphamarcyLogin />} />
          <Route path="/medicalpharmacysignup" element={<MedicalphamarcySignup />} />
          <Route path="/medicaldashboard" element={<MedicalDashboard />} />

        ///HRMS
        <Route path="/hrmslogin/" element={<HRMSLogin />} />
        <Route path="/hrmssignup" element={<HRMSSignup />} />
        <Route path="/hrmsdashboard" element={<HRMSDashboard />} />
        <Route path="/hrmslettergenerate" element={<GenerateLetter />} />
        <Route path="/HRMSDashboard/hrms/details/:id" element={<EmployeeDetails />} />




        ///Admin
        <Route path="/superadmindashboard" element={<AdminDashbord />} />
        <Route path="/superadminlogin" element={<SuperAdminLogin />} />
        <Route path="/superadminsignup" element={<SuperAdminSignup />} />
      

        




   

      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;

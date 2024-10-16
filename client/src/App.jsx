import React from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import Signup from './pages/Hospital/Doctors/signup'
import LandingHome from './pages/LandingHome'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import UserSignup from './pages/User/UserSignup'
import UserLogin from './pages/User/UserLogin'
import UserVerifyEmail from './pages/User/UserVerifyEmail'
import UserForgotPassword from './pages/User/UserForgotPassword'
import UserResetPassword from './pages/User/UserResetPassword'
const App = () => {
  return (
   <Router>
   {/* <Navbar /> */}
    <Routes>
    <Route path="/" element={<LandingHome  />} />
    <Route path="/usersignup" element={<UserSignup  />} />
    <Route path="/userlogin" element={<UserLogin  />} />
    <Route path="/userverifyEmail" element={<UserVerifyEmail  />} />
    <Route path="/userforgotpassword" element={<UserForgotPassword  />} />
    <Route path="/userresetpassword" element={<UserResetPassword  />} />


      <Route path="/doctors/signup" element={<Signup />} />
    </Routes>
    <Toaster />
   </Router>
  )
}

export default App

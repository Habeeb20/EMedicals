import React from 'react'
import AboutSection1 from '../components/aboutus/AboutSection1'
import AboutSection2 from '../components/aboutus/AboutSection2'
import AboutSection3 from '../components/aboutus/AboutSection3'
import { Link } from 'react-router-dom'
const AboutUs = () => {
  return (
    <div>
         <nav className="flex justify-between items-center px-6 py-4">
        <div className="text-xl font-bold text-blue-700">EMedicals</div>
        <div className="hidden md:flex space-x-6">
         <a href="/" className="hover:text-blue-700">Home</a>
      
          <a href="/logintelemedicine" className="hover:text-blue-700">Telemedicine</a>
          <a href="#" className="hover:text-blue-700">Health Plans</a>
         
          <a href="/aboutus" className="hover:text-blue-700">About</a>
        </div>
        <Link to="/signin">
        <button className="bg-blue-700 text-white px-4 py-2 rounded-lg">Sign In</button>

        </Link>
       
      </nav>
      <AboutSection1 />
      {/* <AboutSection2 />
      <AboutSection3 /> */}
    </div>
  )
}

export default AboutUs

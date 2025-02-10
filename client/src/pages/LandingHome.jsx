
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import m from "../assets/EMedicals/dd.jpeg"
import m1 from "../assets/EMedicals/dddd.jpeg"
import m2 from "../assets/EMedicals/doc.jpeg"
import { Link } from 'react-router-dom';
import LPage from '../components/Landing/LPage';
import LPage2 from '../components/Landing/LPage2';
import LPage3 from '../components/Landing/LPage3';
import LandingImageCarousel from '../components/Landing/LandingImageCarousel';
import LandingQuickActions from '../components/Landing/LandingQuickAction';

const LandingHome = () => {
  const { ref: headingRef, inView: headingInView } = useInView({ triggerOnce: true });
  const { ref: subTextRef, inView: subTextInView } = useInView({ triggerOnce: true });

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-50 text-gray-800 font-sans">
      <nav className="flex justify-between items-center px-6 py-4">
        <div className="text-xl font-bold text-blue-700">EMedicals</div>
        <div className="hidden md:flex space-x-6">
        <a href="/" className="hover:text-blue-700">Home</a>
          <a href="/logintelemedicine" className="hover:text-blue-700">Telemedicine</a>
          <a href="#" className="hover:text-blue-700">Health Plans</a>
          {/* <a href="#" className="hover:text-blue-700">For Partners</a>
          <a href="#" className="hover:text-blue-700">Resources</a> */}
          <a href="/aboutus" className="hover:text-blue-700">About</a>
        </div>
        <Link to="/signin">
        <button className="bg-blue-700 text-white px-4 py-2 rounded-lg">Sign In</button>

        </Link>
       
      </nav>

      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-10">
        {/* Text Section */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
          className="w-full md:w-1/2"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Building Africa’s <span className="underline decoration-green-400">Digital Health Future</span>
          </h1>
          <p
            ref={subTextRef}
            className="text-lg text-gray-600"
            style={{ opacity: subTextInView ? 1 : 0, transition: 'opacity 1s' }}
          >
            EMedicals optimises healthcare delivery, ensuring quality care is accessible and affordable for everyone. Experience the future of healthcare today.
          </p>

          <div className="flex space-x-4 mt-6">

            <button className="flex items-center space-x-1 text-blue-700">
              <span>Learn More</span> <span className="text-xl">&rarr;</span>
            </button>
            <Link to="/signin">
            <button className="bg-blue-700 text-white px-6 py-3 rounded-lg">Get Started – It’s free</button>

            </Link>
           
          </div>
        </motion.div>

        {/* Images Section */}
        <div className="relative w-full md:w-1/2 mt-10 md:mt-0">
          <motion.img
            src={m}
            alt="Doctor"
            className="absolute w-1/2 top-0 right-0 rounded-lg shadow-md"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          />
          <motion.img
            src={m1}
            alt="Consultation"
            className="absolute w-2/5 bottom-0 left-0 rounded-lg shadow-md"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          />
        </div>
      </section>
      <LPage />
      <LandingImageCarousel />
      <LandingQuickActions />
      <LPage2 />
     
      <LPage3 />

    
    </div>
  );
};

export default LandingHome;

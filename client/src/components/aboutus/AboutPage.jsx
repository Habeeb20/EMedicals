
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import docImage from '../../assets/EMedicals/doc.jpeg'; // Reuse from AboutSection1
import telehealthIcon from '../../assets/EMedicals/drug.png'; // Placeholder
import cemeteryIcon from '../../assets/EMedicals/doctor5.jpeg';
import appointmentIcon from '../../assets/EMedicals/dd.jpeg'; // Placeholder
import Navbar from '../Navbar';
import Footer from '../Footer';
const AboutPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.2 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <>
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
 
    <motion.div
      className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen py-16 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-labelledby="about-page-heading"
    >
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto mb-16">
        <motion.h1
          id="about-page-heading"
          className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-4"
          variants={childVariants}
        >
          About E-Medicals
        </motion.h1>
        <motion.p
          className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8"
          variants={childVariants}
        >
          E-Medicals is your trusted partner in healthcare and memorial services, delivering innovative solutions to empower communities with accessible, compassionate care.
        </motion.p>
        <motion.img
          src={docImage}
          alt="Healthcare professionals at E-Medical"
          className="w-full max-w-2xl mx-auto rounded-2xl shadow-xl object-cover"
          loading="lazy"
          variants={childVariants}
        />
      </section>

      {/* Mission & Vision Section */}
      <section className="max-w-5xl mx-auto mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div className="space-y-4" variants={childVariants}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Our Mission</h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              To revolutionize healthcare access by connecting patients with top medical professionals through seamless telehealth, appointment booking, and personalized care plans. We also provide dignified memorial services, ensuring every life is honored with respect.
            </p>
          </motion.div>
          <motion.div className="space-y-4" variants={childVariants}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Our Vision</h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              A world where quality healthcare and meaningful end-of-life services are universally accessible, delivered with empathy, innovation, and excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-5xl mx-auto mb-16">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12"
          variants={childVariants}
        >
          Why Choose E-Medical?
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            variants={childVariants}
          >
            <img
              src={telehealthIcon}
              alt="Telehealth icon"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">Telehealth Services</h3>
            <p className="text-gray-600 text-center text-sm md:text-base">
              Connect with doctors remotely for consultations, prescriptions, and follow-ups, anytime, anywhere.
            </p>
          </motion.div>
          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            variants={childVariants}
          >
            <img
              src={appointmentIcon}
              alt="Appointment booking icon"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">Easy Appointment Booking</h3>
            <p className="text-gray-600 text-center text-sm md:text-base">
              Schedule appointments with specialists in just a few clicks, with real-time availability.
            </p>
          </motion.div>
          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            variants={childVariants}
          >
            <img
              src={cemeteryIcon}
              alt="Cemetery services icon"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">Memorial Services</h3>
            <p className="text-gray-600 text-center text-sm md:text-base">
              Honor loved ones with our integrated cemetery management, offering caskets, flowers, and memorial planning.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-5xl mx-auto mb-16">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12"
          variants={childVariants}
        >
          Meet Our Team
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            className="text-center"
            variants={childVariants}
          >
            <img
              src={docImage}
              alt="Dr. Jane Doe, Chief Medical Officer"
              className="w-32 h-32 mx-auto rounded-full shadow-md object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">Dr. Jane Doe</h3>
            <p className="text-gray-500 text-sm">Chief Medical Officer</p>
            <p className="text-gray-600 text-sm mt-2">Leading our healthcare initiatives with 20 years of experience.</p>
          </motion.div>
          <motion.div
            className="text-center"
            variants={childVariants}
          >
            <img
              src={docImage}
              alt="John Smith, CTO"
              className="w-32 h-32 mx-auto rounded-full shadow-md object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">John Smith</h3>
            <p className="text-gray-500 text-sm">Chief Technology Officer</p>
            <p className="text-gray-600 text-sm mt-2">Driving innovation in our platform’s technology.</p>
          </motion.div>
          <motion.div
            className="text-center"
            variants={childVariants}
          >
            <img
              src={docImage}
              alt="Sarah Lee, Memorial Services Director"
              className="w-32 h-32 mx-auto rounded-full shadow-md object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">Sarah Lee</h3>
            <p className="text-gray-500 text-sm">Memorial Services Director</p>
            <p className="text-gray-600 text-sm mt-2">Ensuring compassionate end-of-life services.</p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-5xl mx-auto mb-16">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12"
          variants={childVariants}
        >
          What Our Users Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg"
            variants={childVariants}
          >
            <p className="text-gray-600 text-base mb-4 italic">
              “E-Medical made booking my doctor’s appointment so easy, and the telehealth option saved me hours of travel!”
            </p>
            <p className="text-gray-800 font-semibold">Emily R.</p>
            <p className="text-gray-500 text-sm">Patient</p>
          </motion.div>
          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg"
            variants={childVariants}
          >
            <p className="text-gray-600 text-base mb-4 italic">
              “The memorial services helped us honor my father with dignity. The process was seamless and compassionate.”
            </p>
            <p className="text-gray-800 font-semibold">Michael T.</p>
            <p className="text-gray-500 text-sm">Family Member</p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          variants={childVariants}
        >
          Ready to Experience E-Medical?
        </motion.h2>
        <motion.p
          className="text-gray-600 text-lg md:text-xl mb-8"
          variants={childVariants}
        >
          Join thousands of users who trust E-Medical for their healthcare and memorial needs.
        </motion.p>
        <motion.div
          className="flex justify-center space-x-4"
          variants={childVariants}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Link
            to="/usersignup"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
            aria-label="Sign up for E-Medical"
          >
            Get Started
          </Link>
          <Link
            to="/userlogin"
            className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold shadow-md border border-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
            aria-label="Log in to E-Medical"
          >
            Log In
          </Link>
        </motion.div>
      </section>
    </motion.div>

    <Footer />
    </>

  );
};

export default AboutPage;

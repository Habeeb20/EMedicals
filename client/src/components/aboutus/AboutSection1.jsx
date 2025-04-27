
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import m from '../../assets/EMedicals/doc.jpeg';
import Footer from '../Footer';

const AboutSection1 = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.2 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <>
        <motion.section
      className="relative flex flex-col md:flex-row items-center justify-center px-4 py-12 md:py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      aria-labelledby="about-heading"
    >
      {/* Background Decorative Element */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-100 rounded-full opacity-20 blur-3xl transform -translate-x-1/2 translate-y-1/4"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-100 rounded-full opacity-20 blur-3xl transform translate-x-1/2 -translate-y-1/4"></div>
      </div>

      {/* Image Section */}
      <motion.div
        className="flex-1 mb-8 md:mb-0 md:mr-10 max-w-md"
        variants={childVariants}
      >
        <img
          src={m}
          alt="Doctor providing compassionate care"
          className="w-full h-auto rounded-2xl shadow-xl object-cover transform hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </motion.div>

      {/* Text Section */}
      <motion.div
        className="flex-1 max-w-lg text-center md:text-left space-y-6"
        variants={childVariants}
      >
        <h2
          id="about-heading"
          className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight"
        >
          About E-Medicals
        </h2>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
          At E-Medical, we are dedicated to transforming healthcare access by connecting patients with trusted medical professionals and providing seamless, compassionate care. Our platform empowers individuals to book appointments, access telehealth services, and manage their health with ease.
        </p>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
          Beyond healthcare, we honor life’s full journey by offering integrated memorial services, ensuring dignity and respect for loved ones through our cemetery management solutions. Our mission is to support communities with innovative, patient-centered care and meaningful end-of-life services.
        </p>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Our Vision</h3>
          <p className="text-gray-500 text-sm md:text-base">
            To create a world where quality healthcare and memorial services are accessible to all, delivered with empathy and excellence.
          </p>
        </div>
        <motion.div
          className="flex justify-center md:justify-start"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Link
            to="/aboutpage"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
            aria-label="Learn more about E-Medical"
          >
            Learn More
          </Link>
        </motion.div>
      </motion.div>
    </motion.section>
    <Footer />
    </>

  );
};

export default AboutSection1;

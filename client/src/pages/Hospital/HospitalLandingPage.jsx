import React from "react";

const HospitalLandingPage = () => {
  return (
    <div className="font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 w-full flex items-center justify-between px-8 py-4 bg-white shadow-md z-50">
        <div className="w-36">
          <img src="logo.png" alt="Logo" className="w-full" />
        </div>
        <nav className="flex space-x-8 text-gray-700">
          <a
            href="#"
            className="relative text-base font-medium after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-yellow-500 hover:after:w-full after:transition-all after:duration-300 hover:text-yellow-500"
          >
            Home
          </a>
          <a
            href="#"
            className="relative text-base font-medium after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-yellow-500 hover:after:w-full after:transition-all after:duration-300 hover:text-yellow-500"
          >
            About
          </a>
          <a
            href="#"
            className="relative text-base font-medium after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-yellow-500 hover:after:w-full after:transition-all after:duration-300 hover:text-yellow-500"
          >
            Services
          </a>
        </nav>
        <div className="hidden lg:flex">
          <button className="py-3 px-6 bg-teal-500 text-white text-sm font-semibold rounded hover:bg-yellow-500 transition-colors duration-300">
            Contact Us
          </button>
        </div>
        <div className="lg:hidden">
          <i className="fas fa-bars text-gray-600 text-xl cursor-pointer"></i>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat min-h-screen pt-32 px-8"
        style={{ backgroundImage: "url(images/blurbg1.jpg)" }}
      >
        <div className="flex flex-wrap justify-between items-center min-h-[75vh]">
          <div className="max-w-lg">
            <span className="text-teal-500 text-sm font-semibold uppercase">
              Welcome to Our Website
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Your Journey Begins Here
            </h1>
            <p className="text-gray-700 text-base leading-relaxed mb-8">
              We provide exceptional services to help you achieve your goals.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="py-3 px-6 bg-teal-500 text-white rounded shadow-md hover:bg-yellow-500 transition-colors duration-300"
              >
                Learn More
              </a>
              <a
                href="#"
                className="py-3 px-6 border border-teal-500 text-teal-500 rounded shadow-md hover:bg-yellow-500 hover:text-white transition-colors duration-300"
              >
                Get Started
              </a>
            </div>
          </div>
          <div>
            <img src="images/home-image.png" alt="Hero" className="w-full max-w-md" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        className="py-16 px-8 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(images/backgroung-pattern-1.png)" }}
      >
        <div className="text-center mb-12">
          <h2 className="text-teal-500 text-3xl font-bold mb-2 inline-block border-b-4 border-yellow-500 pb-2">
            About Us
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-12">
          <div className="flex-1">
            <img src="images/about-image.png" alt="About" className="w-full max-w-lg mx-auto" />
          </div>
          <div className="flex-1 max-w-lg">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              Who We Are
            </h3>
            <p className="text-gray-600 text-base leading-relaxed">
              We are a team of professionals committed to providing top-notch services to our clients.
            </p>
            <button className="mt-6 py-3 px-6 border border-teal-500 text-teal-500 rounded hover:bg-yellow-500 hover:text-white transition-colors duration-300">
              Read More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HospitalLandingPage;

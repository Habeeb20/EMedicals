import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Secure Platform",
    description: "Secure online platform for scheduling tests and uploading results, ensuring data protection and confidentiality.",
    icon: "\u2606", // Replace with appropriate icon
    link: "/secure-platform",
  },
  {
    title: "Convenient Sampling",
    description: "Flexible sampling options, including home sample pickups and walk-in appointments, for patient convenience and comfort.",
    icon: "\u2615", // Replace with appropriate icon
    link: "/convenient-sampling",
  },
  {
    title: "Extended Access",
    description: "Expands your reach and connects with a broader patient base and healthcare providers across the region.",
    icon: "\u2695", // Replace with appropriate icon
    link: "/extended-access",
  },
  {
    title: "Streamlined Ordering",
    description: "Effortlessly manage medication orders and tracking in one place.",
    icon: "\u267B", // Replace with appropriate icon
    link: "/streamlined-ordering",
  },
  {
    title: "Efficient Fulfillment",
    description: "Seamlessly fulfill prescriptions, whether through delivery or pharmacy pickup options.",
    icon: "\u270D", // Replace with appropriate icon
    link: "/efficient-fulfillment",
  },
  {
    title: "Collaborative Care",
    description: "Enhance coordination with healthcare providers for better patient outcomes.",
    icon: "\u2713", // Replace with appropriate icon
    link: "/collaborative-care",
  },
];

const LPage = () => {
  return (
    <div className="bg-gradient-to-b from-green-50 to-blue-50 py-12">
      {/* Rainbow stripe with icons */}
      <div className="flex justify-center space-x-4 py-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`h-2 w-16 rounded-full`}
            style={{ background: `hsl(${index * 60}, 70%, 60%)` }}
          />
        ))}
      </div>

      {/* Feature grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {features.map((feature, index) => (
          <a
            key={index}
            href={feature.link}
            className="group block bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-300"
          >
            <div className="flex items-center justify-center mb-4">
              <span className="text-4xl text-green-500 group-hover:text-blue-500">
                {feature.icon}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm group-hover:text-gray-800">
              {feature.description}
            </p>
          </a>
        ))}
      </motion.div>
    </div>
  );
};

export default LPage;

import { motion } from "framer-motion";
import m from "../../assets/EMedicals/thepic-removebg-preview.png"
export default function LPage2() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center px-4 lg:px-20 py-10 lg:py-20 space-y-10 lg:space-y-0 lg:space-x-10">
      {/* Left Image Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="w-full lg:w-1/2"
      >
        <img
          src={m}
          alt="Person using mobile phone"
          className="rounded-lg shadow-lg w-full"
        />
      </motion.div>

      {/* Right Content Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="w-full lg:w-1/2 space-y-8"
      >
        {/* Section 1 */}
        <div>
          <div className="flex items-center space-x-4">
            <div className="bg-blue-200 text-blue-600 p-3 rounded-full">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3 className="text-xl font-bold text-blue-600">Insurers & HMOs</h3>
          </div>
          <p className="mt-2 text-gray-600">
            Digitise enrollee benefits, lower Medical Loss Ratio (MLR) and streamline claims processing with Heala’s comprehensive ERP solution.
          </p>
      
        </div>

        {/* Section 2 */}
        <div>
          <div className="flex items-center space-x-4">
            <div className="bg-blue-200 text-blue-600 p-3 rounded-full">
              <i className="fas fa-hospital"></i>
            </div>
            <h3 className="text-xl font-bold text-blue-600">Healthcare Providers</h3>
          </div>
          <p className="mt-2 text-gray-600">
            Optimise operational efficiency, expand patient access and leverage data-driven insights with our comprehensive hospital management solution.
          </p>
       
        </div>

        {/* Section 3 */}
        <div>
          <div className="flex items-center space-x-4">
            <div className="bg-blue-200 text-blue-600 p-3 rounded-full">
              <i className="fas fa-heart"></i>
            </div>
            <h3 className="text-xl font-bold text-blue-600">Healthcare Professionals</h3>
          </div>
          <p className="mt-2 text-gray-600">
            Access innovative tools and resources to enhance patient care and streamline your workflow with our advanced solutions.
          </p>
        
        </div>
      </motion.div>
    </div>
  );
}

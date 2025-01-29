import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { SiTether } from "react-icons/si";
import { BsGraphUp } from "react-icons/bs";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const Sidebar = ({ isOpen, toggleSidebar, setActiveSection }) => {
  return (
    <div className={`fixed inset-y-0 left-0 bg-gray-500 text-white w-64 p-5 transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-64"} lg:translate-x-0 lg:static lg:w-72`}>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">Vaultify</h2>
        <button className="lg:hidden" onClick={toggleSidebar}><FiX size={24} /></button>
      </div>
      <nav>
        {["Dashboard", "Statistics & Income", "Market", "Funding", "Yield Vaults"].map((item, index) => (
          <button
            key={index}
            className="block w-full text-left py-2 px-4 rounded-lg hover:bg-gray-800"
            onClick={() => setActiveSection(item)}
          >
            {item}
          </button>
        ))}
      </nav>
    </div>
  );
};

const TradingChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Market Trends",
        data: [],
        borderColor: "#ff9900",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        fill: true,
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prevData) => {
        const newLabel = new Date().toLocaleTimeString();
        const newData = [...prevData.datasets[0].data, Math.random() * 100];
        const newLabels = [...prevData.labels, newLabel];
        if (newLabels.length > 20) {
          newLabels.shift();
          newData.shift();
        }
        return {
          labels: newLabels,
          datasets: [{ ...prevData.datasets[0], data: newData }],
        };
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-5 rounded-lg shadow-lg w-full h-64">
      <Line data={chartData} />
    </div>
  );
};

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Dashboard");

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex bg-gray-900 min-h-screen text-white">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setActiveSection={setActiveSection} />
      <div className="flex-1 p-6 lg:ml-72">
        <button className="lg:hidden mb-4" onClick={toggleSidebar}><FiMenu size={24} /></button>
        <h1 className="text-2xl font-bold mb-6">{activeSection}</h1>
        {activeSection === "Statistics & Income" && <TradingChart />}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {[{ title: "Your Balance", value: "$74,892", change: "-2.1%" },
            { title: "Your Deposits", value: "$54,892", change: "+3.2%" },
            { title: "Accrued Yield", value: "$20,892", change: "+1.2%" }
          ].map((item, index) => (
            <div key={index} className="p-5 bg-gray-800 rounded-lg shadow-md">
              <p className="text-gray-400">{item.title}</p>
              <h2 className="text-3xl font-bold">{item.value}</h2>
              <p className={item.change.startsWith("+") ? "text-green-500" : "text-red-500"}>{item.change}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

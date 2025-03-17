
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { ArrowRight } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { Link } from "react-router-dom";
import { 
  kenyaShipmentData, 
  philippinesShipmentData, 
  sriLankaShipmentData,
  somaliaShipmentData
} from "@/data/mockData";

// Mock data for Tunisia and Uganda
const tunisiaShipmentData = [
  { name: "Jan", shipments: 45 },
  { name: "Feb", shipments: 52 },
  { name: "Mar", shipments: 48 },
  { name: "Apr", shipments: 61 },
  { name: "May", shipments: 55 },
  { name: "Jun", shipments: 67 }
];

const ugandaShipmentData = [
  { name: "Jan", shipments: 38 },
  { name: "Feb", shipments: 42 },
  { name: "Mar", shipments: 55 },
  { name: "Apr", shipments: 49 },
  { name: "May", shipments: 62 },
  { name: "Jun", shipments: 58 }
];

const Dashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <Layout title="Dashboard">
      <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Primary Destinations Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Primary Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Kenya Card */}
            <div className="rounded-md overflow-hidden bg-blue-600 text-white animate-fade-in shadow-lg hover-scale">
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">Kenya</h3>
                <Link 
                  to="/destinations/kenya" 
                  className="flex items-center gap-1 text-white hover:underline"
                >
                  View Details 
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            
            {/* Tunisia Card */}
            <div className="rounded-md overflow-hidden bg-red-600 text-white animate-fade-in shadow-lg hover-scale" style={{animationDelay: "0.1s"}}>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">Tunisia</h3>
                <Link 
                  to="/destinations/tunisia" 
                  className="flex items-center gap-1 text-white hover:underline"
                >
                  View Details 
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            
            {/* Uganda Card */}
            <div className="rounded-md overflow-hidden bg-green-600 text-white animate-fade-in shadow-lg hover-scale" style={{animationDelay: "0.2s"}}>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">Uganda</h3>
                <Link 
                  to="/destinations/uganda" 
                  className="flex items-center gap-1 text-white hover:underline"
                >
                  View Details 
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional Destinations */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Additional Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-md overflow-hidden bg-amber-500 text-white animate-fade-in shadow-lg hover-scale" style={{animationDelay: "0.3s"}}>
              <div className="p-4">
                <h3 className="text-xl font-bold">Philippines</h3>
                <Link 
                  to="/destinations/philippines" 
                  className="flex items-center gap-1 text-sm text-white hover:underline mt-1"
                >
                  View Details 
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
            
            <div className="rounded-md overflow-hidden bg-red-500 text-white animate-fade-in shadow-lg hover-scale" style={{animationDelay: "0.4s"}}>
              <div className="p-4">
                <h3 className="text-xl font-bold">Sri Lanka</h3>
                <Link 
                  to="/destinations/sri-lanka" 
                  className="flex items-center gap-1 text-sm text-white hover:underline mt-1"
                >
                  View Details 
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
            
            <div className="rounded-md overflow-hidden bg-green-500 text-white animate-fade-in shadow-lg hover-scale" style={{animationDelay: "0.5s"}}>
              <div className="p-4">
                <h3 className="text-xl font-bold">Somalia</h3>
                <Link 
                  to="/destinations/somalia" 
                  className="flex items-center gap-1 text-sm text-white hover:underline mt-1"
                >
                  View Details 
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Shipment Analytics Section */}
        <div className="mb-8 animate-fade-in" style={{animationDelay: "0.6s"}}>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Shipment Analytics</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Kenya Shipments Chart */}
            <div className="bg-white rounded-md p-4 shadow-lg transition-transform hover:shadow-xl duration-300">
              <h3 className="text-lg font-medium mb-4 text-blue-600">Kenya Shipments - 2023</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={kenyaShipmentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                    <XAxis dataKey="name" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="shipments" fill="#0a2463" name="Shipments" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Tunisia Shipments Chart */}
            <div className="bg-white rounded-md p-4 shadow-lg transition-transform hover:shadow-xl duration-300">
              <h3 className="text-lg font-medium mb-4 text-red-600">Tunisia Shipments - 2023</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={tunisiaShipmentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                    <XAxis dataKey="name" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="shipments" fill="#dc2626" name="Shipments" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Uganda Shipments Chart */}
            <div className="bg-white rounded-md p-4 shadow-lg transition-transform hover:shadow-xl duration-300">
              <h3 className="text-lg font-medium mb-4 text-green-600">Uganda Shipments - 2023</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ugandaShipmentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                    <XAxis dataKey="name" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="shipments" fill="#16a34a" name="Shipments" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Philippines Shipments Chart */}
            <div className="bg-white rounded-md p-4 shadow-lg transition-transform hover:shadow-xl duration-300">
              <h3 className="text-lg font-medium mb-4 text-amber-500">Philippines Shipments - 2023</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={philippinesShipmentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                    <XAxis dataKey="name" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="shipments" fill="#f59e0b" name="Shipments" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

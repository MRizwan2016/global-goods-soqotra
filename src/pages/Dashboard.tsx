
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

const Dashboard = () => {
  return (
    <Layout title="Dashboard">
      {/* Primary Destinations Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Primary Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="rounded-md overflow-hidden bg-amber-500 text-white">
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4">Philippines</h3>
              <Link 
                to="/destinations/philippines" 
                className="flex items-center gap-1 text-white hover:underline"
              >
                View Details 
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          
          <div className="rounded-md overflow-hidden bg-red-500 text-white">
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4">Sri Lanka</h3>
              <Link 
                to="/destinations/sri-lanka" 
                className="flex items-center gap-1 text-white hover:underline"
              >
                View Details 
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          
          <div className="rounded-md overflow-hidden bg-green-500 text-white">
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4">Somalia</h3>
              <Link 
                to="/destinations/somalia" 
                className="flex items-center gap-1 text-white hover:underline"
              >
                View Details 
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Shipment Analytics Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Shipment Analytics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Kenya Shipments Chart */}
          <div className="bg-white rounded-md p-4 shadow-sm">
            <h3 className="text-lg font-medium mb-4">Kenya Shipments - 2023</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={kenyaShipmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="shipments" fill="#0a2463" name="shipments" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Philippines Shipments Chart */}
          <div className="bg-white rounded-md p-4 shadow-sm">
            <h3 className="text-lg font-medium mb-4">Philippines Shipments - 2023</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={philippinesShipmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="shipments" fill="#f59e0b" name="shipments" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sri Lanka Shipments Chart */}
          <div className="bg-white rounded-md p-4 shadow-sm">
            <h3 className="text-lg font-medium mb-4">Sri Lanka Shipments - 2023</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sriLankaShipmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="shipments" fill="#ef4444" name="shipments" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Somalia Shipments Chart */}
          <div className="bg-white rounded-md p-4 shadow-sm">
            <h3 className="text-lg font-medium mb-4">Somalia Shipments - 2023</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={somaliaShipmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="shipments" fill="#22c55e" name="shipments" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

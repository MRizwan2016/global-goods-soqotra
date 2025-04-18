
import Layout from "@/components/layout/Layout";
import { useDashboardData } from "@/hooks/useDashboardData";
import PrimaryDestinations from "@/components/dashboard/PrimaryDestinations";
import AdditionalDestinations from "@/components/dashboard/AdditionalDestinations";
import ShipmentAnalytics from "@/components/dashboard/ShipmentAnalytics";

const Dashboard = () => {
  const { isLoaded, shipmentData } = useDashboardData();

  return (
    <Layout title="Dashboard">
      <div className="min-h-screen bg-gradient-to-br from-[#F0F8FF] to-white">
        <div className={`p-6 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="space-y-6 animate-fade-in">
            <div className="glass p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <PrimaryDestinations />
            </div>
            
            <div className="glass p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <AdditionalDestinations />
            </div>
            
            <div className="glass p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <ShipmentAnalytics 
                kenyaData={shipmentData.kenya}
                tunisiaData={shipmentData.tunisia}
                ugandaData={shipmentData.uganda}
                philippinesData={shipmentData.philippines}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;


import Layout from "@/components/layout/Layout";
import { useDashboardData } from "@/hooks/useDashboardData";
import PrimaryDestinations from "@/components/dashboard/PrimaryDestinations";
import AdditionalDestinations from "@/components/dashboard/AdditionalDestinations";
import ShipmentAnalytics from "@/components/dashboard/ShipmentAnalytics";

const Dashboard = () => {
  const { isLoaded, shipmentData } = useDashboardData();

  return (
    <Layout title="Dashboard">
      <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <PrimaryDestinations />
        <AdditionalDestinations />
        <ShipmentAnalytics 
          kenyaData={shipmentData.kenya}
          tunisiaData={shipmentData.tunisia}
          ugandaData={shipmentData.uganda}
          philippinesData={shipmentData.philippines}
        />
      </div>
    </Layout>
  );
};

export default Dashboard;

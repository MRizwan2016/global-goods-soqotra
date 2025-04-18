
import Layout from "@/components/layout/Layout";
import { useDashboardData } from "@/hooks/useDashboardData";
import PrimaryDestinations from "@/components/dashboard/PrimaryDestinations";
import AdditionalDestinations from "@/components/dashboard/AdditionalDestinations";
import ShipmentAnalytics from "@/components/dashboard/ShipmentAnalytics";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardCard from "@/components/dashboard/DashboardCard";

const Dashboard = () => {
  const { isLoaded, shipmentData } = useDashboardData();

  return (
    <Layout title="Dashboard">
      <DashboardLayout isLoaded={isLoaded}>
        <DashboardCard>
          <PrimaryDestinations />
        </DashboardCard>
        
        <DashboardCard>
          <AdditionalDestinations />
        </DashboardCard>
        
        <DashboardCard>
          <ShipmentAnalytics 
            kenyaData={shipmentData.kenya}
            tunisiaData={shipmentData.tunisia}
            ugandaData={shipmentData.uganda}
            philippinesData={shipmentData.philippines}
          />
        </DashboardCard>
      </DashboardLayout>
    </Layout>
  );
};

export default Dashboard;

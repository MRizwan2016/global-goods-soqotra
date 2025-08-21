
import Layout from "@/components/layout/Layout";
import { useDashboardData } from "@/hooks/useDashboardData";
import PrimaryDestinations from "@/components/dashboard/PrimaryDestinations";
import AdditionalDestinations from "@/components/dashboard/AdditionalDestinations";
import ShipmentAnalytics from "@/components/dashboard/ShipmentAnalytics";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { HardDrive } from "lucide-react";

const Dashboard = () => {
  const { isLoaded, shipmentData } = useDashboardData();
  const { isAdmin, currentUser } = useAuth();

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

        {isAdmin && (
          <DashboardCard>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Data Management</h3>
              <p className="text-muted-foreground text-sm">
                Backup and manage your application data to prevent loss
              </p>
              <Link to="/data-backup">
                <Button className="w-full sm:w-auto">
                  <HardDrive className="mr-2 h-4 w-4" />
                  Data Backup & Recovery
                </Button>
              </Link>
            </div>
          </DashboardCard>
        )}
      </DashboardLayout>
    </Layout>
  );
};

export default Dashboard;

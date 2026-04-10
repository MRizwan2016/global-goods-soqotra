
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
import { HardDrive, Package, Users, Search, AlertTriangle } from "lucide-react";
import { useMaintenanceAlerts } from "@/hooks/useMaintenanceAlerts";

const Dashboard = () => {
  const { isLoaded, shipmentData } = useDashboardData();
  const { isAdmin, currentUser } = useAuth();
  const { alerts } = useMaintenanceAlerts();

  return (
    <Layout title="Dashboard">
      <DashboardLayout isLoaded={isLoaded}>
        {/* Track & Trace Quick Access */}
        <DashboardCard>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Track & Trace</h3>
                <p className="text-muted-foreground text-sm">Customer cargo tracking portal</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to="/customer-portal">
                <Button variant="default" size="sm" className="gap-1.5">
                  <Search className="h-4 w-4" />
                  Customer Portal
                </Button>
              </Link>
              <Link to="/customer-portal/admin">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Users className="h-4 w-4" />
                  Customer Management
                </Button>
              </Link>
            </div>
          </div>
        </DashboardCard>

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

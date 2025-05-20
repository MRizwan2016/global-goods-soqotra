
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TunisiaStatCards from "./components/dashboard/StatCards";
import VehicleExportOverview from "./components/dashboard/VehicleExportOverview";
import VehicleExportGallery from "./components/dashboard/VehicleExportGallery";
import TunisiaMapInfo from "./components/dashboard/TunisiaMapInfo";
import TunisiaOperationsTab from "./components/tabs/TunisiaOperationsTab";
import ShippingRoutesTab from "./components/tabs/ShippingRoutesTab";
import VehicleTypesTab from "./components/tabs/VehicleTypesTab";
import CustomsClearanceTab from "./components/tabs/CustomsClearanceTab";

const TunisiaDashboard: React.FC = () => {
  return (
    <Layout title="Tunisia Operations">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Tunisia Vehicle Export Operations</h1>
        <p className="text-gray-600">Specialized vehicle export services from Qatar to Tunisia ports</p>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        <TunisiaStatCards />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <VehicleExportOverview />
        <TunisiaMapInfo />
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Vehicle Export Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          <VehicleExportGallery />
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="operations">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="operations">Operations</TabsTrigger>
              <TabsTrigger value="shipping">Shipping Routes</TabsTrigger>
              <TabsTrigger value="vehicles">Vehicle Types</TabsTrigger>
              <TabsTrigger value="customs">Customs Clearance</TabsTrigger>
            </TabsList>
            <TabsContent value="operations" className="mt-6">
              <TunisiaOperationsTab />
            </TabsContent>
            <TabsContent value="shipping" className="mt-6">
              <ShippingRoutesTab />
            </TabsContent>
            <TabsContent value="vehicles" className="mt-6">
              <VehicleTypesTab />
            </TabsContent>
            <TabsContent value="customs" className="mt-6">
              <CustomsClearanceTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default TunisiaDashboard;

import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PhilippinesStatCards from "./components/dashboard/StatCards";
import ShipmentAnalytics from "./components/dashboard/ShipmentAnalytics";
import PhilippinesGallery from "./components/dashboard/PhilippinesGallery";
import PhilippinesMapInfo from "./components/dashboard/PhilippinesMapInfo";
import DeliveriesTab from "./components/tabs/DeliveriesTab";
import WarehousesTab from "./components/tabs/WarehousesTab";
import CarriersTab from "./components/tabs/CarriersTab";
import CustomsTab from "./components/tabs/CustomsTab";
import CountryBackButton from "@/components/ui/country-back-button";
import LanguageSwitcher from "@/components/ui/language-switcher";
import { useLanguage } from "@/contexts/LanguageContext";

const PhilippinesDashboard: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <Layout title="Philippines Operations">
      <div className="mb-8">
        <div className="flex justify-between mb-4">
          <CountryBackButton />
          <LanguageSwitcher />
        </div>
        <h1 className={`text-3xl font-bold text-gray-800 mb-2 ${language === 'ar' ? 'font-arabic' : ''}`}>Philippines Logistics Operations</h1>
        <p className="text-gray-600">Complete shipping and logistics services throughout the Philippines</p>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        <PhilippinesStatCards />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ShipmentAnalytics />
        <PhilippinesMapInfo />
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Philippines Operations Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          <PhilippinesGallery />
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="deliveries">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="deliveries">Deliveries</TabsTrigger>
              <TabsTrigger value="warehouses">Warehouses</TabsTrigger>
              <TabsTrigger value="carriers">Carriers</TabsTrigger>
              <TabsTrigger value="customs">Customs</TabsTrigger>
            </TabsList>
            <TabsContent value="deliveries" className="mt-6">
              <DeliveriesTab />
            </TabsContent>
            <TabsContent value="warehouses" className="mt-6">
              <WarehousesTab />
            </TabsContent>
            <TabsContent value="carriers" className="mt-6">
              <CarriersTab />
            </TabsContent>
            <TabsContent value="customs" className="mt-6">
              <CustomsTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default PhilippinesDashboard;

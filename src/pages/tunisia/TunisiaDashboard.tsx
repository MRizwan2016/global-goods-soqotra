
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CountryBackButton from "@/components/ui/country-back-button";
import LanguageSwitcher from "@/components/ui/language-switcher";
import { useLanguage } from "@/contexts/LanguageContext";

const TunisiaDashboard: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <Layout title="Tunisia Operations">
      <div className="mb-8">
        <div className="flex justify-between mb-4">
          <CountryBackButton />
          <LanguageSwitcher />
        </div>
        <h1 className={`text-3xl font-bold text-gray-800 mb-2 ${language === 'ar' ? 'font-arabic' : ''}`}>Tunisia Logistics Operations</h1>
        <p className="text-gray-600">Complete shipping and logistics services throughout Tunisia</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tunisia Operations Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Our operations in Tunisia focus on providing comprehensive logistics solutions
              across the country's key economic zones. From the port of La Goulette to industrial
              areas around Tunis, our network ensures efficient cargo movement.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Shipments</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Analytics and recent shipment information will appear here.</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default TunisiaDashboard;

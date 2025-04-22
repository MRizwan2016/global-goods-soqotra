
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { globe } from "lucide-react";
import RegistrationLayout from "./components/RegistrationLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCountryByCode, getCountryNameByCode } from "./types";
import CountryOverview from "./components/country/CountryOverview";
import CountryTransactions from "./components/country/CountryTransactions";
import CountryVendors from "./components/country/CountryVendors";
import CountrySettings from "./components/country/CountrySettings";

const CountryReconciliationPage: React.FC = () => {
  const { countryCode } = useParams<{ countryCode: string }>();
  const [countryName, setCountryName] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("overview");
  
  useEffect(() => {
    if (countryCode) {
      const name = getCountryNameByCode(countryCode);
      setCountryName(name);
      document.title = `${name} Reconciliation`;
    }
  }, [countryCode]);
  
  if (!countryCode || !getCountryByCode(countryCode)) {
    return (
      <RegistrationLayout
        title="Country Not Found"
        subtitle="The requested country page could not be found"
        icon={<globe className="h-6 w-6 text-red-600" />}
        tabs={[]}
      >
        <Card>
          <CardContent className="pt-6 text-center">
            <h3 className="text-lg font-medium mb-2">Invalid Country Code</h3>
            <p className="text-gray-500">
              The country code "{countryCode}" is not supported or does not exist.
              Please select a valid country from the navigation menu.
            </p>
          </CardContent>
        </Card>
      </RegistrationLayout>
    );
  }
  
  return (
    <RegistrationLayout
      title={`${countryName} Reconciliation`}
      subtitle={`Manage reconciliation for ${countryName}`}
      icon={<globe className="h-6 w-6 text-purple-600" />}
      tabs={[]}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="vendors">Local Entities</TabsTrigger>
          <TabsTrigger value="settings">Country Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <CountryOverview countryCode={countryCode} />
        </TabsContent>
        
        <TabsContent value="transactions">
          <CountryTransactions countryCode={countryCode} />
        </TabsContent>
        
        <TabsContent value="vendors">
          <CountryVendors countryCode={countryCode} />
        </TabsContent>
        
        <TabsContent value="settings">
          <CountrySettings countryCode={countryCode} />
        </TabsContent>
      </Tabs>
    </RegistrationLayout>
  );
};

export default CountryReconciliationPage;

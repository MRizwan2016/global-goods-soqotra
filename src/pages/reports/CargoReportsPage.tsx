
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Box, BarChart3, FileText } from "lucide-react";
import ReportHeader from "./components/ReportHeader";
import InvoiceSearchPanel from "./components/InvoiceSearchPanel";

const CargoReportsPage: React.FC = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeTab, setActiveTab] = useState("invoices");

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className={`p-4 ${isFullScreen ? 'fixed inset-0 z-50 bg-white overflow-auto' : ''}`}>
      <h1 className="text-2xl font-bold mb-4">Cargo Reports</h1>

      <Tabs defaultValue="invoices" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="invoices" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            Invoices
          </TabsTrigger>
          <TabsTrigger value="cargo-stats" className="flex items-center gap-1">
            <BarChart3 className="h-4 w-4" />
            Cargo Statistics
          </TabsTrigger>
          <TabsTrigger value="shipments" className="flex items-center gap-1">
            <Box className="h-4 w-4" />
            Shipments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="invoices">
          <InvoiceSearchPanel />
          
          <Card>
            <ReportHeader 
              title="Invoice Analytics" 
              isFullScreen={isFullScreen} 
              toggleFullScreen={toggleFullScreen} 
            />
            <CardContent className="p-4">
              <div className="text-center py-12 text-gray-500">
                <p>Select search criteria and run report to view invoice analytics</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cargo-stats">
          <Card>
            <ReportHeader 
              title="Cargo Volume Statistics" 
              isFullScreen={isFullScreen} 
              toggleFullScreen={toggleFullScreen} 
            />
            <CardContent className="p-4">
              <div className="text-center py-12 text-gray-500">
                <p>Cargo statistics reports will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipments">
          <Card>
            <ReportHeader 
              title="Shipment Reports" 
              isFullScreen={isFullScreen} 
              toggleFullScreen={toggleFullScreen} 
            />
            <CardContent className="p-4">
              <div className="text-center py-12 text-gray-500">
                <p>Shipment reports will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CargoReportsPage;

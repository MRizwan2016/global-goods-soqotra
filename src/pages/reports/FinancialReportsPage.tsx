
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, PieChart, BarChart3 } from "lucide-react";
import ReportHeader from "./components/ReportHeader";

const FinancialReportsPage: React.FC = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className={`p-4 ${isFullScreen ? 'fixed inset-0 z-50 bg-white overflow-auto' : ''}`}>
      <h1 className="text-2xl font-bold mb-4">Financial Reports</h1>
      
      <Tabs defaultValue="revenue">
        <TabsList className="mb-4">
          <TabsTrigger value="revenue" className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            Revenue
          </TabsTrigger>
          <TabsTrigger value="expenses" className="flex items-center gap-1">
            <BarChart3 className="h-4 w-4" />
            Expenses
          </TabsTrigger>
          <TabsTrigger value="profitability" className="flex items-center gap-1">
            <PieChart className="h-4 w-4" />
            Profitability
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="revenue">
          <Card>
            <ReportHeader 
              title="Revenue Analysis" 
              isFullScreen={isFullScreen} 
              toggleFullScreen={toggleFullScreen} 
            />
            <CardContent className="p-4">
              <div className="text-center py-12 text-gray-500">
                <p>Revenue analysis reports will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="expenses">
          <Card>
            <ReportHeader 
              title="Expense Breakdown" 
              isFullScreen={isFullScreen} 
              toggleFullScreen={toggleFullScreen} 
            />
            <CardContent className="p-4">
              <div className="text-center py-12 text-gray-500">
                <p>Expense breakdown reports will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profitability">
          <Card>
            <ReportHeader 
              title="Profitability Analysis" 
              isFullScreen={isFullScreen} 
              toggleFullScreen={toggleFullScreen} 
            />
            <CardContent className="p-4">
              <div className="text-center py-12 text-gray-500">
                <p>Profitability analysis reports will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialReportsPage;

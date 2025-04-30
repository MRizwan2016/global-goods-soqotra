
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTabContent from "./OverviewTabContent";
import RevenueTabContent from "./RevenueTabContent";
import ExpensesTabContent from "./ExpensesTabContent";
import { ProfitLossData, CountryProfitData } from "../../types/profitLossTypes";
import { Column } from "@/components/ui/data-table";

interface ProfitLossTabsProps {
  profitLossData: ProfitLossData | null;
  profitLossByCountry: Record<string, CountryProfitData>;
  isLoading: boolean;
  view: "summary" | "detailed";
  columnDefs: Column[];
}

const ProfitLossTabs: React.FC<ProfitLossTabsProps> = ({
  profitLossData,
  profitLossByCountry,
  isLoading,
  view,
  columnDefs,
}) => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="revenue">Revenue</TabsTrigger>
        <TabsTrigger value="expenses">Expenses</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-4">
        <OverviewTabContent 
          profitLossData={profitLossData}
          profitLossByCountry={profitLossByCountry}
          isLoading={isLoading}
          view={view}
          columnDefs={columnDefs}
        />
      </TabsContent>
      
      <TabsContent value="revenue" className="space-y-4">
        <RevenueTabContent 
          profitLossData={profitLossData} 
          isLoading={isLoading} 
          columnDefs={columnDefs} 
        />
      </TabsContent>
      
      <TabsContent value="expenses" className="space-y-4">
        <ExpensesTabContent 
          profitLossData={profitLossData} 
          isLoading={isLoading} 
          columnDefs={columnDefs} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default ProfitLossTabs;

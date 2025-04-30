
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import ProfitLossChart from "./ProfitLossChart";
import ProfitLossSummary from "./ProfitLossSummary";
import { ProfitLossData, CountryProfitData } from "../../types/profitLossTypes";
import { Column } from "@/components/ui/data-table";

interface OverviewTabContentProps {
  profitLossData: ProfitLossData | null;
  profitLossByCountry: Record<string, CountryProfitData>;
  isLoading: boolean;
  view: "summary" | "detailed";
  columnDefs: Column[];
}

const OverviewTabContent: React.FC<OverviewTabContentProps> = ({
  profitLossData,
  profitLossByCountry,
  isLoading,
  view,
  columnDefs,
}) => {
  return (
    <div className="space-y-4">
      <ProfitLossSummary 
        data={profitLossData} 
        byCountry={profitLossByCountry} 
        isLoading={isLoading} 
      />
      
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Performance Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ProfitLossChart data={profitLossData} />
          </div>
        </CardContent>
      </Card>
      
      {view === "detailed" && (
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Transaction Details</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable 
              columns={columnDefs}
              data={profitLossData?.transactions || []}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OverviewTabContent;

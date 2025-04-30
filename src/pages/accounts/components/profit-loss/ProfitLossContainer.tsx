
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import FilterSection from "./FilterSection";
import ProfitLossTabs from "./ProfitLossTabs";
import { ProfitLossData, CountryProfitData } from "../../types/profitLossTypes";
import { Column } from "@/components/ui/data-table";

interface ProfitLossContainerProps {
  selectedCountry: string;
  setSelectedCountry: (value: string) => void;
  dateRange: { from?: Date; to?: Date };
  setDateRange: (value: { from?: Date; to?: Date }) => void;
  view: "summary" | "detailed";
  setView: (view: "summary" | "detailed") => void;
  handleRefresh: () => void;
  profitLossData: ProfitLossData | null;
  profitLossByCountry: Record<string, CountryProfitData>;
  isLoading: boolean;
  columnDefs: Column[];
}

const ProfitLossContainer: React.FC<ProfitLossContainerProps> = ({
  selectedCountry,
  setSelectedCountry,
  dateRange,
  setDateRange,
  view,
  setView,
  handleRefresh,
  profitLossData,
  profitLossByCountry,
  isLoading,
  columnDefs,
}) => {
  return (
    <Card className="bg-white">
      <CardHeader className="bg-gray-50 border-b pb-3">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <CardTitle className="text-lg">Filters & Controls</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <FilterSection
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          dateRange={dateRange}
          setDateRange={setDateRange}
          view={view}
          setView={setView}
          handleRefresh={handleRefresh}
        />
        
        <ProfitLossTabs
          profitLossData={profitLossData}
          profitLossByCountry={profitLossByCountry}
          isLoading={isLoading}
          view={view}
          columnDefs={columnDefs}
        />
      </CardContent>
    </Card>
  );
};

export default ProfitLossContainer;

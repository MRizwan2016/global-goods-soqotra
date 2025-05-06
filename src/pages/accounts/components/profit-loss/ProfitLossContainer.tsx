
import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import CountrySelector from "./CountrySelector";
import FilterSection from "./FilterSection";
import ProfitLossTabs from "./ProfitLossTabs";
import { ProfitLossData, CountryProfitData } from "../../types/profitLossTypes";
import { Column } from "@/components/ui/data-table";

interface ProfitLossContainerProps {
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  dateRange: any;
  setDateRange: (range: any) => void;
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
    <Card className="bg-white p-4">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CountrySelector
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          />
          <FilterSection
            dateRange={dateRange}
            setDateRange={setDateRange}
            view={view}
            setView={setView}
            handleRefresh={handleRefresh}
          />
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <ProfitLossTabs
            profitLossData={profitLossData}
            profitLossByCountry={profitLossByCountry}
            isLoading={isLoading}
            view={view}
            columnDefs={columnDefs}
          />
        </Tabs>
      </div>
    </Card>
  );
};

export default ProfitLossContainer;

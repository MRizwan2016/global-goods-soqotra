
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useProfitLossData } from "./hooks/useProfitLossData";
import { getProfitLossColumnDefs } from "./hooks/profit-loss/columnDefs";
import ProfitLossContainer from "./components/profit-loss/ProfitLossContainer";

const ProfitLossPage = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [view, setView] = useState<"summary" | "detailed">("summary");
  const [refreshKey, setRefreshKey] = useState<number>(0);
  
  const { 
    profitLossData, 
    profitLossByCountry, 
    isLoading
  } = useProfitLossData(selectedCountry, dateRange, refreshKey);
  
  const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  const columnDefs = getProfitLossColumnDefs();

  return (
    <Layout title="Profit & Loss">
      <div className="space-y-4">
        <ProfitLossContainer
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          dateRange={dateRange}
          setDateRange={setDateRange}
          view={view}
          setView={setView}
          handleRefresh={handleRefresh}
          profitLossData={profitLossData}
          profitLossByCountry={profitLossByCountry}
          isLoading={isLoading}
          columnDefs={columnDefs}
        />
      </div>
    </Layout>
  );
};

export default ProfitLossPage;

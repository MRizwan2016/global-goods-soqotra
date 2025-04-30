
import React from "react";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { RefreshCw, Download } from "lucide-react";
import { CountrySelector } from "./CountrySelector";

interface FilterSectionProps {
  selectedCountry: string;
  setSelectedCountry: (value: string) => void;
  dateRange: { from?: Date; to?: Date };
  setDateRange: (value: { from?: Date; to?: Date }) => void;
  handleRefresh: () => void;
  view: "summary" | "detailed";
  setView: (view: "summary" | "detailed") => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  selectedCountry,
  setSelectedCountry,
  dateRange,
  setDateRange,
  handleRefresh,
  view,
  setView,
}) => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Profit & Loss Analysis</h1>
          <p className="text-muted-foreground">
            Track revenue, expenses, and profitability across all countries
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            className="flex items-center gap-1"
          >
            <RefreshCw size={16} />
            Refresh
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download size={16} />
            Export
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="w-full md:w-1/3">
          <CountrySelector
            selectedCountry={selectedCountry}
            onChange={setSelectedCountry}
          />
        </div>
        
        <div className="w-full md:w-2/3">
          <DatePickerWithRange 
            date={dateRange} 
            setDate={setDateRange} 
          />
        </div>
      </div>
      
      <div className="flex flex-wrap justify-end gap-2 mb-4">
        <Button 
          variant={view === "summary" ? "default" : "outline"} 
          size="sm"
          onClick={() => setView("summary")}
        >
          Summary View
        </Button>
        <Button 
          variant={view === "detailed" ? "default" : "outline"} 
          size="sm"
          onClick={() => setView("detailed")}
        >
          Detailed View
        </Button>
      </div>
    </>
  );
};

export default FilterSection;

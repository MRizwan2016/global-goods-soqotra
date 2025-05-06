
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCcw, FileText, Download } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { ProfitLossData, CountryProfitData } from "../../types/profitLossTypes";

export interface FilterSectionProps {
  dateRange: any;
  setDateRange: (range: any) => void;
  view: "summary" | "detailed";
  setView: (view: "summary" | "detailed") => void;
  handleRefresh: () => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  profitLossData: ProfitLossData | null;
  profitLossByCountry: Record<string, CountryProfitData>;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  dateRange,
  setDateRange,
  view,
  setView,
  handleRefresh,
  // We won't use these props in this component, but they're required by the interface
  selectedCountry,
  setSelectedCountry,
  profitLossData,
  profitLossByCountry
}) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <DateRangePicker
                value={dateRange}
                onChange={setDateRange}
                placeholder="Select date range"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">View</label>
              <ToggleGroup 
                type="single" 
                value={view} 
                onValueChange={(value) => value && setView(value as "summary" | "detailed")}
                className="border rounded-md"
              >
                <ToggleGroupItem value="summary" className="text-xs px-2">Summary</ToggleGroupItem>
                <ToggleGroupItem value="detailed" className="text-xs px-2">Detailed</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1"
              onClick={handleRefresh}
            >
              <RefreshCcw className="h-4 w-4" />
              Refresh
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1"
            >
              <FileText className="h-4 w-4" />
              Export PDF
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              Export Excel
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterSection;

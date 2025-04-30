
import React from "react";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { RefreshCw, Download } from "lucide-react";
import { CountrySelector } from "./CountrySelector";
import { ProfitLossData, CountryProfitData } from "../../types/profitLossTypes";
import { 
  exportTransactionsToCSV, 
  exportMonthlyDataToCSV,
  exportSummaryToCSV
} from "../../hooks/profit-loss/exportUtils";
import { useToast } from "@/hooks/use-toast";
import { DateRange } from "react-day-picker";

interface FilterSectionProps {
  selectedCountry: string;
  setSelectedCountry: (value: string) => void;
  dateRange: DateRange | undefined; // Update this to match the DatePickerWithRange component's expected type
  setDateRange: (value: DateRange | undefined) => void; // Update this to match the DatePickerWithRange component's expected type
  handleRefresh: () => void;
  view: "summary" | "detailed";
  setView: (view: "summary" | "detailed") => void;
  profitLossData: ProfitLossData | null;
  profitLossByCountry: Record<string, CountryProfitData>;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  selectedCountry,
  setSelectedCountry,
  dateRange,
  setDateRange,
  handleRefresh,
  view,
  setView,
  profitLossData,
  profitLossByCountry
}) => {
  const { toast } = useToast();
  
  const handleExport = () => {
    if (!profitLossData) {
      toast({
        title: "No data to export",
        description: "There is no data available to export.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Export all data formats
      exportTransactionsToCSV(
        profitLossData.transactions, 
        `profit_loss_transactions_${selectedCountry !== 'all' ? selectedCountry : 'all'}.csv`
      );
      
      exportMonthlyDataToCSV(
        profitLossData.monthlyData,
        `profit_loss_monthly_${selectedCountry !== 'all' ? selectedCountry : 'all'}.csv`
      );
      
      exportSummaryToCSV(
        profitLossData,
        profitLossByCountry,
        `profit_loss_summary_${selectedCountry !== 'all' ? selectedCountry : 'all'}.csv`
      );
      
      toast({
        title: "Export successful",
        description: "Financial data has been exported to CSV successfully.",
      });
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "Export failed",
        description: "There was an error exporting the data.",
        variant: "destructive"
      });
    }
  };
  
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
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={handleExport}
          >
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

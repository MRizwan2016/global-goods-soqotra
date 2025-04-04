
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, ChevronDown } from "lucide-react";
import { generatePaymentReport } from "../utils/reportGenerator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const PaymentHeader = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = async (reportType: string) => {
    try {
      setIsGenerating(true);
      toast.info(`GENERATING ${reportType} REPORT...`);
      
      await generatePaymentReport(reportType);
      
      toast.success(`${reportType} REPORT DOWNLOADED SUCCESSFULLY`);
    } catch (error) {
      console.error("Error generating report:", error);
      toast.error("FAILED TO GENERATE REPORT");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold tracking-tight uppercase">PAYMENT RECEIVABLE</h1>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 uppercase flex items-center gap-2"
            disabled={isGenerating}
          >
            <Download className="h-4 w-4" />
            DOWNLOAD REPORT
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={() => handleGenerateReport('SUMMARY')}>
            SUMMARY REPORT
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleGenerateReport('WEEKLY')}>
            WEEKLY COLLECTION REPORT
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleGenerateReport('MONTHLY')}>
            MONTHLY COLLECTION REPORT
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleGenerateReport('DETAILED')}>
            DETAILED PAYMENT REPORT
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PaymentHeader;

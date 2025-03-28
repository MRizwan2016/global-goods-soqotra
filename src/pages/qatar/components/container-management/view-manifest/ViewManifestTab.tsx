
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PrintOptions, QatarContainer } from "../../../types/containerTypes";
import { ArrowLeft, Printer, FileText } from "lucide-react";
import ContainerHeader from "./ContainerHeader";
import ActionBar from "./ActionBar";
import ContainerDetails from "./ContainerDetails";
import ContentTabs from "./ContentTabs";

interface ViewManifestTabProps {
  container: QatarContainer | null;
  cargoItems: any[];
  itemList: any[];
  consigneeList: any[];
  unsettledInvoices: any[];
  onBack: () => void;
  printOptions: PrintOptions;
  onPrintOptionsChange: (options: Partial<PrintOptions>) => void;
  onPrint: () => void;
}

const ViewManifestTab: React.FC<ViewManifestTabProps> = ({
  container,
  cargoItems,
  itemList,
  consigneeList,
  unsettledInvoices,
  onBack,
  printOptions,
  onPrintOptionsChange,
  onPrint
}) => {
  const [activeTab, setActiveTab] = useState("cargo-items");
  const [isPrinting, setIsPrinting] = useState(false);
  
  // Generate a unique job number if not already set
  const [jobNumber, setJobNumber] = useState<string>("");
  
  useEffect(() => {
    // Generate a job number format: JOB-YYYY-MMDD-XXXX
    if (!jobNumber) {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const random = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
      const generatedJobNumber = `JOB-${year}-${month}${day}-${random}`;
      setJobNumber(generatedJobNumber);
      
      // Store in localStorage to persist across page refreshes
      if (container?.id) {
        localStorage.setItem(`jobNumber_${container.id}`, generatedJobNumber);
      }
    }
  }, [container?.id, jobNumber]);
  
  useEffect(() => {
    // Try to retrieve job number from localStorage if it exists
    if (container?.id) {
      const savedJobNumber = localStorage.getItem(`jobNumber_${container.id}`);
      if (savedJobNumber) {
        setJobNumber(savedJobNumber);
      }
    }
  }, [container?.id]);

  const handlePrintClick = () => {
    setIsPrinting(true);
    
    // Add a delay to ensure content is fully rendered
    setTimeout(() => {
      onPrint();
      
      // Reset printing state after a delay
      setTimeout(() => {
        setIsPrinting(false);
      }, 1000);
    }, 500);
  };

  if (!container) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold mb-4">No container data available</h2>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Container List
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="outline" onClick={onBack} className="mr-4 hover:scale-105 transition-transform">
            <ArrowLeft className="h-4 w-4 mr-2" />
            BACK
          </Button>
          <h2 className="text-2xl font-bold">CONTAINER MANIFEST</h2>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end mr-4">
            <span className="text-sm font-medium text-gray-500">Job Number:</span>
            <span className="font-bold text-blue-700">{jobNumber}</span>
          </div>
          
          <Button 
            variant="default" 
            className="bg-green-600 hover:bg-green-700"
            onClick={handlePrintClick}
            disabled={isPrinting}
          >
            <Printer className="h-4 w-4 mr-2" />
            {isPrinting ? "Printing..." : "Print Manifest"}
          </Button>
          
          <ActionBar 
            printOptions={printOptions}
            onPrintOptionsChange={onPrintOptionsChange}
            onPrintClick={handlePrintClick}
            isPrinting={isPrinting}
          />
        </div>
      </div>
      
      {container && (
        <ContainerDetails container={container} />
      )}
      
      <div className="print-container">
        <ContentTabs 
          activeTab={activeTab}
          cargoItems={cargoItems}
          itemList={itemList}
          consigneeList={consigneeList}
          unsettledInvoices={unsettledInvoices}
          container={container}
          printOptions={printOptions}
        />
      </div>
      
      {/* Print styles - keep in the main component for now */}
      <style>
        {`
          @media print {
            @page {
              size: ${printOptions.orientation === "landscape" ? "landscape" : "portrait"};
              margin: 15mm;
            }
            
            body {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            table {
              border-collapse: collapse;
              width: 100%;
            }
            
            table, th, td {
              border: 1px solid #ddd !important;
            }
            
            th, td {
              padding: 8px;
              text-align: left;
            }
            
            .no-print {
              display: none !important;
            }
            
            /* Make sure all non-printing content is hidden */
            body * {
              visibility: hidden;
            }
            
            .print-container, .print-container * {
              visibility: visible !important;
            }
            
            .print-container {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ViewManifestTab;

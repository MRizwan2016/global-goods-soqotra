import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PrintOptions, QatarContainer } from "../../../types/containerTypes";
import { ArrowLeft } from "lucide-react";
import ContainerHeader from "./ContainerHeader";
import ActionBar from "./ActionBar";
import ContainerDetails from "./ContainerDetails";
import ContentTabs from "./ContentTabs";

interface ViewContainerManifestProps {
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

const ViewManifestTab: React.FC<ViewContainerManifestProps> = ({
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
  const [activeTab, setActiveTab] = useState("container-details");
  const [isPrinting, setIsPrinting] = useState(false);
  
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
        
        <ActionBar 
          printOptions={printOptions}
          onPrintOptionsChange={onPrintOptionsChange}
          onPrintClick={handlePrintClick}
          isPrinting={isPrinting}
        />
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

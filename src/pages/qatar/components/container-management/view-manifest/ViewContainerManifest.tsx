
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { QatarContainer, ContainerCargo, ItemListEntry, ConsigneeListItem, UnsettledInvoice, PrintOptions } from "../../../types/containerTypes";
import PrintContainerManifest from "../../print/container/PrintContainerManifest";
import PrintStyles from "../../print/PrintStyles";
import { ContainerHeader } from './index';
import { ContainerDetails } from './index';
import { ContentTabs } from './index';
import { ActionBar } from './index';
import { toast } from "sonner";

interface ViewContainerManifestProps {
  container: QatarContainer;
  cargoItems: ContainerCargo[];
  itemList: ItemListEntry[];
  consigneeList: ConsigneeListItem[];
  unsettledInvoices: UnsettledInvoice[];
  onBack: () => void;
  printOptions: PrintOptions;
  onPrintOptionsChange: (options: Partial<PrintOptions>) => void;
  onPrint: () => void;
}

const ViewContainerManifest: React.FC<ViewContainerManifestProps> = ({
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
  const [isPrinting, setIsPrinting] = useState(false);
  const [showPrintView, setShowPrintView] = useState(false);
  const [activeTab, setActiveTab] = useState("cargo-items");
  
  const totalVolume = cargoItems.reduce((sum, item) => sum + Number(item.volume), 0);
  const totalWeight = cargoItems.reduce((sum, item) => sum + Number(item.weight), 0);
  const totalPackages = cargoItems.reduce((sum, item) => sum + 1, 0);
  
  useEffect(() => {
    return () => {
      document.body.classList.remove('print-only-manifest');
    };
  }, []);
  
  const handlePrintClick = () => {
    console.log("Print button clicked in ViewContainerManifest");
    setIsPrinting(true);
    setShowPrintView(true);
    
    document.body.classList.add('print-only-manifest');
    
    // Add a toast notification
    toast.info("Preparing to print manifest...");
    
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      
      console.log('Preparing to print manifest for container:', container.containerNumber);
      
      setTimeout(() => {
        console.log('Triggering print dialog');
        window.print();
        
        setTimeout(() => {
          setIsPrinting(false);
          toast.success("Print dialog opened");
        }, 1000);
      }, 300);
    }, 500);
  };

  return (
    <div className="p-6">
      {showPrintView && (
        <div className="print-only" id="view-manifest-print-container">
          <PrintContainerManifest 
            container={container}
            cargoItems={cargoItems}
            itemList={itemList}
            consigneeList={consigneeList}
            unsettledInvoices={unsettledInvoices}
            totalVolume={totalVolume}
            totalWeight={totalWeight}
            totalPackages={totalPackages}
            confirmDate={container.confirmDate || new Date().toLocaleDateString()}
            printOptions={printOptions}
          />
        </div>
      )}
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onBack} className="no-print">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Container List
          </Button>
          <ContainerHeader container={container} />
        </div>
        <ActionBar 
          printOptions={printOptions} 
          onPrintOptionsChange={onPrintOptionsChange} 
          onPrintClick={handlePrintClick} 
          isPrinting={isPrinting} 
        />
      </div>

      <ContainerDetails container={container} />
      <ContentTabs 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        cargoItems={cargoItems}
        itemList={itemList}
        consigneeList={consigneeList}
        unsettledInvoices={unsettledInvoices}
        printOptions={printOptions}
      />
      
      <PrintStyles orientation={printOptions.orientation} />
    </div>
  );
};

export default ViewContainerManifest;

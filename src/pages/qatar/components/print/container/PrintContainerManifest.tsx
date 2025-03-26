
import React, { useEffect } from "react";
import { QatarContainer, ContainerCargo, ItemListEntry, ConsigneeListItem, PrintOptions, UnsettledInvoice } from "../../../types/containerTypes";
import PrintStyles from "../PrintStyles";
import { 
  PrintContainerHeader,
  CargoItemsSection,
  ItemListSection,
  ConsigneeListSection,
  UnsettledInvoicesSection 
} from "./components";
import { formatCurrency } from "./utils/formatters";

interface PrintContainerManifestProps {
  container: QatarContainer;
  cargoItems: ContainerCargo[];
  itemList: ItemListEntry[];
  consigneeList: ConsigneeListItem[];
  totalVolume: number;
  totalWeight: number;
  totalPackages: number;
  confirmDate: string;
  printOptions: PrintOptions;
  unsettledInvoices?: UnsettledInvoice[];
}

const PrintContainerManifest: React.FC<PrintContainerManifestProps> = ({ 
  container,
  cargoItems,
  itemList,
  consigneeList,
  totalVolume,
  totalWeight,
  totalPackages,
  confirmDate,
  printOptions,
  unsettledInvoices = []
}) => {
  const formatVolume = (volume: number) => volume.toFixed(3);
  const formatWeight = (weight: number) => weight.toFixed(2);
  
  // When the component mounts, add a class to the body for printing purposes
  useEffect(() => {
    // Add a class to the body to apply print styles
    document.body.classList.add('print-only-manifest');
    
    // Make sure DOM has time to update before any potential printing
    const timer = setTimeout(() => {
      // Trigger a window resize event to ensure all content is properly laid out
      window.dispatchEvent(new Event('resize'));
    }, 500);
    
    return () => {
      // Clean up when component unmounts
      clearTimeout(timer);
      document.body.classList.remove('print-only-manifest');
    };
  }, []);
  
  // Function to determine if a section should be shown
  const shouldShowSection = (section: "cargo" | "items" | "consignees" | "invoices") => {
    return printOptions.section === "all" || printOptions.section === section;
  };
  
  return (
    <div className={`print-container ${printOptions.orientation === "landscape" ? "landscape" : "portrait"}`}>
      <PrintStyles orientation={printOptions.orientation} />
      
      <div className="print-manifest">
        <PrintContainerHeader 
          containerNumber={container.containerNumber}
          containerType={container.containerType}
          sealNumber={container.sealNumber}
          confirmDate={confirmDate}
          totalPackages={totalPackages}
          totalVolume={totalVolume}
          totalWeight={totalWeight}
          formatVolume={formatVolume}
          formatWeight={formatWeight}
        />
        
        {shouldShowSection("cargo") && (
          <CargoItemsSection 
            cargoItems={cargoItems}
            formatVolume={formatVolume}
            formatWeight={formatWeight}
          />
        )}
        
        {shouldShowSection("items") && (
          <ItemListSection 
            itemList={itemList}
            formatVolume={formatVolume}
          />
        )}
        
        {shouldShowSection("consignees") && (
          <ConsigneeListSection 
            consigneeList={consigneeList}
            formatVolume={formatVolume}
          />
        )}
        
        {shouldShowSection("invoices") && unsettledInvoices && unsettledInvoices.length > 0 && (
          <UnsettledInvoicesSection
            unsettledInvoices={unsettledInvoices}
            formatCurrency={formatCurrency}
          />
        )}
      </div>
    </div>
  );
};

export default PrintContainerManifest;

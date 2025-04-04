
import React, { useEffect, useRef } from "react";
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
  const printRef = useRef<HTMLDivElement>(null);
  
  // Safe formatters that handle non-numeric values
  const formatVolume = (volume: number | string) => {
    const numValue = typeof volume === 'string' ? parseFloat(volume) : volume;
    return !isNaN(numValue) ? numValue.toFixed(3) : "0.000";
  };
  
  const formatWeight = (weight: number | string) => {
    const numValue = typeof weight === 'string' ? parseFloat(weight) : weight;
    return !isNaN(numValue) ? numValue.toFixed(2) : "0.00";
  };
  
  // When the component mounts, make sure it's visible for printing
  useEffect(() => {
    // Force layout recalculation to ensure the content is properly rendered
    window.dispatchEvent(new Event('resize'));
    
    console.log('PrintContainerManifest mounted with container:', container.containerNumber);
    console.log('Print options:', printOptions);
    console.log('Cargo items count:', cargoItems.length);
    
    // Return cleanup function
    return () => {
      // Nothing to clean up
    };
  }, [container, printOptions, cargoItems.length]);
  
  // Function to determine if a section should be shown
  const shouldShowSection = (section: "cargo" | "items" | "consignees" | "invoices") => {
    return printOptions.section === "all" || printOptions.section === section;
  };
  
  return (
    <div 
      ref={printRef}
      className={`print-manifest w-full ${printOptions.orientation === "landscape" ? "landscape" : "portrait"}`}
      id="print-container-manifest"
    >
      <PrintStyles orientation={printOptions.orientation} />
      
      <div className="print-content">
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
        
        {/* Footer with timestamp */}
        <div className="print-footer mt-8 text-sm text-gray-500 text-center">
          <p>Printed on: {new Date().toLocaleString()}</p>
          <p>SOQOTRA Shipping & Logistics</p>
        </div>
      </div>
    </div>
  );
};

export default PrintContainerManifest;

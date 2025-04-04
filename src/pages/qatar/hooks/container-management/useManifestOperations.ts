
import { useState } from "react";
import { QatarContainer, PrintOptions, ContainerCargo, ItemListEntry, ConsigneeListItem, UnsettledInvoice } from "../../types/containerTypes";
import { toast } from "sonner";

export const useManifestOperations = (
  containers: QatarContainer[], 
  setContainers: React.Dispatch<React.SetStateAction<QatarContainer[]>>,
  saveContainersToLocalStorage: () => void,
  getCurrentCargoItems: (containerId: string | null) => ContainerCargo[]
) => {
  const [viewManifestId, setViewManifestId] = useState<string | null>(null);
  const [printOptions, setPrintOptions] = useState<PrintOptions>({
    section: "all",
    orientation: "portrait"
  });

  const handleViewManifest = (containerId: string) => {
    setViewManifestId(containerId);
  };

  const handleManifestSubmitted = (data: any) => {
    const updatedContainers = containers.map(container => {
      if (container.id === data.containerId) {
        return {
          ...container,
          status: "CONFIRMED",
          confirmDate: data.confirmDate
        };
      }
      return container;
    });
    
    setContainers(updatedContainers);
    saveContainersToLocalStorage();
    
    toast.success("Container manifest updated successfully");
  };

  const handlePrintOptionsChange = (options: Partial<PrintOptions>) => {
    setPrintOptions(prev => ({
      ...prev,
      ...options
    }));
  };

  const handlePrint = () => {
    // Handle printing logic here
    window.print();
  };
  
  // Helper function to generate ItemList from cargo items
  const getItemList = (containerId: string | null): ItemListEntry[] => {
    if (!containerId) return [];
    
    const cargoItems = getCurrentCargoItems(containerId);
    
    return cargoItems.reduce((acc: ItemListEntry[], item) => {
      // Check if this invoice is already in the list
      const existingIndex = acc.findIndex(entry => entry.invoice === item.invoiceNumber);
      
      if (existingIndex >= 0) {
        // Add to existing invoice
        acc[existingIndex].packages += 1;
        acc[existingIndex].volume += item.volume;
      } else {
        // Create new invoice entry
        acc.push({
          id: item.id,
          invoice: item.invoiceNumber,
          shipper: item.shipper,
          consignee: item.consignee,
          packages: 1,
          volume: item.volume,
          packageName: item.packageName
        });
      }
      
      return acc;
    }, []);
  };
  
  // Helper function to generate ConsigneeList from cargo items
  const getConsigneeList = (containerId: string | null): ConsigneeListItem[] => {
    if (!containerId) return [];
    
    const cargoItems = getCurrentCargoItems(containerId);
    
    return cargoItems.reduce((acc: ConsigneeListItem[], item) => {
      // Check if this consignee is already in the list
      const existingIndex = acc.findIndex(
        entry => entry.consignee === item.consignee && entry.invoice === item.invoiceNumber
      );
      
      if (existingIndex >= 0) {
        // Add to existing consignee
        acc[existingIndex].volume += item.volume;
      } else {
        // Create new consignee entry with contact info
        acc.push({
          id: item.id,
          invoice: item.invoiceNumber,
          shipper: item.shipper,
          shipperContact: "Mobile: +974 " + Math.floor(10000000 + Math.random() * 90000000),
          consignee: item.consignee,
          consigneeContact: "Mobile: +94 " + Math.floor(700000000 + Math.random() * 90000000),
          volume: item.volume
        });
      }
      
      return acc;
    }, []);
  };
  
  // Helper function to generate UnsettledInvoices from cargo items
  const getUnsettledInvoices = (containerId: string | null): UnsettledInvoice[] => {
    if (!containerId) return [];
    
    const cargoItems = getCurrentCargoItems(containerId);
    
    return cargoItems.reduce((acc: UnsettledInvoice[], item) => {
      // Check if this invoice is already in the list
      const existingIndex = acc.findIndex(entry => 
        entry.invoiceNumber === item.invoiceNumber && 
        entry.shipper === item.shipper &&
        entry.consignee === item.consignee
      );
      
      if (existingIndex === -1) {
        // Create new invoice entry
        acc.push({
          id: item.id,
          invoiceNumber: item.invoiceNumber,
          shipper: item.shipper,
          consignee: item.consignee,
          amount: Math.floor(5000 + Math.random() * 10000) / 100,
          paid: Math.random() > 0.3 // 70% chance to be paid
        });
      }
      
      return acc;
    }, []);
  };

  return {
    viewManifestId,
    setViewManifestId,
    printOptions,
    handleViewManifest,
    handleManifestSubmitted,
    handlePrintOptionsChange,
    handlePrint,
    getItemList,
    getConsigneeList,
    getUnsettledInvoices
  };
};

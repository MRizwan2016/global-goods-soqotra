
import { useState, useEffect } from "react";
import { ItemListEntry, ContainerCargo, ConsigneeListItem, UnsettledInvoice, PrintOptions, QatarContainer } from "../../types/containerTypes";
import { toast } from "sonner";

export const useManifestOperations = (
  containers: QatarContainer[],
  setContainers: React.Dispatch<React.SetStateAction<QatarContainer[]>>,
  saveContainersToLocalStorage: (containers: QatarContainer[]) => void
) => {
  const [viewManifestId, setViewManifestId] = useState<string | null>(null);
  const [printOptions, setPrintOptions] = useState<PrintOptions>({
    section: "all",
    orientation: "portrait"
  });

  // Add event listener for manifest view
  useEffect(() => {
    const handleViewManifest = (event: CustomEvent) => {
      if (event.detail && event.detail.containerId) {
        setViewManifestId(event.detail.containerId);
      }
    };
    
    // Listen for both event types (for backward compatibility)
    document.addEventListener('viewManifest', handleViewManifest as EventListener);
    document.addEventListener('viewContainerManifest', handleViewManifest as EventListener);
    
    return () => {
      document.removeEventListener('viewManifest', handleViewManifest as EventListener);
      document.removeEventListener('viewContainerManifest', handleViewManifest as EventListener);
    };
  }, []);

  const handleManifestSubmitted = (editContainerId: string | null) => {
    // Update container status to "CONFIRMED"
    if (editContainerId) {
      const updatedContainers = containers.map(container => 
        container.id === editContainerId ? 
          { ...container, status: "CONFIRMED", confirmDate: new Date().toISOString().split('T')[0] } : 
          container
      );
      
      setContainers(updatedContainers);
      saveContainersToLocalStorage(updatedContainers);
    }
    
    // Show success message with view manifest option
    toast.success("Container manifest submitted successfully", {
      description: "The cargo manifest has been confirmed",
      position: "top-center",
      className: "animate-slide-in-right",
      action: {
        label: "View Manifest",
        onClick: () => {
          // Create and dispatch a custom event
          const event = new CustomEvent('viewContainerManifest', { 
            detail: { containerId: editContainerId } 
          });
          document.dispatchEvent(event);
        }
      }
    });
  };

  const handleViewManifest = (containerId: string) => {
    setViewManifestId(containerId);
  };

  const handlePrintOptionsChange = (options: Partial<PrintOptions>) => {
    setPrintOptions(prev => ({ ...prev, ...options }));
  };

  const handlePrint = () => {
    window.print();
  };

  // Process cargo items into ItemListEntry format
  const getItemList = (cargoItems: ContainerCargo[]): ItemListEntry[] => {
    return cargoItems.reduce((acc: ItemListEntry[], item) => {
      const existingIndex = acc.findIndex(entry => entry.invoice === item.invoiceNumber);
      if (existingIndex >= 0) {
        acc[existingIndex].packages += 1;
        acc[existingIndex].volume += item.volume;
      } else {
        acc.push({
          id: item.id,
          invoice: item.invoiceNumber,
          shipper: item.shipper.toUpperCase(),
          consignee: item.consignee.toUpperCase(),
          packages: 1,
          volume: item.volume,
          packageName: item.packageName.toUpperCase(),
          quantity: 1
        });
      }
      return acc;
    }, []);
  };

  // Process cargo items into ConsigneeListItem format
  const getConsigneeList = (cargoItems: ContainerCargo[]): ConsigneeListItem[] => {
    return cargoItems.reduce((acc: ConsigneeListItem[], item) => {
      const existingIndex = acc.findIndex(
        entry => entry.consignee === item.consignee.toUpperCase() && entry.invoice === item.invoiceNumber
      );
      if (existingIndex >= 0) {
        acc[existingIndex].volume += item.volume;
      } else {
        acc.push({
          id: item.id,
          invoice: item.invoiceNumber,
          shipper: item.shipper.toUpperCase(),
          shipperContact: "MOBILE: +974 " + Math.floor(10000000 + Math.random() * 90000000),
          consignee: item.consignee.toUpperCase(),
          consigneeContact: "MOBILE: +94 " + Math.floor(700000000 + Math.random() * 90000000),
          volume: item.volume
        });
      }
      return acc;
    }, []);
  };

  // Generate unsettled invoices from cargo items
  const getUnsettledInvoices = (cargoItems: ContainerCargo[]): UnsettledInvoice[] => {
    return cargoItems.reduce((acc: UnsettledInvoice[], item) => {
      const existingIndex = acc.findIndex(entry => 
        entry.invoiceNumber === item.invoiceNumber && 
        entry.shipper === item.shipper.toUpperCase() &&
        entry.consignee === item.consignee.toUpperCase()
      );
      
      if (existingIndex === -1) {
        acc.push({
          id: item.id,
          invoiceNumber: item.invoiceNumber,
          shipper: item.shipper.toUpperCase(),
          consignee: item.consignee.toUpperCase(),
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
    handleManifestSubmitted,
    handleViewManifest,
    handlePrintOptionsChange,
    handlePrint,
    getItemList,
    getConsigneeList,
    getUnsettledInvoices
  };
};

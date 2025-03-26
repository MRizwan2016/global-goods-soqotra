
import { useState, useEffect } from "react";
import { QatarContainer, ContainerCargo, ItemListEntry, ConsigneeListItem, UnsettledInvoice, PrintOptions } from "../types/containerTypes";
import { toast } from "sonner";
import mockContainers, { mockCargoItems } from "../data/mockContainers";

export const useContainerManagement = () => {
  const [containers, setContainers] = useState<QatarContainer[]>(mockContainers);
  const [activeTab, setActiveTab] = useState("containers");
  const [editContainerId, setEditContainerId] = useState<string | null>(null);
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
        setActiveTab("view-manifest");
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

  const handleAddContainer = (newContainer: QatarContainer) => {
    setContainers([...containers, newContainer]);
    setActiveTab("containers");
    toast.success("CONTAINER ADDED SUCCESSFULLY");
  };

  const handleEditContainer = (containerId: string) => {
    setEditContainerId(containerId);
    setActiveTab("edit");
  };

  const handleUpdateContainer = (updatedContainer: QatarContainer) => {
    const updatedContainers = containers.map(container => 
      container.id === updatedContainer.id ? updatedContainer : container
    );
    setContainers(updatedContainers);
    setActiveTab("containers");
    setEditContainerId(null);
    toast.success("CONTAINER UPDATED SUCCESSFULLY");
  };

  const handleCancelEdit = () => {
    setActiveTab("containers");
    setEditContainerId(null);
  };

  const handleLoadContainer = (containerId: string) => {
    setEditContainerId(containerId);
    setActiveTab("load");
  };

  const handleManifestContainer = (containerId: string) => {
    setEditContainerId(containerId);
    setActiveTab("manifest");
  };

  const handleViewManifest = (containerId: string) => {
    setViewManifestId(containerId);
    setActiveTab("view-manifest");
  };

  const handleManifestSubmitted = () => {
    // Update container status to "LOADED" or similar
    const updatedContainers = containers.map(container => 
      container.id === editContainerId ? { ...container, status: "CONFIRMED" } : container
    );
    setContainers(updatedContainers);
    setActiveTab("containers");
    
    // Show success message with view manifest option
    toast.success("CONTAINER MANIFEST SUBMITTED SUCCESSFULLY", {
      action: {
        label: "VIEW MANIFEST",
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

  const getCurrentContainer = () => {
    return containers.find(container => container.id === (editContainerId || viewManifestId)) || null;
  };

  const handlePrintOptionsChange = (options: Partial<PrintOptions>) => {
    setPrintOptions(prev => ({ ...prev, ...options }));
  };

  const handlePrint = () => {
    window.print();
  };

  // Get cargo items for the current container - check both ID and running number
  const getCurrentCargoItems = () => {
    const containerId = viewManifestId || editContainerId;
    if (!containerId) return [];
    
    const container = containers.find(c => c.id === containerId);
    if (!container) return [];
    
    return mockCargoItems.filter(item => 
      item.containerId === containerId || 
      (container.runningNumber && item.containerId === container.runningNumber.toString())
    );
  };

  // Process cargo items into ItemListEntry format
  const getItemList = (): ItemListEntry[] => {
    return getCurrentCargoItems().reduce((acc: ItemListEntry[], item) => {
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
  const getConsigneeList = (): ConsigneeListItem[] => {
    return getCurrentCargoItems().reduce((acc: ConsigneeListItem[], item) => {
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
  const getUnsettledInvoices = (): UnsettledInvoice[] => {
    return getCurrentCargoItems().reduce((acc: UnsettledInvoice[], item) => {
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
    containers,
    activeTab,
    setActiveTab,
    editContainerId,
    viewManifestId,
    printOptions,
    handleAddContainer,
    handleEditContainer,
    handleUpdateContainer,
    handleCancelEdit,
    handleLoadContainer,
    handleManifestContainer,
    handleViewManifest,
    handleManifestSubmitted,
    getCurrentContainer,
    handlePrintOptionsChange,
    handlePrint,
    getCurrentCargoItems,
    getItemList,
    getConsigneeList,
    getUnsettledInvoices
  };
};

export default useContainerManagement;

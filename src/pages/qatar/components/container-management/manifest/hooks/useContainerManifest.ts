
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { 
  QatarContainer,
  ContainerCargo,
  ItemListEntry,
  ConsigneeListItem, 
  UnsettledInvoice 
} from "../../../../types/containerTypes";
import { mockCargoItems, mockContainers, mockItemList, mockConsigneeList, mockUnsettledInvoices } from "../../../../data/mockContainers";

const useContainerManifest = (containerId: string, onManifestSubmitted: () => void) => {
  const [container, setContainer] = useState<QatarContainer | null>(null);
  const [cargoItems, setCargoItems] = useState<ContainerCargo[]>([]);
  const [confirmDate, setConfirmDate] = useState("");
  const [vgmWeight, setVgmWeight] = useState("");
  const [activeTab, setActiveTab] = useState("cargo");
  
  // Get mock data for display
  const itemList = mockItemList;
  const consigneeList = mockConsigneeList;
  const unsettledInvoices = mockUnsettledInvoices;
  
  // Load container data
  useEffect(() => {
    const foundContainer = mockContainers.find(c => c.id === containerId);
    if (foundContainer) {
      setContainer(foundContainer);
      setVgmWeight(foundContainer.weight?.toString() || "0");
    }
    
    // Get cargo items for this container
    const containerCargoItems = mockCargoItems.filter(item => item.containerId === containerId);
    setCargoItems(containerCargoItems);
    
    // Set confirm date to today
    setConfirmDate(new Date().toLocaleDateString("en-GB", {day: "2-digit", month: "2-digit", year: "numeric"}));
  }, [containerId]);
  
  const handleConfirm = () => {
    if (!confirmDate) {
      toast.error("Please enter a confirmation date");
      return;
    }
    
    // Update container status
    if (container) {
      container.status = "CONFIRMED";
      // In a real app, we would save to the backend
    }
    
    // Notify parent
    onManifestSubmitted();
    
    toast.success("Container manifest confirmed successfully");
  };
  
  const formatVolume = (volume: number) => volume.toFixed(3);
  const formatWeight = (weight: number) => weight.toFixed(2);
  
  // Calculate totals
  const totalVolume = cargoItems.reduce((sum, item) => sum + item.volume, 0);
  const totalWeight = cargoItems.reduce((sum, item) => sum + item.weight, 0);
  const totalPackages = cargoItems.length;

  return {
    container,
    cargoItems,
    confirmDate,
    setConfirmDate,
    vgmWeight,
    setVgmWeight,
    activeTab,
    setActiveTab,
    totalPackages,
    totalVolume,
    totalWeight,
    itemList,
    consigneeList,
    unsettledInvoices,
    formatVolume,
    formatWeight,
    handleConfirm
  };
};

export default useContainerManifest;

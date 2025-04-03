
import { useEffect } from "react";
import { useContainerData } from "./container-management/useContainerData";
import { useCargoOperations } from "./container-management/useCargoOperations";
import { useManifestOperations } from "./container-management/useManifestOperations";
import { useTabManagement } from "./container-management/useTabManagement";
import { QatarContainer } from "../types/containerTypes";

export const useContainerManagement = () => {
  // Container data management
  const {
    containers,
    setContainers,
    isLoading,
    editContainerId,
    setEditContainerId,
    handleAddContainer,
    handleEditContainer,
    handleUpdateContainer,
    getCurrentContainer,
    saveContainersToLocalStorage
  } = useContainerData();

  // Cargo operations management
  const {
    cargoItems,
    handleAddCargo,
    getCurrentCargoItems,
    saveCargoItemsToLocalStorage
  } = useCargoOperations(containers, setContainers, saveContainersToLocalStorage);

  // Manifest operations management
  const {
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
  } = useManifestOperations(containers, setContainers, saveContainersToLocalStorage);

  // Tab management
  const {
    activeTab,
    setActiveTab,
    handleCancelEdit,
    handleLoadContainer,
    handleManifestContainer
  } = useTabManagement();

  // Listen for manifest view events
  useEffect(() => {
    const handleViewManifestEvent = (event: CustomEvent) => {
      if (event.detail && event.detail.containerId) {
        // Set the view manifest ID
        console.log("Handling view manifest event for container:", event.detail.containerId);
        handleViewManifest(event.detail.containerId);
        setActiveTab("view-manifest");
      }
    };
    
    document.addEventListener('viewContainerManifest', handleViewManifestEvent as EventListener);
    
    return () => {
      document.removeEventListener('viewContainerManifest', handleViewManifestEvent as EventListener);
    };
  }, [handleViewManifest, setActiveTab]);

  return {
    // Container data
    containers,
    isLoading,
    
    // Tab management
    activeTab,
    setActiveTab,
    
    // Container editing
    editContainerId,
    viewManifestId,
    
    // Print options
    printOptions,
    
    // Container operations
    handleAddContainer,
    handleEditContainer,
    handleUpdateContainer,
    handleCancelEdit,
    
    // Cargo operations
    handleAddCargo,
    
    // Manifest operations
    handleLoadContainer,
    handleManifestContainer,
    handleViewManifest,
    handleManifestSubmitted,
    
    // Utility functions
    getCurrentContainer,
    getCurrentCargoItems,
    handlePrintOptionsChange,
    handlePrint,
    getItemList,
    getConsigneeList,
    getUnsettledInvoices
  };
};

export default useContainerManagement;

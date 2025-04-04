
import { useEffect } from "react";
import { useContainerData } from "./container-management/useContainerData";
import { useCargoOperations } from "./container-management/useCargoOperations";
import { useManifestOperations } from "./container-management/useManifestOperations";
import { useTabManagement } from "./container-management/useTabManagement";
import { QatarContainer, ContainerCargo, ItemListEntry, ConsigneeListItem, UnsettledInvoice } from "../types/containerTypes";
import { toast } from "sonner";

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

  // Cargo operations management - Update the function signature to match expected types
  const {
    cargoItems,
    handleAddCargo,
    getCurrentCargoItems,
    saveCargoItemsToLocalStorage
  } = useCargoOperations(
    containers, 
    setContainers, 
    () => saveContainersToLocalStorage() // Wrap in anonymous function to match expected signature
  );

  // Manifest operations management - Update the function signature to match expected types
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
  } = useManifestOperations(
    containers, 
    setContainers, 
    () => saveContainersToLocalStorage(), // Wrap in anonymous function to match expected signature
    getCurrentCargoItems
  );

  // Tab management
  const {
    activeTab,
    setActiveTab,
    handleCancelEdit,
    handleLoadContainer,
    handleManifestContainer
  } = useTabManagement(setEditContainerId);

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

  // Enhanced handleEditContainer to ensure tab switching works
  const handleEditContainerWithTabSwitch = (id: string) => {
    console.log("Editing container with ID:", id);
    handleEditContainer(id);
    setActiveTab("edit");
    toast.info("Editing container", {
      description: "Container details are now ready for editing",
    });
  };

  // Enhanced handleLoadContainer to ensure tab switching works
  const handleLoadContainerWithTabSwitch = (id: string) => {
    console.log("Loading container with ID:", id);
    handleEditContainer(id); // Set the edit container ID
    setActiveTab("load");
    toast.info("Loading container", {
      description: "You can now load cargo into this container",
    });
  };

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
    handleEditContainer: handleEditContainerWithTabSwitch,
    handleUpdateContainer,
    handleCancelEdit,
    
    // Cargo operations
    handleAddCargo,
    
    // Manifest operations
    handleLoadContainer: handleLoadContainerWithTabSwitch,
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

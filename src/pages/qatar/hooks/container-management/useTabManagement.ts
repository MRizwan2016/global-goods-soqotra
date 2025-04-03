
import { useState } from "react";
import { toast } from "sonner";

export const useTabManagement = (setEditContainerId?: (id: string | null) => void) => {
  const [activeTab, setActiveTab] = useState("containers");
  
  // Handle canceling edit operations and return to container list
  const handleCancelEdit = () => {
    // Clear the edit container ID if we have a setter
    if (setEditContainerId) {
      setEditContainerId(null);
    }
    
    // Return to the containers tab
    setActiveTab("containers");
    
    toast.info("Operation canceled", {
      description: "You've returned to the container list",
    });
  };
  
  // Handle container loading
  const handleLoadContainer = (containerId: string) => {
    console.log("Loading container with ID:", containerId);
    
    // Set the edit container ID if we have a setter
    if (setEditContainerId) {
      setEditContainerId(containerId);
    }
    
    // Switch to load tab
    setActiveTab("load");
    
    toast.info("Loading container", {
      description: "You can now load cargo into this container",
    });
  };
  
  // Handle manifest container
  const handleManifestContainer = (containerId: string) => {
    console.log("Manifest container with ID:", containerId);
    
    // Set the edit container ID if we have a setter
    if (setEditContainerId) {
      setEditContainerId(containerId);
    }
    
    // Switch to manifest tab
    setActiveTab("manifest");
    
    toast.info("Creating manifest", {
      description: "You can now create a manifest for this container",
    });
  };
  
  return {
    activeTab,
    setActiveTab,
    handleCancelEdit,
    handleLoadContainer,
    handleManifestContainer
  };
};

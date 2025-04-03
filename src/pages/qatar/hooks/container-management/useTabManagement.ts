
import { useState, useEffect } from "react";

export const useTabManagement = () => {
  const [activeTab, setActiveTab] = useState("containers");

  // Listen for tab change events from other components
  useEffect(() => {
    const handleTabChange = (event: CustomEvent) => {
      if (event.detail && event.detail.tab) {
        setActiveTab(event.detail.tab);
        console.log("Tab changed via custom event to:", event.detail.tab);
      }
    };
    
    document.addEventListener('changeContainerTab', handleTabChange as EventListener);
    
    return () => {
      document.removeEventListener('changeContainerTab', handleTabChange as EventListener);
    };
  }, []);

  const handleCancelEdit = () => {
    setActiveTab("containers");
  };

  const handleLoadContainer = (containerId: string) => {
    setActiveTab("load");
  };

  const handleManifestContainer = (containerId: string) => {
    setActiveTab("manifest");
  };

  return {
    activeTab,
    setActiveTab,
    handleCancelEdit,
    handleLoadContainer,
    handleManifestContainer
  };
};

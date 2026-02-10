
import React, { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useContainerManagement } from "./hooks/useContainerManagement";
import { motion } from "framer-motion";

// Import refactored components
import PrintStyles from "./components/container-management/PrintStyles";
import ContainerHeader from "./components/container-management/ContainerHeader";
import ContainerManagementContent from "./components/container-management/ContainerManagementContent";
import { QatarContainer } from "./types/containerTypes";
import PageBreadcrumb from "@/components/ui/page-breadcrumb";

const ContainerManagement: React.FC = () => {
  const {
    containers,
    activeTab,
    setActiveTab,
    editContainerId,
    viewManifestId,
    printOptions,
    isLoading,
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
  } = useContainerManagement();

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
  }, [setActiveTab]);

  // Listen for manifest view events
  useEffect(() => {
    const handleViewManifestEvent = (event: CustomEvent) => {
      if (event.detail && event.detail.containerId) {
        // Set the view manifest ID
        console.log("Handling view manifest event for container:", event.detail.containerId);
        handleViewManifest(event.detail.containerId);
      }
    };
    
    document.addEventListener('viewContainerManifest', handleViewManifestEvent as EventListener);
    
    return () => {
      document.removeEventListener('viewContainerManifest', handleViewManifestEvent as EventListener);
    };
  }, [handleViewManifest]);

  const handleContainerPrint = () => {
    // Add print mode class to body
    document.body.classList.add('print-only-manifest');
    
    // Print
    window.print();
    
    // Remove class after printing
    setTimeout(() => {
      document.body.classList.remove('print-only-manifest');
    }, 500);
  };

  // Function to handle adding a new container
  const handleAddNewContainer = (container: QatarContainer) => {
    handleAddContainer(container);
    setActiveTab("containers");
  };

  // Log initial load for debugging
  useEffect(() => {
    console.log("ContainerManagement component loading");
    console.log("Initial activeTab:", activeTab);
    console.log("Initial containers:", containers);
    console.log("Initial printOptions:", printOptions);
  }, []);

  // Additional logging for debugging the activeTab changes
  useEffect(() => {
    console.log("Active tab changed to:", activeTab);
  }, [activeTab]);

  // Log when containers change
  useEffect(() => {
    console.log("Containers updated:", containers);
  }, [containers]);

  return (
    <Layout title="CONTAINER MANAGEMENT">
      <PageBreadcrumb className="mb-4" />
      {/* Add global styles for printing */}
      <PrintStyles />
      
      <motion.div 
        className="container mx-auto py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <ContainerHeader />
      
        <ContainerManagementContent 
          isLoading={isLoading}
          containers={containers}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          editContainerId={editContainerId}
          viewManifestId={viewManifestId}
          printOptions={printOptions}
          getCurrentContainer={getCurrentContainer}
          getCurrentCargoItems={getCurrentCargoItems}
          getItemList={getItemList}
          getConsigneeList={getConsigneeList}
          getUnsettledInvoices={getUnsettledInvoices}
          onEditContainer={handleEditContainer}
          onLoadContainer={handleLoadContainer}
          onViewManifest={handleViewManifest}
          onCreateManifest={handleManifestContainer}
          onUpdateContainer={handleUpdateContainer}
          onCancelEdit={handleCancelEdit}
          onLoadComplete={handleManifestContainer}
          onManifestSubmitted={handleManifestSubmitted}
          onPrintOptionsChange={handlePrintOptionsChange}
          onPrint={handleContainerPrint}
          onAddContainer={handleAddNewContainer}
        />
      </motion.div>
    </Layout>
  );
};

export default ContainerManagement;

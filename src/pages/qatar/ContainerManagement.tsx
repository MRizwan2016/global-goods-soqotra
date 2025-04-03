
import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import Layout from "@/components/layout/Layout";
import { useContainerManagement } from "./hooks/useContainerManagement";
import TabsHeader from "./components/container-management/TabsHeader";
import TabContent from "./components/container-management/TabContent";
import LoadingState from "./components/shared/LoadingState";
import { motion } from "framer-motion";

// Add some global styles for print mode
const globalStyles = `
  @media print {
    body.print-only-manifest {
      background-color: white !important;
    }
    
    body.print-only-manifest nav,
    body.print-only-manifest header,
    body.print-only-manifest footer,
    body.print-only-manifest .no-print {
      display: none !important;
    }
    
    body.print-only-manifest .print-container {
      margin: 0 !important;
      padding: 0 !important;
    }
    
    @page {
      margin: 15mm;
      border: 1px solid #ddd;
    }
    
    .page-break-before {
      page-break-before: always;
    }
    
    table {
      border-collapse: collapse;
      width: 100%;
    }
    
    table, th, td {
      border: 1px solid #ddd !important;
    }
    
    th, td {
      padding: 8px;
      text-align: left;
    }
  }
`;

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
      }
    };
    
    document.addEventListener('changeContainerTab', handleTabChange as EventListener);
    
    return () => {
      document.removeEventListener('changeContainerTab', handleTabChange as EventListener);
    };
  }, [setActiveTab]);

  // Listen for manifest view events
  useEffect(() => {
    const handleViewManifest = (event: CustomEvent) => {
      if (event.detail && event.detail.containerId) {
        // Set the view manifest ID
        handleViewManifest(event.detail.containerId);
      }
    };
    
    document.addEventListener('viewContainerManifest', handleViewManifest as EventListener);
    
    return () => {
      document.removeEventListener('viewContainerManifest', handleViewManifest as EventListener);
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

  return (
    <Layout title="CONTAINER MANAGEMENT">
      {/* Add global styles for printing */}
      <style>{globalStyles}</style>
      
      <motion.div 
        className="container mx-auto py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-100 to-white shadow-md rounded-lg mb-6 p-5"
        >
          <h1 className="text-2xl font-bold text-blue-800 flex items-center">
            <span className="mr-2">📦</span>
            Container Management System
          </h1>
          <p className="text-blue-600 mt-1">Manage containers, cargo loading, and manifests</p>
        </motion.div>
      
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoadingState type="container" text="Loading container management data..." />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="no-print shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsHeader activeTab={activeTab} />
                  
                  <TabContent 
                    activeTab={activeTab}
                    containers={containers}
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
                    onAddContainer={handleAddContainer}
                  />
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </Layout>
  );
};

export default ContainerManagement;


import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import Layout from "@/components/layout/Layout";
import { useContainerManagement } from "./hooks/useContainerManagement";
import TabsHeader from "./components/container-management/TabsHeader";
import TabContent from "./components/container-management/TabContent";

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
      
      <div className="container mx-auto py-6 animate-fade-in">
        <Card className="no-print shadow-md">
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
      </div>
    </Layout>
  );
};

export default ContainerManagement;

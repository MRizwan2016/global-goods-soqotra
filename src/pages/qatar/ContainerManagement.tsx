
import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import Layout from "@/components/layout/Layout";
import { useContainerManagement } from "./hooks/useContainerManagement";
import TabsHeader from "./components/container-management/TabsHeader";
import TabContent from "./components/container-management/TabContent";

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

  return (
    <Layout title="Container Management">
      <div className="container mx-auto py-6">
        <Card>
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
                onPrint={handlePrint}
              />
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ContainerManagement;

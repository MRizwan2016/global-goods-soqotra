
import React from "react";
import { Tabs } from "@/components/ui/tabs";
import TabsHeader from "./TabsHeader";
import TabContent from "./TabContent";
import LoadingSpinner from "../shared/LoadingState";
import { QatarContainer, PrintOptions } from "../../types/containerTypes";

interface ContainerManagementContentProps {
  isLoading: boolean;
  containers: QatarContainer[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  editContainerId: string | null;
  viewManifestId: string | null;
  printOptions: PrintOptions;
  getCurrentContainer: (id?: string | null) => QatarContainer | null;
  getCurrentCargoItems: (containerId: string | null) => any[];
  getItemList: (containerId: string | null) => any[];
  getConsigneeList: (containerId: string | null) => any[];
  getUnsettledInvoices: (containerId: string | null) => any[];
  onEditContainer: (id: string) => void;
  onLoadContainer: (id: string) => void;
  onViewManifest: (id: string) => void;
  onCreateManifest: (id: string) => void;
  onUpdateContainer: (container: QatarContainer) => void;
  onCancelEdit: () => void;
  onLoadComplete: (id: string) => void;
  onManifestSubmitted: (data: any) => void;
  onPrintOptionsChange: (options: Partial<PrintOptions>) => void;
  onPrint: () => void;
  onAddContainer: (container: QatarContainer) => void;
}

const ContainerManagementContent: React.FC<ContainerManagementContentProps> = ({
  isLoading,
  containers,
  activeTab,
  setActiveTab,
  editContainerId,
  viewManifestId,
  printOptions,
  getCurrentContainer,
  getCurrentCargoItems,
  getItemList,
  getConsigneeList,
  getUnsettledInvoices,
  onEditContainer,
  onLoadContainer,
  onViewManifest,
  onCreateManifest,
  onUpdateContainer,
  onCancelEdit,
  onLoadComplete,
  onManifestSubmitted,
  onPrintOptionsChange,
  onPrint,
  onAddContainer
}) => {
  // If loading, show a spinner
  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleTabChange = (value: string) => {
    console.log("Tab changed to:", value);
    setActiveTab(value);
  };

  return (
    <Tabs 
      value={activeTab} 
      onValueChange={handleTabChange}
      className="w-full"
    >
      <TabsHeader activeTab={activeTab} onTabChange={handleTabChange} />
      
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
        onEditContainer={onEditContainer}
        onLoadContainer={onLoadContainer}
        onViewManifest={onViewManifest}
        onCreateManifest={onCreateManifest}
        onUpdateContainer={onUpdateContainer}
        onCancelEdit={onCancelEdit}
        onLoadComplete={onLoadComplete}
        onManifestSubmitted={onManifestSubmitted}
        onPrintOptionsChange={onPrintOptionsChange}
        onPrint={onPrint}
        onAddContainer={onAddContainer}
      />
    </Tabs>
  );
};

export default ContainerManagementContent;

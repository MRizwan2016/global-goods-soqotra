
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { QatarContainer, PrintOptions } from "../../types/containerTypes";
import ContainerList from "./ContainerList";
import ContainerForm from "./ContainerForm";
import LoadContainerDetails from "./LoadContainerDetails";
import ContainerManifest from "./ContainerManifest";
import ViewManifestTab from "../container-management/view-manifest/ViewManifestTab";

interface TabContentProps {
  activeTab: string;
  containers: QatarContainer[];
  editContainerId: string | null;
  viewManifestId: string | null;
  printOptions: PrintOptions;
  getCurrentContainer: () => QatarContainer | null;
  getCurrentCargoItems: () => any[];
  getItemList: () => any[];
  getConsigneeList: () => any[];
  getUnsettledInvoices: () => any[];
  onEditContainer: (id: string) => void;
  onLoadContainer: (id: string) => void;
  onViewManifest: (id: string) => void;
  onCreateManifest: (id: string) => void;
  onUpdateContainer: (container: QatarContainer) => void;
  onCancelEdit: () => void;
  onLoadComplete: (id: string) => void;
  onManifestSubmitted: () => void;
  onPrintOptionsChange: (options: Partial<PrintOptions>) => void;
  onPrint: () => void;
  onAddContainer: (container: QatarContainer) => void;
}

const TabContent: React.FC<TabContentProps> = ({
  activeTab,
  containers,
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
  // Ensure we always have a valid activeTab with correct tabs from the UI
  // This ensures no empty string or undefined values are passed
  const validActiveTab = ["containers", "add", "edit", "load", "manifest", "view-manifest"].includes(activeTab) 
    ? activeTab 
    : "containers";

  return (
    <>
      <TabsContent value="containers" className="m-0">
        <ContainerList 
          containerData={containers}
          onEdit={onEditContainer}
          onLoad={onLoadContainer}
          onCreateManifest={onCreateManifest}
          onViewManifest={onViewManifest}
        />
      </TabsContent>
      
      <TabsContent value="add" className="m-0">
        <ContainerForm 
          onSubmit={onAddContainer}
          onCancel={onCancelEdit}
        />
      </TabsContent>
      
      <TabsContent value="edit" className="m-0">
        {editContainerId && (
          <ContainerForm 
            existingContainer={getCurrentContainer()}
            onSubmit={onUpdateContainer}
            onCancel={onCancelEdit}
          />
        )}
      </TabsContent>
      
      <TabsContent value="load" className="m-0">
        {editContainerId && (
          <LoadContainerDetails
            containerId={editContainerId}
            containerData={getCurrentContainer()}
            onLoadComplete={() => onLoadComplete(editContainerId)}
            onCancel={onCancelEdit}
          />
        )}
      </TabsContent>
      
      <TabsContent value="manifest" className="m-0">
        {editContainerId && (
          <ContainerManifest
            containerId={editContainerId}
            onManifestSubmitted={onManifestSubmitted}
            onCancel={onCancelEdit}
          />
        )}
      </TabsContent>
      
      <TabsContent value="view-manifest" className="m-0">
        {viewManifestId && (
          <ViewManifestTab
            container={getCurrentContainer()}
            cargoItems={getCurrentCargoItems()}
            itemList={getItemList()}
            consigneeList={getConsigneeList()}
            unsettledInvoices={getUnsettledInvoices()}
            onBack={onCancelEdit}
            printOptions={printOptions}
            onPrintOptionsChange={onPrintOptionsChange}
            onPrint={onPrint}
          />
        )}
      </TabsContent>
    </>
  );
};

export default TabContent;

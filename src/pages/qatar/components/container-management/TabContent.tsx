
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import ContainerList from "./ContainerList";
import LoadContainerDetails from "./load-container/LoadContainerDetails";
import AddContainer from "./AddContainer";
import ContainerManifest from "./ContainerManifest";
import ViewManifestTab from "./view-manifest/ViewManifestTab";
import { QatarContainer, PrintOptions } from "../../types/containerTypes";

interface TabContentProps {
  activeTab: string;
  containers: QatarContainer[];
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
  // Get the current container based on the edit container ID
  const currentContainer = getCurrentContainer(editContainerId);
  const viewContainer = getCurrentContainer(viewManifestId);
  
  return (
    <>
      <TabsContent value="containers" className="m-0">
        <ContainerList 
          containers={containers}
          onEdit={onEditContainer}
          onLoad={onLoadContainer}
          onViewManifest={onViewManifest}
          onCreateManifest={onCreateManifest}
          onAddClick={() => onAddContainer({
            id: "",
            containerNumber: "",
            containerType: "20FT",
            runningNumber: "",
            status: "Available",
            shippingLine: "MSC",
            direction: "Export",
            sector: "QAT-KEN"
          })}
        />
      </TabsContent>
      
      <TabsContent value="add" className="m-0">
        <AddContainer
          onSubmit={onAddContainer}
          onCancel={onCancelEdit}
        />
      </TabsContent>
      
      <TabsContent value="edit" className="m-0">
        {currentContainer && (
          <AddContainer
            onSubmit={onUpdateContainer}
            onCancel={onCancelEdit}
            containerData={currentContainer}
            isEditing={true}
          />
        )}
      </TabsContent>
      
      <TabsContent value="load" className="m-0">
        {currentContainer && (
          <LoadContainerDetails
            containerId={currentContainer.id}
            containerData={currentContainer}
            onLoadComplete={() => onLoadComplete(currentContainer.id)}
            onCancel={onCancelEdit}
          />
        )}
      </TabsContent>
      
      <TabsContent value="manifest" className="m-0">
        {currentContainer && (
          <ContainerManifest
            container={currentContainer}
            onClose={onCancelEdit}
          />
        )}
      </TabsContent>
      
      <TabsContent value="view-manifest" className="m-0">
        {viewContainer && (
          <ViewManifestTab
            container={viewContainer}
            printOptions={printOptions}
            onPrintOptionsChange={onPrintOptionsChange}
            onPrint={onPrint}
            onClose={onCancelEdit}
          />
        )}
      </TabsContent>
    </>
  );
};

export default TabContent;

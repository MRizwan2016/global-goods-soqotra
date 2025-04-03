
import React from "react";
import ContainerList from "./ContainerList";
import LoadContainer from "./LoadContainer";
import AddContainer from "./AddContainer";
import ContainerManifest from "./ContainerManifest";
import ViewManifestTab from "./view-manifest/ViewManifestTab";
import { Container, PrintOptions } from "../../types/containerTypes";

interface TabContentProps {
  activeTab: string;
  containers: Container[];
  statusFilter: string;
  searchText: string;
  selectedItem: Container | null;
  printOptions: PrintOptions;
  onTabChange: (tab: string) => void;
  onContainerEdit: (container: Container) => void;
  onContainerSubmit: (container: Container) => void;
  onContainerDelete: (id: string) => void;
  onContainerLoad: (containerId: string, cargoId: string, quantity: number) => void;
  onPrintOptionsChange: (options: Partial<PrintOptions>) => void;
  onPrint: () => void;
  onAddContainer: () => void;
}

const TabContent: React.FC<TabContentProps> = ({
  activeTab,
  containers,
  statusFilter,
  searchText,
  selectedItem,
  printOptions,
  onTabChange,
  onContainerEdit,
  onContainerSubmit,
  onContainerDelete,
  onContainerLoad,
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
          containers={containers}
          statusFilter={statusFilter}
          searchText={searchText}
          onEdit={onContainerEdit}
          onDelete={onContainerDelete}
          onAddClick={onAddContainer}
        />
      </TabsContent>
      
      <TabsContent value="add" className="m-0">
        <AddContainer
          onSubmit={onContainerSubmit}
          onCancel={() => onTabChange("containers")}
        />
      </TabsContent>
      
      <TabsContent value="edit" className="m-0">
        {selectedItem && (
          <AddContainer
            onSubmit={onContainerSubmit}
            onCancel={() => onTabChange("containers")}
            containerData={selectedItem}
            isEditing={true}
          />
        )}
      </TabsContent>
      
      <TabsContent value="load" className="m-0">
        {selectedItem && (
          <LoadContainer
            container={selectedItem}
            onLoad={onContainerLoad}
            onCancel={() => onTabChange("containers")}
          />
        )}
      </TabsContent>
      
      <TabsContent value="manifest" className="m-0">
        {selectedItem && (
          <ContainerManifest
            container={selectedItem}
            onClose={() => onTabChange("containers")}
          />
        )}
      </TabsContent>
      
      <TabsContent value="view-manifest" className="m-0">
        {selectedItem && (
          <ViewManifestTab
            container={selectedItem}
            printOptions={printOptions}
            onPrintOptionsChange={onPrintOptionsChange}
            onPrint={onPrint}
            onClose={() => onTabChange("containers")}
          />
        )}
      </TabsContent>
    </>
  );
};

export default TabContent;

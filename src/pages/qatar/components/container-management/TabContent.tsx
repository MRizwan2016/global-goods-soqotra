
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import ContainerList from "./ContainerList";
import AddContainer from "./AddContainer";
import LoadContainerDetails from "./LoadContainerDetails";
import ContainerManifest from "./ContainerManifest";
import ViewContainerManifest from "./view-manifest/ViewContainerManifest";
import PrintStyles from "../print/PrintStyles";
import { QatarContainer, ContainerCargo, ItemListEntry, ConsigneeListItem, UnsettledInvoice, PrintOptions } from "../../types/containerTypes";

interface TabContentProps {
  activeTab: string;
  containers: QatarContainer[];
  editContainerId: string | null;
  viewManifestId: string | null;
  printOptions: PrintOptions;
  getCurrentContainer: () => QatarContainer | null;
  getCurrentCargoItems: () => ContainerCargo[];
  getItemList: () => ItemListEntry[];
  getConsigneeList: () => ConsigneeListItem[];
  getUnsettledInvoices: () => UnsettledInvoice[];
  onEditContainer: (containerId: string) => void;
  onLoadContainer: (containerId: string) => void;
  onViewManifest: (containerId: string) => void;
  onCreateManifest: (containerId: string) => void;
  onUpdateContainer: (container: QatarContainer) => void;
  onCancelEdit: () => void;
  onLoadComplete: (containerId: string) => void;
  onManifestSubmitted: () => void;
  onPrintOptionsChange: (options: Partial<PrintOptions>) => void;
  onPrint: () => void;
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
  onPrint
}) => {
  return (
    <>
      <TabsContent value="containers" className="p-0 border-0">
        <ContainerList 
          onEditContainer={onEditContainer}
          onLoadContainer={onLoadContainer} 
          onViewManifest={onViewManifest}
          onCreateManifest={onCreateManifest}
          containersList={containers}
        />
      </TabsContent>

      <TabsContent value="add" className="p-0 border-0">
        <AddContainer 
          onSubmit={() => {}} // This will be overridden by the parent component
          onCancel={onCancelEdit} 
        />
      </TabsContent>

      <TabsContent value="edit" className="p-0 border-0">
        {editContainerId && (
          <AddContainer 
            containerData={getCurrentContainer()} 
            onSubmit={onUpdateContainer}
            onCancel={onCancelEdit}
            isEditing={true}
          />
        )}
      </TabsContent>

      <TabsContent value="load" className="p-0 border-0">
        {editContainerId && (
          <LoadContainerDetails 
            containerId={editContainerId}
            containerData={getCurrentContainer()}
            onLoadComplete={() => onLoadComplete(editContainerId)}
            onCancel={onCancelEdit}
          />
        )}
      </TabsContent>

      <TabsContent value="manifest" className="p-0 border-0">
        {editContainerId && (
          <ContainerManifest 
            containerId={editContainerId}
            onManifestSubmitted={onManifestSubmitted}
            onCancel={onCancelEdit}
          />
        )}
      </TabsContent>

      <TabsContent value="view-manifest" className="p-0 border-0">
        {viewManifestId && getCurrentContainer() && (
          <>
            <PrintStyles orientation={printOptions.orientation} />
            <ViewContainerManifest 
              container={getCurrentContainer() as QatarContainer}
              cargoItems={getCurrentCargoItems()}
              itemList={getItemList()}
              consigneeList={getConsigneeList()}
              unsettledInvoices={getUnsettledInvoices()}
              onBack={onCancelEdit}
              printOptions={printOptions}
              onPrintOptionsChange={onPrintOptionsChange}
              onPrint={onPrint}
            />
          </>
        )}
      </TabsContent>
    </>
  );
};

export default TabContent;

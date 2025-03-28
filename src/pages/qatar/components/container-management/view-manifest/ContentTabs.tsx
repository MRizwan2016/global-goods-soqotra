
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QatarContainer } from "../../../types/containerTypes";
import ContainerDetailsTab from "./tabs/ContainerDetailsTab";
import CargoItemsTab from "./tabs/CargoItemsTab";
import ItemListTab from "./tabs/ItemListTab";
import ConsigneeListTab from "./tabs/ConsigneeListTab";
import UnsettledInvoicesTab from "./tabs/UnsettledInvoicesTab";

interface ContentTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  container: QatarContainer | null;
  cargoItems: any[];
  itemList: any[];
  consigneeList: any[];
  unsettledInvoices: any[];
}

const ContentTabs: React.FC<ContentTabsProps> = ({
  activeTab,
  setActiveTab,
  container,
  cargoItems,
  itemList,
  consigneeList,
  unsettledInvoices
}) => {
  // Format container data for the ContainerList component
  const containerData = container ? [
    {
      ...container, // Spread all existing container properties
      // Ensure all required properties from QatarContainer exist
      id: container.id,
      containerNumber: container.containerNumber,
      containerType: container.containerType,
      runningNumber: container.runningNumber || "",
      status: container.status,
      sealNumber: container.sealNumber || "N/A",
      weight: container.weight || 0,
      packages: container.packages || 0,
      volume: container.volume || 0
    }
  ] : [];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="bg-gray-100 no-print">
        <TabsTrigger value="container-details" className="transition-colors hover:bg-gray-200">CONTAINER DETAILS</TabsTrigger>
        <TabsTrigger value="cargo-items" className="transition-colors hover:bg-gray-200">CARGO ITEMS ({cargoItems?.length || 0})</TabsTrigger>
        <TabsTrigger value="item-list" className="transition-colors hover:bg-gray-200">ITEM LIST ({itemList?.length || 0})</TabsTrigger>
        <TabsTrigger value="consignee-list" className="transition-colors hover:bg-gray-200">CONSIGNEE LIST ({consigneeList?.length || 0})</TabsTrigger>
        <TabsTrigger value="unsettled-invoices" className="transition-colors hover:bg-gray-200">UNSETTLED INVOICES ({unsettledInvoices?.filter(inv => !inv.paid).length || 0})</TabsTrigger>
      </TabsList>
      
      <TabsContent value="container-details" className="animate-fade-in">
        <ContainerDetailsTab 
          containerData={containerData} 
          container={container} 
        />
      </TabsContent>
      
      <TabsContent value="cargo-items" className="animate-fade-in">
        <CargoItemsTab cargoItems={cargoItems} />
      </TabsContent>
      
      <TabsContent value="item-list" className="animate-fade-in">
        <ItemListTab itemList={itemList} />
      </TabsContent>
      
      <TabsContent value="consignee-list" className="animate-fade-in">
        <ConsigneeListTab consigneeList={consigneeList} />
      </TabsContent>
      
      <TabsContent value="unsettled-invoices" className="animate-fade-in">
        <UnsettledInvoicesTab unsettledInvoices={unsettledInvoices} />
      </TabsContent>
    </Tabs>
  );
};

export default ContentTabs;

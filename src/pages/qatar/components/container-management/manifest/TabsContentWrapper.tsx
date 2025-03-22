
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { 
  ContainerCargo,
  ItemListEntry,
  ConsigneeListItem, 
  UnsettledInvoice 
} from "../../../types/containerTypes";
import CargoItemsTab from "./CargoItemsTab";
import ItemListTab from "./ItemListTab";
import UnsettledInvoicesTab from "./UnsettledInvoicesTab";
import ConsigneeListTab from "./ConsigneeListTab";

interface TabsContentWrapperProps {
  activeTab: string;
  cargoItems: ContainerCargo[];
  itemList: ItemListEntry[];
  unsettledInvoices: UnsettledInvoice[];
  consigneeList: ConsigneeListItem[];
  formatVolume: (volume: number) => string;
  formatWeight: (weight: number) => string;
}

const TabsContentWrapper: React.FC<TabsContentWrapperProps> = ({
  activeTab,
  cargoItems,
  itemList,
  unsettledInvoices,
  consigneeList,
  formatVolume,
  formatWeight
}) => {
  return (
    <>
      <TabsContent value="cargo">
        <CargoItemsTab 
          cargoItems={cargoItems}
          formatVolume={formatVolume}
          formatWeight={formatWeight}
        />
      </TabsContent>
      
      <TabsContent value="items">
        <ItemListTab 
          itemList={itemList}
          formatVolume={formatVolume}
        />
      </TabsContent>
      
      <TabsContent value="invoices">
        <UnsettledInvoicesTab 
          unsettledInvoices={unsettledInvoices}
        />
      </TabsContent>
      
      <TabsContent value="consignees">
        <ConsigneeListTab 
          consigneeList={consigneeList}
          formatVolume={formatVolume}
        />
      </TabsContent>
    </>
  );
};

export default TabsContentWrapper;

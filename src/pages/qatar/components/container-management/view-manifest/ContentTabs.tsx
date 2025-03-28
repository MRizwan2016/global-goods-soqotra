
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QatarContainer, ContainerCargo, ItemListEntry, ConsigneeListItem, UnsettledInvoice, PrintOptions } from "../../../types/containerTypes";
import CargoItemsTab from "./tabs/CargoItemsTab";
import ItemListTab from "./tabs/ItemListTab";
import ConsigneeListTab from "./tabs/ConsigneeListTab";
import UnsettledInvoicesTab from "./tabs/UnsettledInvoicesTab";

interface ContentTabsProps {
  activeTab?: string;
  setActiveTab?: React.Dispatch<React.SetStateAction<string>>;
  cargoItems: ContainerCargo[];
  itemList: ItemListEntry[];
  consigneeList: ConsigneeListItem[];
  unsettledInvoices: UnsettledInvoice[];
  container?: QatarContainer | null;
  printOptions?: PrintOptions;
}

const ContentTabs: React.FC<ContentTabsProps> = ({
  activeTab = "cargo-items",
  cargoItems,
  itemList,
  consigneeList,
  unsettledInvoices,
  printOptions = { section: "all", orientation: "portrait" }
}) => {
  return (
    <Tabs defaultValue={activeTab} className="print-tabs">
      <TabsList className="no-print">
        <TabsTrigger value="cargo-items">Cargo Items</TabsTrigger>
        <TabsTrigger value="item-list">Item List</TabsTrigger>
        <TabsTrigger value="consignee-list">Consignee List</TabsTrigger>
        <TabsTrigger value="unsettled-invoices">Unsettled Invoices</TabsTrigger>
      </TabsList>

      <TabsContent value="cargo-items" className={printOptions.section === "all" || printOptions.section === "cargo" ? "block page-break-after" : "hidden"}>
        <CargoItemsTab cargoItems={cargoItems} />
      </TabsContent>

      <TabsContent value="item-list" className={printOptions.section === "all" || printOptions.section === "items" ? "block page-break-after" : "hidden"}>
        <ItemListTab itemList={itemList} />
      </TabsContent>

      <TabsContent value="consignee-list" className={printOptions.section === "all" || printOptions.section === "consignees" ? "block page-break-after" : "hidden"}>
        <ConsigneeListTab consigneeList={consigneeList} />
      </TabsContent>

      <TabsContent value="unsettled-invoices" className={printOptions.section === "all" || printOptions.section === "invoices" ? "block" : "hidden"}>
        <UnsettledInvoicesTab unsettledInvoices={unsettledInvoices} />
      </TabsContent>
    </Tabs>
  );
};

export default ContentTabs;

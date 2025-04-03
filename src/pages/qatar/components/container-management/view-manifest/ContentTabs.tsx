
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CargoItemsTable from "./tabs/CargoItemsTable";
import ItemListTable from "./tabs/ItemListTable";
import ConsigneeListTable from "./tabs/ConsigneeListTable";
import UnsettledInvoicesTable from "./tabs/UnsettledInvoicesTable";
import { PrintOptions } from "../../../types/containerTypes";

interface ContentTabsProps {
  activeTab: string;
  onTabChange?: (value: string) => void;
  cargoItems: any[];
  itemList: any[];
  consigneeList: any[];
  unsettledInvoices: any[];
  container?: any;
  printOptions?: PrintOptions;
}

const ContentTabs: React.FC<ContentTabsProps> = ({
  activeTab,
  onTabChange,
  cargoItems,
  itemList,
  consigneeList,
  unsettledInvoices,
  container,
  printOptions
}) => {
  const handleValueChange = (value: string) => {
    if (onTabChange) {
      onTabChange(value);
    }
  };

  // Make sure we have a valid activeTab - we ensure it's never an empty string
  const validActiveTab = activeTab || "cargo-items";

  return (
    <Tabs value={validActiveTab} onValueChange={handleValueChange} className="mt-6">
      <TabsList className="mb-4 no-print">
        <TabsTrigger value="cargo-items" className="px-4 py-2">
          Cargo Items
        </TabsTrigger>
        <TabsTrigger value="item-list" className="px-4 py-2">
          Item List
        </TabsTrigger>
        <TabsTrigger value="consignee-list" className="px-4 py-2">
          Consignee List
        </TabsTrigger>
        <TabsTrigger value="unsettled-invoices" className="px-4 py-2">
          Unsettled Invoices
        </TabsTrigger>
      </TabsList>

      <TabsContent value="cargo-items">
        <CargoItemsTable cargoItems={cargoItems} />
      </TabsContent>

      <TabsContent value="item-list">
        <ItemListTable itemList={itemList} />
      </TabsContent>

      <TabsContent value="consignee-list">
        <ConsigneeListTable consigneeList={consigneeList} />
      </TabsContent>

      <TabsContent value="unsettled-invoices">
        <UnsettledInvoicesTable unsettledInvoices={unsettledInvoices} />
      </TabsContent>
    </Tabs>
  );
};

export default ContentTabs;


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
import { Button } from "@/components/ui/button";
import { Save, Receipt } from "lucide-react";
import { toast } from "sonner";

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
  const handleSaveInvoices = () => {
    // In a real app, this would connect to a backend to save invoice data
    const missingInvoices = unsettledInvoices.filter(inv => !inv.invoiceNumber);
    
    if (missingInvoices.length > 0) {
      // Generate invoice numbers starting from GY 13136051
      let startNumber = 13136051;
      
      const updatedInvoices = unsettledInvoices.map(invoice => {
        if (!invoice.invoiceNumber) {
          const newInvoiceNumber = `GY ${startNumber}`;
          startNumber++;
          return { ...invoice, invoiceNumber: newInvoiceNumber };
        }
        return invoice;
      });
      
      // In a real app, save these to the database
      console.log("Updated invoices with numbers:", updatedInvoices);
      toast.success(`${missingInvoices.length} invoices have been assigned numbers`);
    } else {
      toast.info("No missing invoice numbers to assign");
    }
  };

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
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Container Invoices</h3>
          <Button 
            onClick={handleSaveInvoices}
            className="bg-green-600 hover:bg-green-700 text-white hover:scale-105 transition-transform"
          >
            <Receipt className="mr-2 h-4 w-4" />
            Assign Invoice Numbers
          </Button>
        </div>
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

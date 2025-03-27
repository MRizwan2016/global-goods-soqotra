
import React, { useState } from "react";
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
import { Save, Receipt, FileCheck } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [localInvoices, setLocalInvoices] = useState<UnsettledInvoice[]>(unsettledInvoices);
  
  const handleSaveInvoices = () => {
    // In a real app, this would connect to a backend to save invoice data
    const missingInvoices = localInvoices.filter(inv => !inv.invoiceNumber);
    
    if (missingInvoices.length > 0) {
      // Generate invoice numbers starting from GY 13136051
      let startNumber = 13136051;
      
      const updatedInvoices = localInvoices.map(invoice => {
        if (!invoice.invoiceNumber) {
          const newInvoiceNumber = `GY ${startNumber}`;
          startNumber++;
          return { ...invoice, invoiceNumber: newInvoiceNumber };
        }
        return invoice;
      });
      
      // Update local state
      setLocalInvoices(updatedInvoices);
      
      // In a real app, save these to the database
      console.log("Updated invoices with numbers:", updatedInvoices);
      
      // Store in localStorage for persistence across pages
      const storedInvoices = JSON.parse(localStorage.getItem('generatedInvoices') || '[]');
      const combinedInvoices = [...storedInvoices, ...updatedInvoices];
      localStorage.setItem('generatedInvoices', JSON.stringify(combinedInvoices));
      
      toast.success(`${missingInvoices.length} invoices have been assigned numbers`);
    } else {
      toast.info("No missing invoice numbers to assign");
    }
  };
  
  const handleRecordPayment = () => {
    // Navigate to payment page for recording payments
    navigate("/accounts/add-invoice-payment");
  };

  // Use localInvoices instead of the prop for the current state
  const displayInvoices = localInvoices.length > 0 ? localInvoices : unsettledInvoices;

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
          <div className="flex gap-2">
            <Button 
              onClick={handleSaveInvoices}
              className="bg-green-600 hover:bg-green-700 text-white hover:scale-105 transition-transform"
            >
              <Receipt className="mr-2 h-4 w-4" />
              Assign Invoice Numbers
            </Button>
            
            <Button 
              onClick={handleRecordPayment}
              className="bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 transition-transform"
              disabled={displayInvoices.length === 0 || displayInvoices.every(inv => !inv.invoiceNumber)}
            >
              <FileCheck className="mr-2 h-4 w-4" />
              Record Payment
            </Button>
          </div>
        </div>
        <UnsettledInvoicesTab 
          unsettledInvoices={displayInvoices}
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

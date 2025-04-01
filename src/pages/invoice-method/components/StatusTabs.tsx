
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, CheckCircle2 } from "lucide-react";
import { Invoice } from "./status-tabs/Invoice";
import StatusTabsCounter from "./status-tabs/StatusTabsCounter";
import UnpaidTabContent from "./status-tabs/UnpaidTabContent";
import PaidTabContent from "./status-tabs/PaidTabContent";
import { useStatusTabs } from "../hooks/useStatusTabs";

interface StatusTabsProps {
  invoices: Invoice[];
}

const StatusTabs: React.FC<StatusTabsProps> = ({ invoices }) => {
  const {
    selectedTab,
    setSelectedTab,
    unpaidInvoices,
    paidInvoices,
    handlePayClick,
    handleViewPaymentDetails,
    handleViewInvoice
  } = useStatusTabs({ invoices });

  return (
    <Tabs defaultValue="unpaid" className="w-full" onValueChange={setSelectedTab}>
      <TabsList className="grid grid-cols-2 mb-6">
        <TabsTrigger value="unpaid" className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>Unpaid Invoices</span>
          <StatusTabsCounter count={unpaidInvoices.length} type="unpaid" />
        </TabsTrigger>
        <TabsTrigger value="paid" className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>Paid Invoices</span>
          <StatusTabsCounter count={paidInvoices.length} type="paid" />
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="unpaid" className="space-y-4">
        <UnpaidTabContent 
          invoices={unpaidInvoices}
          handlePayClick={handlePayClick}
          handleViewInvoice={handleViewInvoice}
        />
      </TabsContent>
      
      <TabsContent value="paid" className="space-y-4">
        <PaidTabContent 
          invoices={paidInvoices}
          handleViewPaymentDetails={handleViewPaymentDetails}
          handleViewInvoice={handleViewInvoice}
        />
      </TabsContent>
    </Tabs>
  );
};

export default StatusTabs;

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, CheckCircle2 } from "lucide-react";
import { Invoice } from "./status-tabs/Invoice";
import StatusTabsCounter from "./status-tabs/StatusTabsCounter";
import UnpaidTabContent from "./status-tabs/UnpaidTabContent";
import PaidTabContent from "./status-tabs/PaidTabContent";
import PaymentModal from "./PaymentModal";
import { useStatusTabs } from "../hooks/useStatusTabs";

interface StatusTabsProps {
  invoices: Invoice[];
  onRefresh?: () => void;
}

const StatusTabs: React.FC<StatusTabsProps> = ({ invoices, onRefresh }) => {
  const {
    selectedTab,
    setSelectedTab,
    unpaidInvoices,
    paidInvoices,
    selectedInvoice,
    showPaymentModal,
    handlePayClick,
    handleClosePaymentModal,
    handleViewPaymentDetails,
    handleViewInvoice
  } = useStatusTabs({ invoices });

  const handlePaymentComplete = () => {
    // Trigger a page reload to refresh data from the view
    if (onRefresh) {
      onRefresh();
    } else {
      window.location.reload();
    }
  };

  return (
    <>
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

      <PaymentModal
        invoice={selectedInvoice}
        isOpen={showPaymentModal}
        onClose={handleClosePaymentModal}
        onPaymentComplete={handlePaymentComplete}
      />
    </>
  );
};

export default StatusTabs;

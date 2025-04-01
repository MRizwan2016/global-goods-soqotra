
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, CheckCircle2 } from "lucide-react";
import { Invoice } from "./status-tabs/Invoice";
import StatusTabsCounter from "./status-tabs/StatusTabsCounter";
import UnpaidTabContent from "./status-tabs/UnpaidTabContent";
import PaidTabContent from "./status-tabs/PaidTabContent";
import { useStatusTabs } from "../hooks/useStatusTabs";
import { useNavigate } from "react-router-dom";

interface StatusTabsProps {
  invoices: Invoice[];
}

const StatusTabs: React.FC<StatusTabsProps> = ({ invoices }) => {
  const navigate = useNavigate();
  
  const {
    selectedTab,
    setSelectedTab,
    unpaidInvoices,
    paidInvoices,
    handlePayClick: originalHandlePayClick,
    handleViewPaymentDetails,
    handleViewInvoice
  } = useStatusTabs({ invoices });
  
  // Modify the handlePayClick to store the invoice in sessionStorage
  // before navigating to the payment page
  const handlePayClick = (invoice: Invoice) => {
    console.log("Pay button clicked for invoice:", invoice);
    
    // Store the selected invoice in sessionStorage
    sessionStorage.setItem('selectedInvoice', JSON.stringify(invoice));
    
    // Navigate to the payment page - using direct navigation
    window.location.href = '/accounts/payment/add';
  };

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

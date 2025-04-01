
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, CheckCircle2 } from "lucide-react";
import { Invoice } from "./status-tabs/Invoice";
import StatusTabsCounter from "./status-tabs/StatusTabsCounter";
import UnpaidTabContent from "./status-tabs/UnpaidTabContent";
import PaidTabContent from "./status-tabs/PaidTabContent";

interface StatusTabsProps {
  invoices: Invoice[];
}

const StatusTabs: React.FC<StatusTabsProps> = ({ invoices }) => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("unpaid");
  
  // Filter invoices by payment status
  const unpaidInvoices = invoices.filter(invoice => !invoice.paid);
  const paidInvoices = invoices.filter(invoice => invoice.paid);
  
  // Handle payment button click - Fixed to use accounts/payment/add
  const handlePayClick = (invoice: Invoice) => {
    // Store the selected invoice in sessionStorage for the payment page to access
    sessionStorage.setItem('selectedInvoice', JSON.stringify(invoice));
    
    // Navigate to the payment page - FIXED PATH
    navigate('/accounts/payment/add');
  };
  
  // Handle view payment details
  const handleViewPaymentDetails = (invoice: Invoice) => {
    // For paid invoices, navigate to a details page
    navigate(`/accounts/payments/reconciliation?invoice=${invoice.invoiceNumber}`);
  };
  
  // Handle view invoice - This should navigate to the invoice view page
  const handleViewInvoice = (id: string) => {
    // Navigate to invoice view page
    window.open(`/invoice/view/${id}`, '_blank');
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

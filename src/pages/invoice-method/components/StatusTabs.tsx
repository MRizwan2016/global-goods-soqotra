
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import InvoiceTable from "./InvoiceTable";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface StatusTabsProps {
  invoices: any[];
}

const StatusTabs: React.FC<StatusTabsProps> = ({ invoices }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("unpaid");
  
  const unpaidInvoices = invoices.filter(inv => !inv.paid);
  const paidInvoices = invoices.filter(inv => inv.paid);
  
  const handlePayInvoice = (invoice: any) => {
    // Store the selected invoice in session storage for the payment page
    sessionStorage.setItem('selectedInvoice', JSON.stringify(invoice));
    // Navigate to the payment add page
    navigate("/accounts/payment/add");
    
    // Show toast notification
    toast.success("Payment form opened", {
      description: `Processing payment for invoice ${invoice.invoiceNumber}`,
    });
  };
  
  const handleViewInvoice = (id: string) => {
    // Open invoice print in a new tab
    window.open(`/data-entry/print-documents/invoice-print/${id}`, '_blank');
  };
  
  return (
    <Tabs defaultValue="unpaid" className="w-full" onValueChange={setActiveTab}>
      <TabsList className="grid w-full max-w-md grid-cols-2">
        <TabsTrigger value="unpaid">Unpaid Invoices</TabsTrigger>
        <TabsTrigger value="paid">Paid Invoices</TabsTrigger>
      </TabsList>
      
      <TabsContent value="unpaid" className="space-y-4 mt-4">
        <Card>
          <CardContent className="p-4">
            {unpaidInvoices.length > 0 ? (
              <InvoiceTable 
                invoices={unpaidInvoices} 
                onPay={handlePayInvoice} 
                onView={handleViewInvoice}
                showPayButton={true}
              />
            ) : (
              <div className="text-center py-10 text-gray-500">
                <p>No unpaid invoices found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="paid" className="space-y-4 mt-4">
        <Card>
          <CardContent className="p-4">
            {paidInvoices.length > 0 ? (
              <InvoiceTable 
                invoices={paidInvoices} 
                onPay={() => {}} 
                onView={handleViewInvoice}
                showPayButton={false}
              />
            ) : (
              <div className="text-center py-10 text-gray-500">
                <p>No paid invoices found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default StatusTabs;

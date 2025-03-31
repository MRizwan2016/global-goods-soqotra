
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import InvoiceTable from "./InvoiceTable";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ReceiptView from "@/components/payment/ReceiptView";

interface StatusTabsProps {
  invoices: any[];
}

const StatusTabs: React.FC<StatusTabsProps> = ({ invoices }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("unpaid");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);
  
  // Force refresh when localStorage changes (payment made)
  useEffect(() => {
    const handleStorageChange = () => {
      console.log("Storage change detected, refreshing...");
      setRefreshTrigger(prev => prev + 1);
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  // Filter invoices based on payment status
  // This runs every time the component renders or refreshTrigger changes
  const unpaidInvoices = invoices.filter(inv => !inv.paid);
  const paidInvoices = invoices.filter(inv => inv.paid);
  
  const handlePayInvoice = (invoice: any) => {
    // Add additional logging to debug
    console.log("Paying invoice:", invoice);
    
    // Store the selected invoice in session storage for the payment page
    sessionStorage.setItem('selectedInvoice', JSON.stringify(invoice));
    
    // Navigate to the payment add page and add a timestamp to force reload
    navigate(`/accounts/payment/add?t=${Date.now()}`);
    
    // Show toast notification
    toast.success("Payment form opened", {
      description: `Processing payment for invoice ${invoice.invoiceNumber}`,
    });
  };
  
  const handleViewInvoice = (id: string) => {
    // Open invoice print in a new tab
    window.open(`/data-entry/print-documents/invoice-print/${id}`, '_blank');
  };
  
  const handleViewReceipt = (invoice: any) => {
    // Find the payment record for this invoice
    try {
      const payments = JSON.parse(localStorage.getItem('invoicePayments') || '[]');
      console.log("All payments:", payments);
      
      const payment = payments.find((p: any) => p.invoiceNumber === invoice.invoiceNumber);
      
      if (!payment) {
        console.log("No payment found for invoice:", invoice.invoiceNumber);
        toast.error("Receipt not found", {
          description: "Could not find payment record for this invoice"
        });
        return;
      }
      
      console.log("Found payment:", payment);
      
      // Prepare receipt data
      const receipt = {
        receiptNumber: payment.id,
        invoiceNumber: invoice.invoiceNumber,
        date: payment.date || new Date().toISOString().split('T')[0],
        customer: invoice.consignee1 || invoice.consignee,
        amount: payment.amount,
        paymentMethod: payment.paymentMethod,
        currency: payment.currency || "QAR",
        remarks: payment.remarks
      };
      
      console.log("Prepared receipt data:", receipt);
      setReceiptData(receipt);
      setShowReceipt(true);
    } catch (error) {
      console.error("Error retrieving payment data:", error);
      toast.error("Error", {
        description: "Could not retrieve payment information"
      });
    }
  };
  
  return (
    <>
      <Tabs defaultValue="unpaid" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="unpaid">Unpaid Invoices ({unpaidInvoices.length})</TabsTrigger>
          <TabsTrigger value="paid">Paid Invoices ({paidInvoices.length})</TabsTrigger>
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
                  onPay={handleViewReceipt} 
                  onView={handleViewInvoice}
                  showPayButton={true}
                  payButtonLabel="Receipt"
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
      
      {/* Receipt Modal */}
      {showReceipt && receiptData && (
        <ReceiptView 
          isOpen={showReceipt}
          onClose={() => setShowReceipt(false)}
          receiptData={receiptData}
        />
      )}
    </>
  );
};

export default StatusTabs;

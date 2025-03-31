
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  DollarSign, 
  ListFilter, 
  Printer, 
  FileText 
} from "lucide-react";

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  consignee1?: string;
  consignee?: string;
  customer?: string;
  net?: number;
  amount?: number;
  gross?: number;
  discount?: number;
  paid: boolean;
  [key: string]: any;
}

interface StatusTabsProps {
  invoices: Invoice[];
}

const StatusTabs: React.FC<StatusTabsProps> = ({ invoices }) => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("unpaid");
  
  // Filter invoices by payment status
  const unpaidInvoices = invoices.filter(invoice => !invoice.paid);
  const paidInvoices = invoices.filter(invoice => invoice.paid);
  
  // Handle payment button click
  const handlePayClick = (invoice: Invoice) => {
    // Store the selected invoice in sessionStorage for the payment page to access
    sessionStorage.setItem('selectedInvoice', JSON.stringify(invoice));
    
    // Navigate to the payment page
    navigate('/accounts/payment/add');
  };
  
  // Handle view payment details
  const handleViewPaymentDetails = (invoice: Invoice) => {
    // For paid invoices, navigate to a details page (will be implemented later)
    navigate(`/accounts/payments/reconciliation?invoice=${invoice.invoiceNumber}`);
  };

  return (
    <Tabs defaultValue="unpaid" className="w-full" onValueChange={setSelectedTab}>
      <TabsList className="grid grid-cols-2 mb-6">
        <TabsTrigger value="unpaid" className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>Unpaid Invoices</span>
          <span className="ml-2 bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-xs font-medium">
            {unpaidInvoices.length}
          </span>
        </TabsTrigger>
        <TabsTrigger value="paid" className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>Paid Invoices</span>
          <span className="ml-2 bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium">
            {paidInvoices.length}
          </span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="unpaid" className="space-y-4">
        {unpaidInvoices.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700">No unpaid invoices</h3>
            <p className="text-gray-500 mt-2">All invoices have been paid.</p>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {unpaidInvoices.map((invoice) => {
                      // Determine the customer name from various possible fields
                      const customerName = invoice.consignee1 || invoice.consignee || invoice.customer || 'Unknown';
                      // Get amount from net, amount, or calculate from gross-discount
                      const amount = invoice.net || invoice.amount || 
                        ((invoice.gross || 0) - (invoice.discount || 0));
                        
                      return (
                        <tr key={invoice.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.invoiceNumber}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customerName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {(invoice.currency || 'QAR')} {amount.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Unpaid
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <Button 
                                variant="default" 
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700"
                                onClick={() => handlePayClick(invoice)}
                              >
                                <DollarSign className="h-4 w-4 mr-1" />
                                Pay
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  window.open(`/invoice/view/${invoice.id}`, '_blank');
                                }}
                              >
                                <FileText className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </TabsContent>
      
      <TabsContent value="paid" className="space-y-4">
        {paidInvoices.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700">No paid invoices</h3>
            <p className="text-gray-500 mt-2">None of your invoices have been paid yet.</p>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div className="flex justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ListFilter className="h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Printer className="h-4 w-4" />
                  Print List
                </Button>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => navigate('/accounts/payments/reconciliation')}
              >
                <FileText className="h-4 w-4" />
                View All Payments
              </Button>
            </div>
            
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paidInvoices.map((invoice) => {
                      // Determine the customer name from various possible fields
                      const customerName = invoice.consignee1 || invoice.consignee || invoice.customer || 'Unknown';
                      // Get amount from net, amount, or calculate from gross-discount
                      const amount = invoice.net || invoice.amount || 
                        ((invoice.gross || 0) - (invoice.discount || 0));
                      
                      return (
                        <tr key={invoice.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.invoiceNumber}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customerName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {(invoice.currency || 'QAR')} {amount.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Paid
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <Button 
                                variant="default" 
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleViewPaymentDetails(invoice)}
                              >
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                Details
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  window.open(`/invoice/view/${invoice.id}`, '_blank');
                                }}
                              >
                                <FileText className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default StatusTabs;

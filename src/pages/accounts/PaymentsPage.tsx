import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, FileSearch, ArrowDownUp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "@/components/ui/back-button";

const PaymentsPage = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  // Load payments from localStorage
  useEffect(() => {
    const loadPayments = () => {
      try {
        const storedPayments = JSON.parse(localStorage.getItem('payments') || '[]');
        setPayments(storedPayments);
      } catch (error) {
        console.error("Error loading payments:", error);
      }
    };

    loadPayments();
    
    // Listen for storage changes
    const handleStorageChange = () => {
      loadPayments();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleViewPayment = (invoiceId: string) => {
    navigate(`/reports/cargo/invoice/${invoiceId}`);
  };

  // Filter payments by status
  const allPayments = payments;
  const pendingPayments = payments.filter(payment => payment.status === 'pending');
  const completedPayments = payments.filter(payment => payment.status === 'completed');

  return (
    <Layout title="Payments">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BackButton />
            <h1 className="text-2xl font-bold tracking-tight">Payment Management</h1>
          </div>
          <Link to="/accounts/payment/add">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Payment
            </Button>
          </Link>
        </div>
        
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all">All Payments ({allPayments.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingPayments.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedPayments.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4 mt-4">
            <Card className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Invoice #
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {allPayments.length > 0 ? allPayments.map((payment, index) => (
                      <tr key={payment.id || index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.invoiceNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.customerName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.currencySymbol} {payment.amountPaid?.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.paymentCollectDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            payment.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {payment.status === 'completed' ? 'Completed' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleViewPayment(payment.invoiceNumber)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <FileSearch className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                          No payments found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="pending" className="space-y-4 mt-4">
            <Card className="p-6">
              {pendingPayments.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {pendingPayments.map((payment, index) => (
                        <tr key={payment.id || index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.invoiceNumber}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.customerName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.currencySymbol} {payment.amountPaid?.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.paymentCollectDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Button variant="ghost" size="sm" onClick={() => handleViewPayment(payment.invoiceNumber)} className="text-blue-600 hover:text-blue-800">
                              <FileSearch className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500">
                  <ArrowDownUp className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No Pending Payments</h3>
                  <p className="max-w-md mx-auto">All payments have been processed.</p>
                </div>
              )}
            </Card>
          </TabsContent>
          <TabsContent value="completed" className="space-y-4 mt-4">
            <Card className="p-6">
              {completedPayments.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {completedPayments.map((payment, index) => (
                        <tr key={payment.id || index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.invoiceNumber}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.customerName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.currencySymbol} {payment.amountPaid?.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.paymentCollectDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Button variant="ghost" size="sm" onClick={() => handleViewPayment(payment.invoiceNumber)} className="text-blue-600 hover:text-blue-800">
                              <FileSearch className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500">
                  <ArrowDownUp className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No Completed Payments</h3>
                  <p className="max-w-md mx-auto">No payments have been completed yet.</p>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PaymentsPage;

import React from "react";
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, FileSearch, ArrowDownUp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "@/components/ui/back-button";

const PaymentsPage = () => {
  const navigate = useNavigate();

  const handleViewPayment = (invoiceId: string) => {
    navigate(`/reports/cargo/invoice/${invoiceId}`);
  };

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
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all">All Payments</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
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
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">INV-1234</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Ahmed Ali</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">QR 1,250.00</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-05-12</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Completed
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleViewPayment('INV-1234')}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FileSearch className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">INV-1235</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mohammed Hassan</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">QR 3,450.00</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-05-10</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button variant="ghost" size="sm">
                          <FileSearch className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">INV-1236</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sara Ahmed</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">QR 750.00</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-05-08</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Completed
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button variant="ghost" size="sm">
                          <FileSearch className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="pending" className="space-y-4 mt-4">
            <Card className="p-6">
              <div className="text-center py-10 text-gray-500">
                <ArrowDownUp className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">Pending Payments</h3>
                <p className="max-w-md mx-auto">View and manage all pending payments that need to be processed.</p>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="completed" className="space-y-4 mt-4">
            <Card className="p-6">
              <div className="text-center py-10 text-gray-500">
                <ArrowDownUp className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">Completed Payments</h3>
                <p className="max-w-md mx-auto">View payment history and transaction details.</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PaymentsPage;

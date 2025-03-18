
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Search, 
  Filter, 
  FileText, 
  Calendar, 
  CreditCard,
  UserCheck
} from "lucide-react";

const PaymentReceivable = () => {
  return (
    <Layout title="Payment Receivable">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Payment Receivable</h1>
          <Button>
            Download Report
          </Button>
        </div>
        
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                type="search" 
                placeholder="Search by invoice #" 
                className="pl-8"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="date-from" className="w-20">From:</Label>
              <Input 
                id="date-from" 
                type="date" 
              />
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="date-to" className="w-20">To:</Label>
              <Input 
                id="date-to" 
                type="date" 
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </Card>
        
        <Tabs defaultValue="unpaid" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="unpaid">Unpaid</TabsTrigger>
            <TabsTrigger value="partial">Partially Paid</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
          </TabsList>
          
          <TabsContent value="unpaid" className="space-y-4 mt-4">
            <Card className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Invoice #
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Invoice Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">INV-1001</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-05-15</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Ahmed Mohamed</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">QR 1,500.00</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Unpaid
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <CreditCard className="h-3 w-3" />
                          Collect
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">INV-1002</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-05-10</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sara Ali</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">QR 2,250.00</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Unpaid
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <CreditCard className="h-3 w-3" />
                          Collect
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="partial" className="space-y-4 mt-4">
            <Card className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Invoice #
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Invoice Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Paid Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Remaining
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">INV-1003</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-05-08</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mohammed Khalid</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">QR 3,000.00</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">QR 1,500.00</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-semibold text-amber-600">QR 1,500.00</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <CreditCard className="h-3 w-3" />
                          Complete
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="paid" className="space-y-4 mt-4">
            <Card className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Invoice #
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
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
                        Receipt
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">INV-1000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-05-01</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Fatima Hassan</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">QR 2,750.00</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-05-02</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          View
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">INV-999</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-04-25</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Abdulrahman Ali</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">QR 1,850.00</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-04-27</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          View
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PaymentReceivable;

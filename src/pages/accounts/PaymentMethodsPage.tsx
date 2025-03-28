import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  CreditCard, 
  PlusCircle, 
  Pencil, 
  Trash2, 
  AlertCircle, 
  Receipt,
  ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import PrivateRoute from "@/components/auth/PrivateRoute";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PaymentMethodsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const recentPayments = [
    { id: 1, invoice: "GY13136051", customer: "Ali Saleh", amount: 750, date: "2023-06-18", status: "Completed" },
    { id: 2, invoice: "GY13136052", customer: "Mohammed Ali", amount: 1200, date: "2023-06-17", status: "Completed" },
    { id: 3, invoice: "GY13136053", customer: "Fatima Hassan", amount: 450, date: "2023-06-16", status: "Pending" },
    { id: 4, invoice: "GY13136054", customer: "Ahmed Mahmoud", amount: 900, date: "2023-06-15", status: "Completed" },
  ];

  const dummyPaymentMethods = [
    { id: 1, name: "Bank Transfer", type: "Bank", status: "Active", lastModified: "2023-06-15" },
    { id: 2, name: "Cash", type: "Cash", status: "Active", lastModified: "2023-06-15" },
    { id: 3, name: "Credit Card", type: "Card", status: "Active", lastModified: "2023-06-15" },
    { id: 4, name: "Cheque", type: "Bank", status: "Active", lastModified: "2023-06-15" },
    { id: 5, name: "Mobile Money", type: "Digital", status: "Inactive", lastModified: "2023-06-15" },
  ];

  const handleDelete = (id: number) => {
    toast({
      title: "Payment method deleted",
      description: `Payment method with ID ${id} has been deleted.`,
      variant: "destructive",
    });
  };

  const handleEdit = (id: number) => {
    toast({
      title: "Edit payment method",
      description: `Editing payment method with ID ${id}`,
    });
  };

  const handleViewPayment = (id: number) => {
    toast({
      title: "View payment details",
      description: `Viewing payment with ID ${id}`,
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Bank":
        return "bg-blue-100 text-blue-800";
      case "Cash":
        return "bg-green-100 text-green-800";
      case "Card":
        return "bg-purple-100 text-purple-800";
      case "Digital":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-amber-100 text-amber-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <PrivateRoute requiredFile="paymentMethods">
      <Layout title="Payment Methods & Transactions">
        <div className="container mx-auto p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"
          >
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
                Payments & Receivables
              </h1>
              <p className="text-muted-foreground">
                Manage payment methods and track invoice payments
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={() => navigate("/accounts/payments/add")}
                className="bg-green-600 hover:bg-green-700 transition-colors"
              >
                <Receipt className="mr-2 h-4 w-4" />
                Record Payment
              </Button>
              <Button 
                onClick={() => navigate("/accounts/payment-methods/add")}
                className="bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Payment Method
              </Button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="shadow-md border-t-4 border-t-blue-500 h-full">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
                  <CardTitle className="text-xl flex items-center gap-2 text-blue-700">
                    <Receipt className="h-5 w-5 text-blue-600" />
                    Recent Payments
                  </CardTitle>
                  <CardDescription>
                    Recent invoice payments collected from customers
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-gray-50">
                      <TableRow>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">View</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentPayments.map((payment) => (
                        <motion.tr
                          key={payment.id}
                          whileHover={{ backgroundColor: "rgba(243, 244, 246, 0.7)" }}
                          className="transition-colors duration-200"
                        >
                          <TableCell className="font-medium">{payment.invoice}</TableCell>
                          <TableCell>{payment.customer}</TableCell>
                          <TableCell className="font-semibold">${payment.amount}</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(payment.status)}`}>
                              {payment.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleViewPayment(payment.id)}
                              className="text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                            >
                              <ArrowRight className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                  
                  {recentPayments.length === 0 && (
                    <div className="p-8 text-center">
                      <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium">No recent payments</h3>
                      <p className="text-sm text-gray-500 mt-2">
                        Payments will appear here once they are recorded
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card className="shadow-md border-t-4 border-t-purple-500 h-full">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
                  <CardTitle className="text-xl flex items-center gap-2 text-purple-700">
                    <CreditCard className="h-5 w-5 text-purple-600" />
                    Payment Summary
                  </CardTitle>
                  <CardDescription>
                    Overview of payment collection status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-blue-50 border border-blue-100">
                      <span className="text-blue-800 font-medium">Total Collected</span>
                      <span className="text-blue-800 font-bold">$3,300</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-amber-50 border border-amber-100">
                      <span className="text-amber-800 font-medium">Pending</span>
                      <span className="text-amber-800 font-bold">$450</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-green-50 border border-green-100">
                      <span className="text-green-800 font-medium">Today's Collections</span>
                      <span className="text-green-800 font-bold">$750</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">QUICK ACTIONS</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate("/accounts/payments/add")}
                          className="text-blue-600 border-blue-200 hover:bg-blue-50"
                        >
                          Record Payment
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {}}
                          className="text-purple-600 border-purple-200 hover:bg-purple-50"
                        >
                          View Reports
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
          >
            <Card className="shadow-md border-t-4 border-t-blue-500">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
                <CardTitle className="text-xl flex items-center gap-2 text-blue-700">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  Available Payment Methods
                </CardTitle>
                <CardDescription>
                  Configure payment methods that customers can use to pay invoices
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead>Method Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Modified</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyPaymentMethods.map((method) => (
                      <motion.tr
                        key={method.id}
                        variants={item}
                        onMouseEnter={() => setHoveredRow(method.id)}
                        onMouseLeave={() => setHoveredRow(null)}
                        className={`${
                          hoveredRow === method.id ? "bg-gray-50" : ""
                        } transition-colors duration-200 relative`}
                      >
                        <TableCell className="font-medium">{method.name}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(method.type)}`}>
                            {method.type}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            method.status === "Active" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            {method.status}
                          </span>
                        </TableCell>
                        <TableCell>{method.lastModified}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEdit(method.id)}
                              className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDelete(method.id)}
                              className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 hover:text-red-700 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
                
                {dummyPaymentMethods.length === 0 && (
                  <div className="p-8 text-center">
                    <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium">No payment methods found</h3>
                    <p className="text-sm text-gray-500 mt-2">
                      Get started by adding your first payment method.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Layout>
    </PrivateRoute>
  );
};

export default PaymentMethodsPage;

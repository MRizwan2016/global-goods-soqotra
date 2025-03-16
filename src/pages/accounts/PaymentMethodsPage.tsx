
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
import { CreditCard, PlusCircle, Pencil, Trash2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PrivateRoute from "@/components/auth/PrivateRoute";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

const PaymentMethodsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

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

  return (
    <PrivateRoute requiredFile="paymentMethods">
      <Layout title="Payment Methods">
        <div className="container mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl font-bold tracking-tight">Payment Methods</h1>
              <p className="text-muted-foreground">
                Manage payment methods for invoicing and receivables
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Button 
                onClick={() => navigate("/accounts/payment-methods/add")}
                className="bg-soqotra-blue hover:bg-blue-700 transition-colors"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Payment Method
              </Button>
            </motion.div>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
          >
            <Card className="shadow-md border-t-4 border-t-soqotra-blue">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
                <CardTitle className="text-xl flex items-center gap-2 text-soqotra-blue">
                  <CreditCard className="h-5 w-5 text-soqotra-blue" />
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

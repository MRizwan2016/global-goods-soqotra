
import React from "react";
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
import { CreditCard, PlusCircle, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PrivateRoute from "@/components/auth/PrivateRoute";

const PaymentMethodsPage = () => {
  const navigate = useNavigate();

  const dummyPaymentMethods = [
    { id: 1, name: "Bank Transfer", type: "Bank", status: "Active", lastModified: "2023-06-15" },
    { id: 2, name: "Cash", type: "Cash", status: "Active", lastModified: "2023-06-15" },
    { id: 3, name: "Credit Card", type: "Card", status: "Active", lastModified: "2023-06-15" },
    { id: 4, name: "Cheque", type: "Bank", status: "Active", lastModified: "2023-06-15" },
    { id: 5, name: "Mobile Money", type: "Digital", status: "Inactive", lastModified: "2023-06-15" },
  ];

  return (
    <PrivateRoute requiredFile="paymentMethods">
      <Layout title="Payment Methods">
        <div className="container mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Payment Methods</h1>
              <p className="text-muted-foreground">
                Manage payment methods for invoicing and receivables
              </p>
            </div>
            <Button onClick={() => navigate("/accounts/payment-methods/add")}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Payment Method
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Available Payment Methods
              </CardTitle>
              <CardDescription>
                Configure payment methods that customers can use to pay invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
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
                    <TableRow key={method.id}>
                      <TableCell className="font-medium">{method.name}</TableCell>
                      <TableCell>{method.type}</TableCell>
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
                          <Button variant="outline" size="sm">
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </PrivateRoute>
  );
};

export default PaymentMethodsPage;

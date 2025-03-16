import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, CreditCard, Banknote, Building, CheckSquare, Wallet, ArrowUpRight, Plus, BarChart, FileText } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import PrivateRoute from "@/components/auth/PrivateRoute";

// Payment method descriptions and capabilities
const paymentMethods = [
  {
    id: "cash",
    name: "Cash",
    icon: <Banknote className="h-6 w-6" />,
    color: "bg-green-100 text-green-700",
    description: "Accept cash payments from customers directly.",
    features: [
      "No processing fees",
      "Immediate payment settlement",
      "Available for in-person transactions only",
      "Manual reconciliation required"
    ]
  },
  {
    id: "credit_card",
    name: "Credit Cards",
    icon: <CreditCard className="h-6 w-6" />,
    color: "bg-blue-100 text-blue-700",
    description: "Accept Visa, Mastercard, American Express and other major credit cards.",
    features: [
      "2.9% + $0.30 processing fee per transaction",
      "1-2 business days for settlement",
      "Available for online and in-person transactions",
      "Automatic reconciliation"
    ]
  },
  {
    id: "bank_transfer",
    name: "Bank Transfer",
    icon: <Building className="h-6 w-6" />,
    color: "bg-purple-100 text-purple-700",
    description: "Accept direct bank transfers from customers to your bank account.",
    features: [
      "Low processing fees",
      "2-3 business days for settlement",
      "Manual verification required",
      "Suitable for large transactions"
    ]
  },
  {
    id: "check",
    name: "Check/Cheque",
    icon: <CheckSquare className="h-6 w-6" />,
    color: "bg-yellow-100 text-yellow-700",
    description: "Accept personal or business checks from customers.",
    features: [
      "No immediate processing fees",
      "5-7 business days for clearance",
      "Risk of bounced checks",
      "Manual processing and reconciliation"
    ]
  },
  {
    id: "mobile_payment",
    name: "Mobile Payment",
    icon: <Wallet className="h-6 w-6" />,
    color: "bg-red-100 text-red-700",
    description: "Accept payments via mobile payment apps and digital wallets.",
    features: [
      "1.5-2.5% processing fee per transaction",
      "Immediate to 1 business day settlement",
      "Works with major digital wallets",
      "Automatic reconciliation"
    ]
  }
];

const PaymentMethodsPage = () => {
  const [activeTab, setActiveTab] = useState("methods");
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // We'll just assume the user has permission since we're using requiredPermission
  const hasPermission = true;

  return (
    <PrivateRoute requiredPermission="paymentMethods">
      <Layout title="Payment Methods">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Payment Management</h1>
              <p className="text-muted-foreground">
                Manage payment methods and process invoice payments
              </p>
            </div>
            <Button 
              onClick={() => navigate("/accounts/add-payment")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <DollarSign className="mr-2 h-4 w-4" />
              Process Payment
            </Button>
          </div>
          
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="methods">Payment Methods</TabsTrigger>
              <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
              <TabsTrigger value="reports">Payment Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="methods" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paymentMethods.map((method) => (
                  <Card key={method.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className={`p-2 rounded-md ${method.color}`}>
                          {method.icon}
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardTitle className="mt-2">{method.name}</CardTitle>
                      <CardDescription>{method.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        {method.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <span className="mr-2 mt-0.5 h-1.5 w-1.5 rounded-full bg-gray-300"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
                
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center h-full py-6">
                    <div className="rounded-full bg-gray-100 p-3 mb-4">
                      <Plus className="h-6 w-6 text-gray-500" />
                    </div>
                    <CardTitle className="text-lg text-center mb-2">Add New Payment Method</CardTitle>
                    <CardDescription className="text-center mb-4">
                      Configure additional payment options for your customers
                    </CardDescription>
                    <Button variant="outline">Configure</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="transactions">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Payment Transactions</CardTitle>
                    <Button onClick={() => navigate("/accounts/invoice-payments")}>
                      View All Payments
                    </Button>
                  </div>
                  <CardDescription>
                    View and manage all payment transactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-8 text-center">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mb-4">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Manage Invoice Payments</h3>
                    <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                      Track, process, and manage all your incoming invoice payments in one place.
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Button 
                        onClick={() => navigate("/accounts/add-payment")}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        New Payment
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => navigate("/accounts/invoice-payments")}
                      >
                        View All Payments
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Reports</CardTitle>
                  <CardDescription>
                    Generate and view payment reports and analytics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-8 text-center">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mb-4">
                      <BarChart className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Payment Analytics</h3>
                    <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                      Get insights into your payment flows, track payment methods, and analyze payment trends.
                    </p>
                    <Button variant="outline">
                      Generate Reports
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Layout>
    </PrivateRoute>
  );
};

export default PaymentMethodsPage;

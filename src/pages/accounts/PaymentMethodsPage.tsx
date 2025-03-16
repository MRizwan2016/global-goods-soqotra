
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DollarSign, Calculator } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import PrivateRoute from "@/components/auth/PrivateRoute";
import PaymentMethodsTab from "./components/PaymentMethodsTab";
import TransactionsTab from "./components/TransactionsTab";
import ReportsTab from "./components/ReportsTab";
import { useToast } from "@/hooks/use-toast";

const PaymentMethodsPage = () => {
  const [activeTab, setActiveTab] = useState("methods");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  console.log("Rendering PaymentMethodsPage");

  const handleReconcileClick = () => {
    toast({
      title: "Reconciliation",
      description: "Payment reconciliation tool opened",
    });
    // Navigate to reconciliation page or open modal
    // This is a placeholder - implement actual functionality as needed
  };
  
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
            <div className="flex space-x-3">
              <Button 
                onClick={() => navigate("/accounts/add-payment")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <DollarSign className="mr-2 h-4 w-4" />
                Process Payment
              </Button>
              <Button 
                onClick={handleReconcileClick}
                className="bg-green-600 hover:bg-green-700"
              >
                <Calculator className="mr-2 h-4 w-4" />
                Reconcile
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="methods">Payment Methods</TabsTrigger>
              <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
              <TabsTrigger value="reports">Payment Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="methods" className="space-y-4">
              <PaymentMethodsTab />
            </TabsContent>
            
            <TabsContent value="transactions">
              <TransactionsTab />
            </TabsContent>
            
            <TabsContent value="reports">
              <ReportsTab />
            </TabsContent>
          </Tabs>
        </div>
      </Layout>
    </PrivateRoute>
  );
};

export default PaymentMethodsPage;

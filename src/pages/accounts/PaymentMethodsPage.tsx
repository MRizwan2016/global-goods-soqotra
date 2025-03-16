
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DollarSign } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import PrivateRoute from "@/components/auth/PrivateRoute";
import PaymentMethodsTab from "./components/PaymentMethodsTab";
import TransactionsTab from "./components/TransactionsTab";
import ReportsTab from "./components/ReportsTab";

const PaymentMethodsPage = () => {
  const [activeTab, setActiveTab] = useState("methods");
  const navigate = useNavigate();
  
  console.log("Rendering PaymentMethodsPage");
  
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

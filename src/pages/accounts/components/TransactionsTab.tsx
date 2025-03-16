
import { useNavigate } from "react-router-dom";
import { FileText, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TransactionsTab = () => {
  const navigate = useNavigate();
  
  return (
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
  );
};

export default TransactionsTab;

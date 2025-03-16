
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Invoice } from "@/hooks/use-invoice-search";
import { toast } from "@/hooks/use-toast";
import { CheckCircle2, DollarSign } from "lucide-react";

interface PaymentFormProps {
  invoice: Invoice | null;
  onPaymentComplete: () => void;
}

const PaymentForm = ({ invoice, onPaymentComplete }: PaymentFormProps) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [paymentDate, setPaymentDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [amount, setAmount] = useState(invoice?.net || "");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!invoice) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paymentMethod) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method to continue.",
        variant: "destructive",
      });
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid payment amount.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Payment processed:", {
        invoiceId: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        paymentMethod,
        referenceNumber,
        paymentDate,
        amount,
        notes
      });

      toast({
        title: "Payment Successful",
        description: `Payment of $${amount} has been processed for invoice #${invoice.invoiceNumber}`,
      });

      setSubmitting(false);
      onPaymentComplete();
    }, 1500);
  };

  return (
    <Card className="mt-4">
      <CardHeader className="bg-green-50 border-b border-green-100">
        <CardTitle className="text-lg text-green-800 flex items-center">
          <DollarSign className="h-5 w-5 mr-1" /> Process Payment
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method *</Label>
              <Select 
                value={paymentMethod} 
                onValueChange={setPaymentMethod}
              >
                <SelectTrigger id="paymentMethod">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="credit_card">Credit Card</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                  <SelectItem value="mobile_payment">Mobile Payment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="referenceNumber">Reference Number</Label>
              <Input
                id="referenceNumber"
                placeholder="Transaction or reference ID"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paymentDate">Payment Date *</Label>
              <Input
                id="paymentDate"
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Amount *</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  $
                </div>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  className="pl-7"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional payment information"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end space-x-2 border-t pt-4">
          <Button 
            type="submit" 
            className="bg-green-600 hover:bg-green-700"
            disabled={submitting}
          >
            {submitting ? (
              <>Processing...</>
            ) : (
              <>
                <CheckCircle2 className="mr-1 h-4 w-4" />
                Complete Payment
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PaymentForm;

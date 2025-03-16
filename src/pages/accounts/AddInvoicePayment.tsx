
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InvoiceSearch from "@/components/invoice/InvoiceSearch";
import InvoiceDetails from "@/components/invoice/InvoiceDetails";
import PaymentForm from "@/components/invoice/PaymentForm";
import { useNavigate } from "react-router-dom";
import { Invoice } from "@/hooks/use-invoice-search";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const AddInvoicePayment = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const navigate = useNavigate();

  const handleInvoiceSelect = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setPaymentComplete(false);
  };

  const handlePaymentComplete = () => {
    setPaymentComplete(true);
  };

  return (
    <Layout title="Process Invoice Payment">
      <div className="space-y-6">
        <div className="flex items-center">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/accounts/payment-methods")}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Payments
          </Button>
          <h1 className="text-2xl font-bold">Process Invoice Payment</h1>
        </div>
        
        {paymentComplete ? (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <div className="rounded-full bg-green-100 p-3 mb-4">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-green-800 mb-2">Payment Successfully Processed</h2>
                <p className="text-green-700 mb-6 max-w-md">
                  The payment for invoice #{selectedInvoice?.invoiceNumber} has been successfully recorded and processed.
                </p>
                <div className="flex gap-4">
                  <Button 
                    onClick={() => {
                      setSelectedInvoice(null);
                      setPaymentComplete(false);
                    }}
                  >
                    Process Another Payment
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate("/accounts/payment-methods")}
                  >
                    Return to Payment Dashboard
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Search Invoice</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-gray-600">
                  Enter the first few letters of the invoice number to search and select the invoice for payment.
                </p>
                <InvoiceSearch onInvoiceSelect={handleInvoiceSelect} />
              </CardContent>
            </Card>

            {selectedInvoice && (
              <>
                <InvoiceDetails invoice={selectedInvoice} />
                {!selectedInvoice.paid && (
                  <PaymentForm 
                    invoice={selectedInvoice}
                    onPaymentComplete={handlePaymentComplete}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default AddInvoicePayment;

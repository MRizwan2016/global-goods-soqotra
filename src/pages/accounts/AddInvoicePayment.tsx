
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ArrowLeft, Search, AlertCircle } from "lucide-react";
import { mockInvoiceData } from "@/data/mockData";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import PrivateRoute from "@/components/auth/PrivateRoute";

const AddInvoicePayment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [invoicePrefix, setInvoicePrefix] = useState("");
  const [matchingInvoices, setMatchingInvoices] = useState<any[]>([]);
  const [showInvoiceSelector, setShowInvoiceSelector] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);
  const [formState, setFormState] = useState({
    invoiceNumber: "",
    bookingForm: "",
    shipper: "",
    consignee: "",
    warehouse: "",
    shipmentType: "",
    remarks: "",
    grossAmount: 0,
    discount: 0,
    netAmount: 0,
    totalPaid: 0,
    balanceToPay: 0,
    amountPaid: 0,
    paymentCollectDate: format(new Date(), "yyyy-MM-dd"),
    receivableAccount: "CASH"
  });

  // Search for invoices when the prefix is typed (minimum 3 characters)
  useEffect(() => {
    if (invoicePrefix.length >= 3) {
      const filtered = mockInvoiceData.filter(inv => 
        inv.invoiceNumber.toLowerCase().startsWith(invoicePrefix.toLowerCase())
      );
      setMatchingInvoices(filtered);
      setShowInvoiceSelector(filtered.length > 0);
    } else {
      setMatchingInvoices([]);
      setShowInvoiceSelector(false);
    }
  }, [invoicePrefix]);

  // Calculate derived values
  useEffect(() => {
    if (formState) {
      const netAmount = formState.grossAmount - formState.discount;
      const balanceToPay = netAmount - formState.totalPaid;
      
      setFormState(prev => ({
        ...prev,
        netAmount,
        balanceToPay
      }));
    }
  }, [formState.grossAmount, formState.discount, formState.totalPaid]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle numeric fields
    if (["grossAmount", "discount", "totalPaid", "amountPaid"].includes(name)) {
      const numValue = parseFloat(value) || 0;
      setFormState(prev => ({ ...prev, [name]: numValue }));
    } else {
      setFormState(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleInvoiceSearch = () => {
    if (invoicePrefix.length < 3) {
      toast({
        title: "Search Error",
        description: "Please enter at least 3 characters of the invoice number",
        variant: "destructive"
      });
      return;
    }

    // Search is handled by the useEffect
  };

  const handleSelectInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
    setFormState({
      ...formState,
      invoiceNumber: invoice.invoiceNumber,
      bookingForm: invoice.bookNumber || "",
      shipper: invoice.shipper1 || "",
      consignee: invoice.consignee1 || "",
      warehouse: invoice.warehouse || "",
      shipmentType: invoice.freightType || "",
      grossAmount: invoice.gross || 0,
      discount: invoice.discount || 0,
      netAmount: (invoice.gross || 0) - (invoice.discount || 0),
      totalPaid: invoice.paid ? invoice.net : 0,
      balanceToPay: invoice.paid ? 0 : invoice.net
    });
    setShowInvoiceSelector(false);
  };

  const handleSave = () => {
    if (!formState.invoiceNumber) {
      toast({
        title: "Validation Error",
        description: "Please select an invoice first",
        variant: "destructive"
      });
      return;
    }

    if (formState.amountPaid <= 0) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid payment amount",
        variant: "destructive"
      });
      return;
    }

    // Here you would save the payment data to your backend
    toast({
      title: "Payment Recorded",
      description: `Payment of ${formState.amountPaid} for invoice ${formState.invoiceNumber} has been recorded.`,
    });

    // Redirect to payment list
    navigate("/accounts/payments");
  };

  return (
    <PrivateRoute requiredFile="paymentMethods">
      <Layout title="Add Invoice Payment">
        <div className="container mx-auto p-6">
          <div className="flex items-center mb-6">
            <Button 
              variant="outline" 
              onClick={() => navigate("/accounts/payments")}
              className="mr-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Payments
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Add Invoice Payment</h1>
              <p className="text-muted-foreground">
                Record a new payment against an invoice
              </p>
            </div>
          </div>

          <Card className="mb-8">
            <CardHeader className="bg-green-50 border-b border-green-100">
              <CardTitle className="text-xl text-green-800">Invoice Search</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex gap-4 items-start mb-6">
                <div className="w-full max-w-md">
                  <label className="text-sm font-medium mb-1 block">
                    Enter Invoice Number (first few characters):
                  </label>
                  <div className="flex">
                    <Input
                      value={invoicePrefix}
                      onChange={(e) => setInvoicePrefix(e.target.value)}
                      placeholder="Enter at least 3 characters..."
                      className="rounded-r-none"
                    />
                    <Button 
                      onClick={handleInvoiceSearch}
                      className="rounded-l-none"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Invoice selector dropdown */}
                  {showInvoiceSelector && (
                    <div className="mt-2 border rounded-md shadow-sm max-h-60 overflow-y-auto absolute z-10 bg-white w-full max-w-md">
                      <div className="p-2 bg-gray-50 border-b">
                        <h4 className="text-sm font-medium">Matching Invoices</h4>
                      </div>
                      {matchingInvoices.length > 0 ? (
                        <div>
                          {matchingInvoices.map((invoice) => (
                            <div
                              key={invoice.id}
                              className="p-2 hover:bg-blue-50 cursor-pointer border-b last:border-0"
                              onClick={() => handleSelectInvoice(invoice)}
                            >
                              <div className="flex justify-between">
                                <span className="font-medium">{invoice.invoiceNumber}</span>
                                <span className="text-sm text-gray-500">{invoice.customer}</span>
                              </div>
                              <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>Amount: {invoice.net}</span>
                                <span>Date: {invoice.date}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          No matching invoices found
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {selectedInvoice && (
                <div className="border p-4 rounded-md bg-blue-50 mb-6">
                  <h3 className="font-medium mb-2 text-blue-800">Selected Invoice Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Invoice Number:</span>
                      <p className="font-medium">{selectedInvoice.invoiceNumber}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Customer:</span>
                      <p className="font-medium">{selectedInvoice.customer}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Date:</span>
                      <p className="font-medium">{selectedInvoice.date}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Total Amount:</span>
                      <p className="font-medium">${selectedInvoice.net}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Payment Status:</span>
                      <p className="font-medium">
                        {selectedInvoice.paid ? 
                          <span className="text-green-600">Paid</span> : 
                          <span className="text-amber-600">Unpaid</span>
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">INVOICE NUMBER:</label>
                  <Input
                    name="invoiceNumber"
                    value={formState.invoiceNumber}
                    onChange={handleInputChange}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
                
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">BOOKING FORM:</label>
                  <Input
                    name="bookingForm"
                    value={formState.bookingForm}
                    onChange={handleInputChange}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
                
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">SHIPPER:</label>
                  <Input
                    name="shipper"
                    value={formState.shipper}
                    onChange={handleInputChange}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
                
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">CONSIGNEE:</label>
                  <Input
                    name="consignee"
                    value={formState.consignee}
                    onChange={handleInputChange}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
                
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">WAREHOUSE:</label>
                  <Input
                    name="warehouse"
                    value={formState.warehouse}
                    onChange={handleInputChange}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
                
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">SHIPMENT TYPE:</label>
                  <Input
                    name="shipmentType"
                    value={formState.shipmentType}
                    onChange={handleInputChange}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
                
                <div className="flex flex-col md:col-span-2">
                  <label className="text-sm font-medium mb-1">REMARKS:</label>
                  <Textarea
                    name="remarks"
                    value={formState.remarks}
                    onChange={handleInputChange}
                    className="min-h-[80px]"
                  />
                </div>
                
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">GROSS AMOUNT:</label>
                  <Input
                    name="grossAmount"
                    value={formState.grossAmount.toString()}
                    onChange={handleInputChange}
                    type="number"
                    className="bg-gray-50"
                    readOnly
                  />
                </div>
                
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">DISCOUNT:</label>
                  <Input
                    name="discount"
                    value={formState.discount.toString()}
                    onChange={handleInputChange}
                    type="number"
                    className="bg-gray-50"
                    readOnly
                  />
                </div>
                
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">NET AMOUNT:</label>
                  <Input
                    name="netAmount"
                    value={formState.netAmount.toString()}
                    onChange={handleInputChange}
                    type="number"
                    className="bg-gray-50 font-bold"
                    readOnly
                  />
                </div>
                
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">TOTAL PAID:</label>
                  <Input
                    name="totalPaid"
                    value={formState.totalPaid.toString()}
                    onChange={handleInputChange}
                    type="number"
                    className="bg-gray-50"
                    readOnly
                  />
                </div>
                
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">BALANCE TO PAY:</label>
                  <Input
                    name="balanceToPay"
                    value={formState.balanceToPay.toString()}
                    onChange={handleInputChange}
                    type="number"
                    className="bg-gray-50 font-bold"
                    readOnly
                  />
                </div>
                
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">AMOUNT PAID:</label>
                  <Input
                    name="amountPaid"
                    value={formState.amountPaid.toString()}
                    onChange={handleInputChange}
                    type="number"
                    className="border-blue-300 focus:border-blue-500"
                  />
                </div>
                
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">PAYMENT COLLECT DATE:</label>
                  <Input
                    name="paymentCollectDate"
                    value={formState.paymentCollectDate}
                    onChange={handleInputChange}
                    type="date"
                  />
                </div>
                
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">RECEIVABLE ACCOUNT:</label>
                  <Select
                    value={formState.receivableAccount}
                    onValueChange={(value) => handleSelectChange("receivableAccount", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CASH">CASH IN HAND</SelectItem>
                      <SelectItem value="BANK_TRANSFER">BANK TRANSFER</SelectItem>
                      <SelectItem value="CREDIT_CARD">CREDIT CARD</SelectItem>
                      <SelectItem value="CHEQUE">CHEQUE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => navigate("/accounts/payments")}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!formState.invoiceNumber || formState.amountPaid <= 0}
            >
              Save Payment
            </Button>
          </div>
        </div>
      </Layout>
    </PrivateRoute>
  );
};

export default AddInvoicePayment;

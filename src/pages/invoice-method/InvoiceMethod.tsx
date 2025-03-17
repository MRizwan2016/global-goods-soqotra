
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, FileText, Printer, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Form validation schema
const formSchema = z.object({
  invoiceNumber: z.string().min(1, { message: "Invoice number is required" }),
  amount: z.string().min(1, { message: "Payment amount is required" }),
  paymentMethod: z.string().min(1, { message: "Payment method is required" }),
  referenceNumber: z.string().optional(),
  receivedBy: z.string().min(1, { message: "Received by is required" }),
  paymentDate: z.string().min(1, { message: "Payment date is required" }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const InvoiceMethod = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invoiceNumber: "",
      amount: "",
      paymentMethod: "",
      referenceNumber: "",
      receivedBy: "",
      paymentDate: new Date().toISOString().split('T')[0],
      notes: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    
    try {
      console.log("Invoice payment recorded:", data);
      
      // In a real app, you would save this data to your backend
      // For now, we'll just show a success message
      
      toast({
        title: "Payment Recorded",
        description: `Payment of QAR ${data.amount} for invoice ${data.invoiceNumber} has been recorded.`,
      });
      
      form.reset();
    } catch (error) {
      console.error("Error recording payment:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to record payment. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Record Invoice Payment">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-800">
                  Record Invoice Payment
                </CardTitle>
                <CardDescription className="text-gray-600 mt-1">
                  Enter payment details for an existing invoice
                </CardDescription>
              </div>
              <div className="bg-white p-2 rounded-full shadow-sm">
                <CreditCard className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="invoiceNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Invoice Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter invoice number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Amount (QAR)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Method</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="cash">Cash</SelectItem>
                            <SelectItem value="bankTransfer">Bank Transfer</SelectItem>
                            <SelectItem value="check">Check</SelectItem>
                            <SelectItem value="card">Credit/Debit Card</SelectItem>
                            <SelectItem value="mobile">Mobile Payment</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="referenceNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reference Number (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="E.g., Check or transaction number" {...field} />
                        </FormControl>
                        <FormDescription>
                          For bank transfers, checks, etc.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="receivedBy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Received By</FormLabel>
                        <FormControl>
                          <Input placeholder="Name of receiver" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="paymentDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Any additional information" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <CardFooter className="flex justify-between pt-6 px-0">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate("/data-entry")}
                  >
                    Cancel
                  </Button>
                  <div className="flex gap-2">
                    <Button type="submit" disabled={loading}>
                      <Save className="mr-2 h-4 w-4" />
                      {loading ? "Saving..." : "Save Payment"}
                    </Button>
                    <Button type="button" variant="outline">
                      <Printer className="mr-2 h-4 w-4" />
                      Print Receipt
                    </Button>
                  </div>
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default InvoiceMethod;

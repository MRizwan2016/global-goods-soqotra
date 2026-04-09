import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { DollarSign, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { RegionalInvoiceService } from "@/services/RegionalInvoiceService";

const SudanOpsPaymentReceipt = () => {
  const [activeTab, setActiveTab] = useState("unpaid");
  const [invoices, setInvoices] = useState<any[]>([]);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  useEffect(() => {
    const load = async () => {
      try {
        const rows = await RegionalInvoiceService.getByCountry('Sudan');
        setInvoices(rows.map(r => ({
          id: r.id, invoiceNumber: r.invoice_number,
          customer: r.consignee_name || r.shipper_name || '',
          date: r.invoice_date || '', net: r.net || 0, paid: 0,
          status: r.payment_status === 'PAID' ? 'paid' : 'unpaid',
        })));
      } catch (e) { console.error("Error:", e); }
    };
    load();
  }, []);

  const unpaidInvoices = invoices.filter(inv => inv.status !== 'paid');
  const paidInvoices = invoices.filter(inv => inv.status === 'paid');
  const totalReceivable = unpaidInvoices.reduce((sum, inv) => sum + (inv.net || 0), 0);

  const handleAddPayment = (invoice: any) => { setSelectedInvoice(invoice); setPaymentAmount(""); setShowPaymentDialog(true); };
  const handleSubmitPayment = () => {
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) { toast.error("Enter a valid amount"); return; }
    toast.success(`Payment of SDG ${paymentAmount} recorded for ${selectedInvoice?.invoiceNumber}`);
    setShowPaymentDialog(false);
  };

  return (
    <Layout title="Payment Receipt - Sudan">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-[#1e2a3a]">Payment Receipt - Sudan</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Receivable</CardTitle>
              <AlertCircle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold text-amber-600">SDG {totalReceivable.toFixed(2)}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Collected</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold text-green-600">SDG 0.00</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold text-blue-600">{invoices.length}</div></CardContent>
          </Card>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList><TabsTrigger value="unpaid">Unpaid</TabsTrigger><TabsTrigger value="paid">Paid</TabsTrigger></TabsList>
          <TabsContent value="unpaid">
            <Card><CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow className="bg-red-700 hover:bg-red-700">
                    <TableHead className="text-white">#</TableHead><TableHead className="text-white">INVOICE</TableHead>
                    <TableHead className="text-white">CUSTOMER</TableHead><TableHead className="text-white">NET (SDG)</TableHead>
                    <TableHead className="text-white">ACTION</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {unpaidInvoices.map((inv, i) => (
                    <TableRow key={inv.id}>
                      <TableCell>{i + 1}</TableCell><TableCell>{inv.invoiceNumber}</TableCell>
                      <TableCell>{inv.customer}</TableCell><TableCell className="font-bold">{(inv.net || 0).toFixed(2)}</TableCell>
                      <TableCell><Button size="sm" className="bg-red-700 hover:bg-red-800" onClick={() => handleAddPayment(inv)}>Add Payment</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent></Card>
          </TabsContent>
          <TabsContent value="paid"><Card><CardContent className="pt-6"><p className="text-center text-gray-500 py-8">Paid invoices will appear here.</p></CardContent></Card></TabsContent>
        </Tabs>
        <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
          <DialogContent>
            <DialogHeader><DialogTitle>Record Payment</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <p>Invoice: <strong>{selectedInvoice?.invoiceNumber}</strong></p>
              <div className="space-y-2"><Label>Amount (SDG)</Label><Input type="number" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} placeholder="0.00" /></div>
              <div className="space-y-2"><Label>Payment Method</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="cash">Cash</SelectItem><SelectItem value="bank">Bank Transfer</SelectItem><SelectItem value="mobile">Mobile Money</SelectItem></SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>Cancel</Button>
              <Button className="bg-red-700 hover:bg-red-800" onClick={handleSubmitPayment}>Submit Payment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default SudanOpsPaymentReceipt;

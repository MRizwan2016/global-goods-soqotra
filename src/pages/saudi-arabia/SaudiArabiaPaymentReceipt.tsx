import React, { useState, useEffect, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { DollarSign, Search, Plus, Receipt, Printer, CheckCircle, AlertCircle, FileText } from "lucide-react";
import { toast } from "sonner";

const SaudiArabiaPaymentReceipt = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("unpaid");
  const [invoices, setInvoices] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('saudiArabiaInvoices') || '[]');
      setInvoices(stored);
      const storedPayments = JSON.parse(localStorage.getItem('saudiArabiaPayments') || '[]');
      setPayments(storedPayments);
    } catch (e) {
      console.error("Error loading data:", e);
    }
  }, []);

  const mockInvoices = invoices.length > 0 ? invoices : [
    { id: "SA-INV-001", invoiceNumber: "SA001001", customer: "ABDULLAH HASSAN M", date: "17/03/2026", net: 850.00, paid: 0, status: "unpaid" },
    { id: "SA-INV-002", invoiceNumber: "SA001002", customer: "MOHAMMED OMAR K", date: "16/03/2026", net: 425.00, paid: 425.00, status: "paid" },
    { id: "SA-INV-003", invoiceNumber: "SA001003", customer: "FATIMA AHMED S", date: "15/03/2026", net: 1200.00, paid: 600.00, status: "partial" },
  ];

  const unpaidInvoices = mockInvoices.filter(inv => (inv.paid || 0) < (inv.net || 0));
  const paidInvoices = mockInvoices.filter(inv => (inv.paid || 0) >= (inv.net || 0));

  const totalReceivable = unpaidInvoices.reduce((sum, inv) => sum + ((inv.net || 0) - (inv.paid || 0)), 0);
  const totalCollected = paidInvoices.reduce((sum, inv) => sum + (inv.paid || 0), 0);

  const handleAddPayment = (invoice: any) => {
    setSelectedInvoice(invoice);
    setPaymentAmount("");
    setPaymentMethod("cash");
    setShowPaymentDialog(true);
  };

  const handleSavePayment = () => {
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      toast.error("Please enter a valid payment amount");
      return;
    }
    const amount = parseFloat(paymentAmount);
    const balance = (selectedInvoice.net || 0) - (selectedInvoice.paid || 0);
    if (amount > balance) {
      toast.error("Payment amount exceeds balance");
      return;
    }

    const payment = {
      id: `SA-PAY-${Date.now()}`,
      invoiceId: selectedInvoice.id || selectedInvoice.invoiceNumber,
      invoiceNumber: selectedInvoice.invoiceNumber,
      customer: selectedInvoice.customer || selectedInvoice.consigneeName,
      amount,
      method: paymentMethod,
      date: new Date().toLocaleDateString('en-GB'),
      receiptNumber: `SA-REC-${String(payments.length + 1).padStart(6, '0')}`,
    };

    const updatedPayments = [...payments, payment];
    setPayments(updatedPayments);
    localStorage.setItem('saudiArabiaPayments', JSON.stringify(updatedPayments));

    // Update invoice paid amount
    const updatedInvoices = mockInvoices.map(inv => {
      if ((inv.id || inv.invoiceNumber) === (selectedInvoice.id || selectedInvoice.invoiceNumber)) {
        const newPaid = (inv.paid || 0) + amount;
        return { ...inv, paid: newPaid, status: newPaid >= inv.net ? "paid" : "partial" };
      }
      return inv;
    });
    if (invoices.length > 0) {
      localStorage.setItem('saudiArabiaInvoices', JSON.stringify(updatedInvoices));
      setInvoices(updatedInvoices);
    }

    toast.success(`Payment of ${amount.toFixed(2)} SAR recorded. Receipt: ${payment.receiptNumber}`);
    setShowPaymentDialog(false);
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
      paid: { variant: "secondary", label: "PAID" },
      partial: { variant: "default", label: "PART-PAID" },
      unpaid: { variant: "destructive", label: "UNPAID" },
    };
    const c = config[status] || config.unpaid;
    return <Badge variant={c.variant}>{c.label}</Badge>;
  };

  const filterInvoices = (list: any[]) => list.filter(item => {
    const name = item.customer || item.consigneeName || "";
    const inv = item.invoiceNumber || item.id || "";
    return name.toLowerCase().includes(searchTerm.toLowerCase()) || inv.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const renderInvoiceTable = (data: any[], showPayButton = false) => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#006c35] hover:bg-[#006c35]">
            <TableHead className="text-white font-medium">#</TableHead>
            <TableHead className="text-white font-medium">INVOICE #</TableHead>
            <TableHead className="text-white font-medium">DATE</TableHead>
            <TableHead className="text-white font-medium">CUSTOMER</TableHead>
            <TableHead className="text-white font-medium">NET (SAR)</TableHead>
            <TableHead className="text-white font-medium">PAID (SAR)</TableHead>
            <TableHead className="text-white font-medium">BALANCE (SAR)</TableHead>
            <TableHead className="text-white font-medium">STATUS</TableHead>
            {showPayButton && <TableHead className="text-white font-medium">ACTION</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow><TableCell colSpan={showPayButton ? 9 : 8} className="text-center py-8 text-muted-foreground">No records found</TableCell></TableRow>
          ) : (
            data.map((item, idx) => {
              const net = item.net || item.netAmount || 0;
              const paid = item.paid || item.paidAmount || 0;
              const balance = net - paid;
              const status = paid >= net ? "paid" : paid > 0 ? "partial" : "unpaid";
              return (
                <TableRow key={item.id || idx} className="hover:bg-gray-50">
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell className="font-medium text-[#006c35]">{item.invoiceNumber || item.id}</TableCell>
                  <TableCell>{item.date || item.invoiceDate || "-"}</TableCell>
                  <TableCell className="font-medium">{item.customer || item.consigneeName || "-"}</TableCell>
                  <TableCell>{net.toFixed(2)}</TableCell>
                  <TableCell className="text-green-600 font-medium">{paid.toFixed(2)}</TableCell>
                  <TableCell className={balance > 0 ? "text-red-600 font-medium" : "text-green-600 font-medium"}>{balance.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(status)}</TableCell>
                  {showPayButton && (
                    <TableCell>
                      <Button size="sm" className="bg-[#006c35] hover:bg-[#005a2d] gap-1" onClick={() => handleAddPayment({ ...item, net, paid })}>
                        <DollarSign className="h-3 w-3" /> Pay
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <Layout title="Saudi Arabia - Payment Receipt">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-gradient-to-r from-green-600 to-green-800 rounded flex items-center justify-center">
              <Receipt className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Payment Receipt - Saudi Arabia</h1>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Receivable</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{totalReceivable.toFixed(2)} SAR</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Collected</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{totalCollected.toFixed(2)} SAR</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Invoices</CardTitle>
              <FileText className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{mockInvoices.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by invoice number or customer name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="unpaid">Unpaid ({unpaidInvoices.length})</TabsTrigger>
            <TabsTrigger value="paid">Paid ({paidInvoices.length})</TabsTrigger>
            <TabsTrigger value="receipts">Receipts ({payments.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="unpaid">{renderInvoiceTable(filterInvoices(unpaidInvoices), true)}</TabsContent>
          <TabsContent value="paid">{renderInvoiceTable(filterInvoices(paidInvoices))}</TabsContent>
          <TabsContent value="receipts">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#006c35] hover:bg-[#006c35]">
                    <TableHead className="text-white">#</TableHead>
                    <TableHead className="text-white">RECEIPT #</TableHead>
                    <TableHead className="text-white">INVOICE #</TableHead>
                    <TableHead className="text-white">CUSTOMER</TableHead>
                    <TableHead className="text-white">AMOUNT (SAR)</TableHead>
                    <TableHead className="text-white">METHOD</TableHead>
                    <TableHead className="text-white">DATE</TableHead>
                    <TableHead className="text-white">PRINT</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.length === 0 ? (
                    <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No payment receipts</TableCell></TableRow>
                  ) : (
                    payments.map((p, i) => (
                      <TableRow key={p.id}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell className="font-medium text-[#006c35]">{p.receiptNumber}</TableCell>
                        <TableCell>{p.invoiceNumber}</TableCell>
                        <TableCell>{p.customer}</TableCell>
                        <TableCell className="font-medium">{p.amount.toFixed(2)}</TableCell>
                        <TableCell className="capitalize">{p.method}</TableCell>
                        <TableCell>{p.date}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="text-blue-600"><Printer className="h-4 w-4" /></Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record Payment - SAR</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Invoice #</Label>
              <Input value={selectedInvoice?.invoiceNumber || selectedInvoice?.id || ""} readOnly className="bg-muted" />
            </div>
            <div>
              <Label>Customer</Label>
              <Input value={selectedInvoice?.customer || selectedInvoice?.consigneeName || ""} readOnly className="bg-muted" />
            </div>
            <div>
              <Label>Balance Due (SAR)</Label>
              <Input value={((selectedInvoice?.net || 0) - (selectedInvoice?.paid || 0)).toFixed(2)} readOnly className="bg-muted" />
            </div>
            <div>
              <Label>Payment Amount (SAR)</Label>
              <Input type="number" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} placeholder="Enter amount" />
            </div>
            <div>
              <Label>Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                  <SelectItem value="cheque">Cheque</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>Cancel</Button>
            <Button className="bg-[#006c35] hover:bg-[#005a2d]" onClick={handleSavePayment}>Save Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default SaudiArabiaPaymentReceipt;

import React, { useState, useEffect } from "react";
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
import { useLanguage } from "@/contexts/LanguageContext";

const SaudiArabiaPaymentReceipt = () => {
  const { t, isRTL } = useLanguage();
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
    toast.success(`${t("payment.amountPaid")}: ${amount.toFixed(2)} ${t("unit.sar")}`);
    setShowPaymentDialog(false);
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
      paid: { variant: "secondary", label: t("status.paid") },
      partial: { variant: "default", label: t("status.partial") },
      unpaid: { variant: "destructive", label: t("status.unpaid") },
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
            <TableHead className="text-white font-medium">{t("table.number")}</TableHead>
            <TableHead className="text-white font-medium">{t("table.invoiceNumber")}</TableHead>
            <TableHead className="text-white font-medium">{t("table.date")}</TableHead>
            <TableHead className="text-white font-medium">{t("table.customer")}</TableHead>
            <TableHead className="text-white font-medium">{t("table.net")} ({t("unit.sar")})</TableHead>
            <TableHead className="text-white font-medium">{t("table.paid")} ({t("unit.sar")})</TableHead>
            <TableHead className="text-white font-medium">{t("table.balanceDue")} ({t("unit.sar")})</TableHead>
            <TableHead className="text-white font-medium">{t("table.status")}</TableHead>
            {showPayButton && <TableHead className="text-white font-medium">{t("table.action")}</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow><TableCell colSpan={showPayButton ? 9 : 8} className="text-center py-8 text-muted-foreground">{t("search.noResults")}</TableCell></TableRow>
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
                        <DollarSign className="h-3 w-3" /> {t("action.addPayment")}
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
    <Layout title={t("page.paymentReceiptSaudi")}>
      <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-gradient-to-r from-green-600 to-green-800 rounded flex items-center justify-center">
              <Receipt className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">{t("page.paymentReceiptSaudi")}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t("payment.totalReceivable")}</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{totalReceivable.toFixed(2)} {t("unit.sar")}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t("payment.totalCollected")}</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{totalCollected.toFixed(2)} {t("unit.sar")}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t("payment.totalInvoices")}</CardTitle>
              <FileText className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{mockInvoices.length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="relative">
          <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-3 h-4 w-4 text-muted-foreground`} />
          <Input placeholder={t("search.searchInvoices")} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={isRTL ? 'pr-10' : 'pl-10'} />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="unpaid">{t("status.unpaid")} ({unpaidInvoices.length})</TabsTrigger>
            <TabsTrigger value="paid">{t("status.paid")} ({paidInvoices.length})</TabsTrigger>
            <TabsTrigger value="receipts">{t("payment.receipt")} ({payments.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="unpaid">{renderInvoiceTable(filterInvoices(unpaidInvoices), true)}</TabsContent>
          <TabsContent value="paid">{renderInvoiceTable(filterInvoices(paidInvoices))}</TabsContent>
          <TabsContent value="receipts">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#006c35] hover:bg-[#006c35]">
                    <TableHead className="text-white">{t("table.number")}</TableHead>
                    <TableHead className="text-white">{t("table.receiptNumber")}</TableHead>
                    <TableHead className="text-white">{t("table.invoiceNumber")}</TableHead>
                    <TableHead className="text-white">{t("table.customer")}</TableHead>
                    <TableHead className="text-white">{t("table.amountPaid")} ({t("unit.sar")})</TableHead>
                    <TableHead className="text-white">{t("table.paymentMethod")}</TableHead>
                    <TableHead className="text-white">{t("table.date")}</TableHead>
                    <TableHead className="text-white">{t("action.print")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.length === 0 ? (
                    <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">{t("search.noResults")}</TableCell></TableRow>
                  ) : (
                    payments.map((p, i) => (
                      <TableRow key={p.id}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell className="font-medium text-[#006c35]">{p.receiptNumber}</TableCell>
                        <TableCell>{p.invoiceNumber}</TableCell>
                        <TableCell>{p.customer}</TableCell>
                        <TableCell className="font-medium">{p.amount.toFixed(2)}</TableCell>
                        <TableCell className="capitalize">{t(`paymentMethod.${p.method}`) !== `paymentMethod.${p.method}` ? t(`paymentMethod.${p.method}`) : p.method}</TableCell>
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

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("payment.recordPayment")} - {t("unit.sar")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>{t("table.invoiceNumber")}</Label>
              <Input value={selectedInvoice?.invoiceNumber || selectedInvoice?.id || ""} readOnly className="bg-muted" />
            </div>
            <div>
              <Label>{t("table.customer")}</Label>
              <Input value={selectedInvoice?.customer || selectedInvoice?.consigneeName || ""} readOnly className="bg-muted" />
            </div>
            <div>
              <Label>{t("payment.balanceDue")} ({t("unit.sar")})</Label>
              <Input value={((selectedInvoice?.net || 0) - (selectedInvoice?.paid || 0)).toFixed(2)} readOnly className="bg-muted" />
            </div>
            <div>
              <Label>{t("payment.amount")} ({t("unit.sar")})</Label>
              <Input type="number" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} placeholder="0.00" />
            </div>
            <div>
              <Label>{t("payment.method")}</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">{t("paymentMethod.cash")}</SelectItem>
                  <SelectItem value="bankTransfer">{t("paymentMethod.bankTransfer")}</SelectItem>
                  <SelectItem value="cheque">{t("paymentMethod.cheque")}</SelectItem>
                  <SelectItem value="card">{t("paymentMethod.card")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>{t("action.cancel")}</Button>
            <Button className="bg-[#006c35] hover:bg-[#005a2d]" onClick={handleSavePayment}>{t("action.save")} {t("payment.title")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default SaudiArabiaPaymentReceipt;

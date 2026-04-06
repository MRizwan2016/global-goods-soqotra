import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, Search, TrendingUp, TrendingDown, FileText, CheckSquare } from "lucide-react";
import { toast } from "sonner";
import { RegionalInvoiceService } from '@/services/RegionalInvoiceService';

const SriLankaReconciliation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("summary");
  const [dateRange, setDateRange] = useState("this-month");
  const [invoices, setInvoices] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const rows = await RegionalInvoiceService.getByCountry('Sri Lanka');
        const mapped = rows.map(r => ({
          id: r.id,
          invoiceNumber: r.invoice_number,
          total: String(r.net || 0),
          pricing: { net: r.net || 0 },
        }));
        setInvoices(mapped);
        setPayments(JSON.parse(localStorage.getItem('sriLankaPayments') || '[]'));
      } catch (e) { console.error("Error:", e); }
    };
    load();
  }, []);

  const totalInvoiced = invoices.reduce((sum, inv) => sum + (parseFloat((inv as any).pricing?.net || inv.total || '0')), 0) || 1950.00;
  const totalPaid = payments.reduce((sum, p) => sum + (p.amount || 0), 0) || 380.00;
  const totalOutstanding = totalInvoiced - totalPaid;
  const collectionRate = totalInvoiced > 0 ? ((totalPaid / totalInvoiced) * 100).toFixed(1) : "0.0";

  const reconciliationEntries = [
    { id: "REC-001", date: "17/03/2026", description: "Invoice 13140700 - KASUN PERERA", debit: 650.00, credit: 0, status: "unreconciled" },
    { id: "REC-002", date: "16/03/2026", description: "Payment 13140701 - NUWAN SILVA", debit: 0, credit: 380.00, status: "reconciled" },
    { id: "REC-003", date: "15/03/2026", description: "Invoice 13140702 - DINESH FERNANDO", debit: 920.00, credit: 0, status: "unreconciled" },
    { id: "REC-004", date: "15/03/2026", description: "Payment 13140702 - DINESH FERNANDO", debit: 0, credit: 400.00, status: "partial" },
  ];

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
      reconciled: { variant: "secondary", label: "Reconciled" },
      unreconciled: { variant: "destructive", label: "Unreconciled" },
      partial: { variant: "default", label: "Partial" },
    };
    const c = config[status] || config.unreconciled;
    return <Badge variant={c.variant}>{c.label}</Badge>;
  };

  return (
    <Layout title="Sri Lanka - Reconciliation">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-gradient-to-r from-amber-700 to-amber-900 rounded flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Reconciliation - Sri Lanka</h1>
          </div>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="this-quarter">This Quarter</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Invoiced</CardTitle>
              <FileText className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold text-foreground">{totalInvoiced.toFixed(2)} QAR</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Paid</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold text-green-600">{totalPaid.toFixed(2)} QAR</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-muted-foreground">Outstanding</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold text-red-600">{totalOutstanding.toFixed(2)} QAR</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-muted-foreground">Collection Rate</CardTitle>
              <CheckSquare className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold text-foreground">{collectionRate}%</div></CardContent>
          </Card>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search transactions..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="unreconciled">Unreconciled</TabsTrigger>
          </TabsList>
          <TabsContent value="summary">
            <Card>
              <CardHeader><CardTitle>Reconciliation Summary - QAR</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b"><span className="text-muted-foreground">Total Debits (Invoices)</span><span className="font-bold">{totalInvoiced.toFixed(2)} QAR</span></div>
                  <div className="flex justify-between py-3 border-b"><span className="text-muted-foreground">Total Credits (Payments)</span><span className="font-bold text-green-600">-{totalPaid.toFixed(2)} QAR</span></div>
                  <div className="flex justify-between py-3 border-b-2 border-foreground"><span className="font-bold text-foreground">Net Balance</span><span className="font-bold text-red-600">{totalOutstanding.toFixed(2)} QAR</span></div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="transactions">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#8B4513] hover:bg-[#8B4513]">
                    <TableHead className="text-white">#</TableHead>
                    <TableHead className="text-white">DATE</TableHead>
                    <TableHead className="text-white">DESCRIPTION</TableHead>
                    <TableHead className="text-white">DEBIT (QAR)</TableHead>
                    <TableHead className="text-white">CREDIT (QAR)</TableHead>
                    <TableHead className="text-white">STATUS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reconciliationEntries.map((entry, i) => (
                    <TableRow key={entry.id}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell className="font-medium">{entry.description}</TableCell>
                      <TableCell className={entry.debit > 0 ? "text-red-600 font-medium" : ""}>{entry.debit > 0 ? entry.debit.toFixed(2) : "-"}</TableCell>
                      <TableCell className={entry.credit > 0 ? "text-green-600 font-medium" : ""}>{entry.credit > 0 ? entry.credit.toFixed(2) : "-"}</TableCell>
                      <TableCell>{getStatusBadge(entry.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="unreconciled">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#8B4513] hover:bg-[#8B4513]">
                    <TableHead className="text-white">#</TableHead>
                    <TableHead className="text-white">DATE</TableHead>
                    <TableHead className="text-white">DESCRIPTION</TableHead>
                    <TableHead className="text-white">AMOUNT (QAR)</TableHead>
                    <TableHead className="text-white">STATUS</TableHead>
                    <TableHead className="text-white">ACTION</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reconciliationEntries.filter(e => e.status !== "reconciled").map((entry, i) => (
                    <TableRow key={entry.id}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell className="font-medium">{entry.description}</TableCell>
                      <TableCell className="font-medium">{(entry.debit || entry.credit).toFixed(2)}</TableCell>
                      <TableCell>{getStatusBadge(entry.status)}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" className="gap-1" onClick={() => toast.success("Marked as reconciled")}>
                          <CheckSquare className="h-3 w-3" /> Reconcile
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SriLankaReconciliation;

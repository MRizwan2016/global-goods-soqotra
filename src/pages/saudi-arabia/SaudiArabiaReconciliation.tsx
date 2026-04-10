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
import { BarChart3, Search, TrendingUp, TrendingDown, DollarSign, FileText, ArrowUpDown, CheckSquare } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const SaudiArabiaReconciliation = () => {
  const { t, isRTL } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("summary");
  const [dateRange, setDateRange] = useState("this-month");
  const [invoices, setInvoices] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    try {
      setInvoices(JSON.parse(localStorage.getItem('saudiArabiaInvoices') || '[]'));
      setPayments(JSON.parse(localStorage.getItem('saudiArabiaPayments') || '[]'));
    } catch (e) {
      console.error("Error:", e);
    }
  }, []);

  const totalInvoiced = invoices.reduce((sum, inv) => sum + (inv.net || inv.netAmount || 0), 0) || 2475.00;
  const totalPaid = payments.reduce((sum, p) => sum + (p.amount || 0), 0) || 425.00;
  const totalOutstanding = totalInvoiced - totalPaid;
  const collectionRate = totalInvoiced > 0 ? ((totalPaid / totalInvoiced) * 100).toFixed(1) : "0.0";

  const reconciliationEntries = [
    { id: "REC-001", date: "17/03/2026", description: "Invoice SA001001 - ABDULLAH HASSAN M", debit: 850.00, credit: 0, balance: 850.00, status: "unreconciled" },
    { id: "REC-002", date: "16/03/2026", description: "Payment SA001002 - MOHAMMED OMAR K", debit: 0, credit: 425.00, balance: -425.00, status: "reconciled" },
    { id: "REC-003", date: "15/03/2026", description: "Invoice SA001003 - FATIMA AHMED S", debit: 1200.00, credit: 0, balance: 1200.00, status: "unreconciled" },
    { id: "REC-004", date: "15/03/2026", description: "Payment SA001003 - FATIMA AHMED S", debit: 0, credit: 600.00, balance: -600.00, status: "partial" },
  ];

  const getStatusBadge = (status: string) => {
    const labels: Record<string, string> = {
      reconciled: isRTL ? "مطابق" : "Reconciled",
      unreconciled: isRTL ? "غير مطابق" : "Unreconciled",
      partial: t("status.partial"),
    };
    const config: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
      reconciled: { variant: "secondary", label: labels.reconciled },
      unreconciled: { variant: "destructive", label: labels.unreconciled },
      partial: { variant: "default", label: labels.partial },
    };
    const c = config[status] || config.unreconciled;
    return <Badge variant={c.variant}>{c.label}</Badge>;
  };

  return (
    <Layout title={t("page.reconciliationSaudi")}>
      <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-gradient-to-r from-green-600 to-green-800 rounded flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">{t("page.reconciliationSaudi")}</h1>
          </div>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="today">{isRTL ? "اليوم" : "Today"}</SelectItem>
              <SelectItem value="this-week">{isRTL ? "هذا الأسبوع" : "This Week"}</SelectItem>
              <SelectItem value="this-month">{isRTL ? "هذا الشهر" : "This Month"}</SelectItem>
              <SelectItem value="this-quarter">{isRTL ? "هذا الربع" : "This Quarter"}</SelectItem>
              <SelectItem value="this-year">{isRTL ? "هذه السنة" : "This Year"}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-muted-foreground">{t("reconciliation.totalInvoiced")}</CardTitle>
              <FileText className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold text-foreground">{totalInvoiced.toFixed(2)} {t("unit.sar")}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-muted-foreground">{t("reconciliation.totalCollected")}</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold text-green-600">{totalPaid.toFixed(2)} {t("unit.sar")}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-muted-foreground">{t("reconciliation.outstanding")}</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold text-red-600">{totalOutstanding.toFixed(2)} {t("unit.sar")}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-muted-foreground">{t("reconciliation.collectionRate")}</CardTitle>
              <CheckSquare className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold text-foreground">{collectionRate}%</div></CardContent>
          </Card>
        </div>

        <div className="relative">
          <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-3 h-4 w-4 text-muted-foreground`} />
          <Input placeholder={t("search.searchInvoices")} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={isRTL ? 'pr-10' : 'pl-10'} />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="summary">{isRTL ? "ملخص" : "Summary"}</TabsTrigger>
            <TabsTrigger value="transactions">{isRTL ? "المعاملات" : "Transactions"}</TabsTrigger>
            <TabsTrigger value="unreconciled">{isRTL ? "غير مطابق" : "Unreconciled"}</TabsTrigger>
          </TabsList>
          <TabsContent value="summary">
            <Card>
              <CardHeader><CardTitle>{t("reconciliation.invoiceSummary")} - {t("unit.sar")}</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-muted-foreground">{isRTL ? "إجمالي المدين (الفواتير)" : "Total Debits (Invoices)"}</span>
                    <span className="font-bold">{totalInvoiced.toFixed(2)} {t("unit.sar")}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-muted-foreground">{isRTL ? "إجمالي الدائن (المدفوعات)" : "Total Credits (Payments)"}</span>
                    <span className="font-bold text-green-600">-{totalPaid.toFixed(2)} {t("unit.sar")}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b-2 border-foreground">
                    <span className="font-bold text-foreground">{isRTL ? "الرصيد الصافي" : "Net Balance"}</span>
                    <span className="font-bold text-red-600">{totalOutstanding.toFixed(2)} {t("unit.sar")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="transactions">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#006c35] hover:bg-[#006c35]">
                    <TableHead className="text-white">{t("table.number")}</TableHead>
                    <TableHead className="text-white">{t("table.date")}</TableHead>
                    <TableHead className="text-white">{t("table.description")}</TableHead>
                    <TableHead className="text-white">{isRTL ? "مدين" : "DEBIT"} ({t("unit.sar")})</TableHead>
                    <TableHead className="text-white">{t("charges.credit")} ({t("unit.sar")})</TableHead>
                    <TableHead className="text-white">{t("table.status")}</TableHead>
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
                  <TableRow className="bg-[#006c35] hover:bg-[#006c35]">
                    <TableHead className="text-white">{t("table.number")}</TableHead>
                    <TableHead className="text-white">{t("table.date")}</TableHead>
                    <TableHead className="text-white">{t("table.description")}</TableHead>
                    <TableHead className="text-white">{t("table.amount")} ({t("unit.sar")})</TableHead>
                    <TableHead className="text-white">{t("table.status")}</TableHead>
                    <TableHead className="text-white">{t("table.action")}</TableHead>
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
                        <Button size="sm" variant="outline" className="gap-1" onClick={() => toast.success(isRTL ? "تم التطابق" : "Marked as reconciled")}>
                          <CheckSquare className="h-3 w-3" /> {isRTL ? "مطابقة" : "Reconcile"}
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

export default SaudiArabiaReconciliation;

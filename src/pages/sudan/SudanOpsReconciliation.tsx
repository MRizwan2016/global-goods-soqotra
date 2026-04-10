import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { RegionalInvoiceService } from "@/services/RegionalInvoiceService";
import { useLanguage } from "@/contexts/LanguageContext";

const SudanOpsReconciliation = () => {
  const { t, isRTL } = useLanguage();
  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const rows = await RegionalInvoiceService.getByCountry('Sudan');
        setInvoices(rows);
      } catch (e) { console.error("Error:", e); }
    };
    load();
  }, []);

  const totalInvoiced = invoices.reduce((sum, inv) => sum + (inv.net || 0), 0);
  const totalPaid = 0;
  const totalOutstanding = totalInvoiced - totalPaid;
  const collectionRate = totalInvoiced > 0 ? ((totalPaid / totalInvoiced) * 100).toFixed(1) : "0.0";

  return (
    <Layout title={t("page.reconciliationSudan")}>
      <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
        <h1 className="text-3xl font-bold text-[#1e2a3a]">{t("page.reconciliationSudan")}</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">{t("reconciliation.totalInvoiced")}</CardTitle><DollarSign className="h-4 w-4 text-red-600" /></CardHeader><CardContent><div className="text-2xl font-bold">{t("unit.sdg")} {totalInvoiced.toFixed(2)}</div></CardContent></Card>
          <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">{t("reconciliation.totalCollected")}</CardTitle><TrendingUp className="h-4 w-4 text-green-500" /></CardHeader><CardContent><div className="text-2xl font-bold text-green-600">{t("unit.sdg")} {totalPaid.toFixed(2)}</div></CardContent></Card>
          <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">{t("reconciliation.outstanding")}</CardTitle><TrendingDown className="h-4 w-4 text-red-500" /></CardHeader><CardContent><div className="text-2xl font-bold text-red-600">{t("unit.sdg")} {totalOutstanding.toFixed(2)}</div></CardContent></Card>
          <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">{t("reconciliation.collectionRate")}</CardTitle><BarChart3 className="h-4 w-4 text-blue-500" /></CardHeader><CardContent><div className="text-2xl font-bold text-blue-600">{collectionRate}%</div></CardContent></Card>
        </div>
        <Card>
          <CardHeader><CardTitle>{t("reconciliation.invoiceSummary")}</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-red-700 hover:bg-red-700">
                  <TableHead className="text-white">{t("table.number")}</TableHead>
                  <TableHead className="text-white">{t("table.invoice")}</TableHead>
                  <TableHead className="text-white">{t("table.customer")}</TableHead>
                  <TableHead className="text-white">{t("table.net")} ({t("unit.sdg")})</TableHead>
                  <TableHead className="text-white">{t("table.status")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((inv, i) => (
                  <TableRow key={inv.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{inv.invoice_number}</TableCell>
                    <TableCell>{inv.consignee_name || inv.shipper_name}</TableCell>
                    <TableCell>{(inv.net || 0).toFixed(2)}</TableCell>
                    <TableCell><Badge variant={inv.payment_status === 'PAID' ? 'secondary' : 'destructive'}>{inv.payment_status === 'PAID' ? t("status.paid") : t("status.unpaid")}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SudanOpsReconciliation;

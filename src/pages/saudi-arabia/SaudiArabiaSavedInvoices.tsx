import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Eye, Trash2, FileText, Save, Briefcase, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { RegionalInvoiceService } from '@/services/RegionalInvoiceService';
import { useLanguage } from "@/contexts/LanguageContext";

const SaudiArabiaSavedInvoices = () => {
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const rows = await RegionalInvoiceService.getByCountry('Saudi Arabia');
        const mapped = rows.map(r => ({
          id: r.id,
          invoiceNumber: r.invoice_number,
          jobNumber: r.job_number || '',
          bookNumber: r.book_number || '',
          pageNumber: r.page_number || '',
          invoiceDate: r.invoice_date || '',
          salesRep: r.sales_representative || '',
          driverName: r.driver_name || '',
          shipperName: r.shipper_name || '',
          consigneeName: r.consignee_name || '',
          customer: r.consignee_name || r.shipper_name || '',
          serviceType: r.service_type || '',
          whatsappNumber: r.whatsapp_number || '',
          totalPackages: r.total_packages || 0,
          totalWeight: r.total_weight || 0,
          totalVolume: r.total_volume || 0,
          net: r.net || 0,
          netAmount: r.net || 0,
          date: r.invoice_date || '',
        }));
        setInvoices(mapped);
      } catch (e) {
        console.error("Error loading invoices:", e);
      }
    };
    load();
  }, []);

  const filteredInvoices = invoices.filter(inv => {
    const name = (inv.consigneeName || inv.customer || "").toLowerCase();
    const num = (inv.invoiceNumber || inv.id || "").toLowerCase();
    return name.includes(searchTerm.toLowerCase()) || num.includes(searchTerm.toLowerCase());
  });

  const handleDelete = async (id: string) => {
    const ok = await RegionalInvoiceService.delete(id);
    if (ok) {
      setInvoices(prev => prev.filter(inv => (inv.id || inv.invoiceNumber) !== id));
      toast.success(t("invoice.title") + " " + t("action.delete"));
    } else {
      toast.error("Failed to delete invoice");
    }
  };

  const totalNet = invoices.reduce((sum, inv) => sum + (inv.net || inv.netAmount || 0), 0);

  return (
    <Layout title={t("page.savedInvoicesSaudi")}>
      <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-gradient-to-r from-green-600 to-green-800 rounded flex items-center justify-center">
              <Save className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">{t("page.savedInvoicesSaudi")}</h1>
          </div>
          <div className="flex gap-2">
            <Button className="gap-2 bg-[#006c35] hover:bg-[#005a2d]" onClick={() => navigate("/saudi-arabia/invoice/add")}>
              <Plus className="h-4 w-4" />
              {t("invoice.addNew")}
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => navigate("/saudi-arabia")}>
              <Briefcase className="h-4 w-4" />
              {t("collection.newJob")}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-muted-foreground">{t("payment.totalInvoices")}</CardTitle>
              <FileText className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{invoices.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-muted-foreground">{t("invoice.totalAmount")} ({t("unit.sar")})</CardTitle>
              <FileText className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{totalNet.toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-muted-foreground">{t("label.date")}</CardTitle>
              <FileText className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{invoices.filter(inv => {
                const d = new Date(inv.createdAt || inv.invoiceDate);
                const now = new Date();
                return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
              }).length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="relative">
          <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-3 h-4 w-4 text-muted-foreground`} />
          <Input placeholder={t("search.searchInvoices")} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={isRTL ? 'pr-10' : 'pl-10'} />
        </div>

        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#006c35] hover:bg-[#006c35]">
                <TableHead className="text-white">{t("table.number")}</TableHead>
                <TableHead className="text-white">{t("table.invoiceNumber")}</TableHead>
                <TableHead className="text-white">{t("table.jobNumber")}</TableHead>
                <TableHead className="text-white">{t("table.date")}</TableHead>
                <TableHead className="text-white">{t("table.bookNumber")}</TableHead>
                <TableHead className="text-white">{t("table.pageNumber")}</TableHead>
                <TableHead className="text-white">{t("schedule.salesRep")}</TableHead>
                <TableHead className="text-white">{t("schedule.driver")}</TableHead>
                <TableHead className="text-white">{t("shipper.title")}</TableHead>
                <TableHead className="text-white">{t("consignee.title")}</TableHead>
                <TableHead className="text-white">{t("shipping.serviceType")}</TableHead>
                <TableHead className="text-white">{t("label.total")} ({t("unit.sar")})</TableHead>
                <TableHead className="text-white">{t("misc.whatsappNumber")}</TableHead>
                <TableHead className="text-white">{t("table.actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={14} className="text-center py-8 text-muted-foreground">
                    {invoices.length === 0 ? t("search.noSavedInvoices") : t("search.noResults")}
                  </TableCell>
                </TableRow>
              ) : (
                filteredInvoices.map((inv, idx) => (
                  <TableRow key={inv.id || idx} className="hover:bg-gray-50">
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell className="font-medium text-[#006c35]">{inv.invoiceNumber || inv.id}</TableCell>
                    <TableCell>{inv.jobNumber || '-'}</TableCell>
                    <TableCell>{inv.invoiceDate ? new Date(inv.invoiceDate).toLocaleDateString('en-GB') : "-"}</TableCell>
                    <TableCell className="font-medium">{inv.bookNumber || '-'}</TableCell>
                    <TableCell className="font-medium">{inv.pageNumber || '-'}</TableCell>
                    <TableCell>{inv.salesRep || '-'}</TableCell>
                    <TableCell>{inv.driverName || '-'}</TableCell>
                    <TableCell>{inv.shipperName || '-'}</TableCell>
                    <TableCell className="font-medium">{inv.consigneeName || inv.customer || "-"}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">{inv.serviceType || 'SEA'}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{t("unit.sar")} {(inv.net || inv.netAmount || 0).toFixed(2)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="text-green-600 p-1" onClick={() => {
                        const phone = (inv.whatsappNumber || '').replace(/[^0-9+]/g, '');
                        const msg = `📄 ${t("invoice.title")} #${inv.invoiceNumber}\n${t("shipper.title")}: ${inv.shipperName || '-'}\n${t("consignee.title")}: ${inv.consigneeName || '-'}\n${t("label.total")}: ${t("unit.sar")} ${(inv.net || 0).toFixed(2)}\n\nSOQOTRA SOLUTIONS WLL`;
                        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
                      }}>
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="text-blue-600 p-1" onClick={() => navigate(`/saudi-arabia/invoice/edit/${inv.id || inv.invoiceNumber}`)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-green-600 p-1" onClick={() => navigate(`/saudi-arabia/invoice/print/${inv.id || inv.invoiceNumber}`)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 p-1" onClick={() => handleDelete(inv.id || inv.invoiceNumber)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default SaudiArabiaSavedInvoices;

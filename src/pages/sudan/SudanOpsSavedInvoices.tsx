import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, MessageCircle } from "lucide-react";
import WarehouseStoragePanel from "@/components/warehouse/WarehouseStoragePanel";
import { RegionalInvoiceService } from '@/services/RegionalInvoiceService';
import SudanManifestDialog from "./components/SudanManifestDialog";
import { useLanguage } from "@/contexts/LanguageContext";

const SudanOpsSavedInvoices = () => {
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const rows = await RegionalInvoiceService.getByCountry('Sudan');
        setInvoices(rows.map(r => ({
          id: r.id,
          invoiceNumber: r.invoice_number,
          invoiceDate: r.invoice_date || '',
          customer: r.consignee_name || r.shipper_name || '',
          whatsappNumber: r.whatsapp_number || r.consignee_mobile || '',
          totalPackages: r.total_packages || 0,
          totalWeight: r.total_weight || 0,
          totalVolume: r.total_volume || 0,
          net: r.net || 0,
        })));
      } catch (e) {
        console.error("Error loading invoices:", e);
      }
    };
    load();
  }, []);

  const filteredInvoices = invoices.filter(inv =>
    inv.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (inv.invoiceNumber || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleWhatsApp = (inv: any) => {
    const msg = `📄 *${t("invoice.title")} - SOQOTRA LOGISTICS*\n${t("table.invoiceNumber")}: ${inv.invoiceNumber}\n${t("table.customer")}: ${inv.customer}\n${t("table.packages")}: ${inv.totalPackages}\n${t("table.weight")}: ${inv.totalWeight} ${t("unit.kg")}\n${t("table.volume")}: ${inv.totalVolume} ${t("unit.cbm")}\n${t("label.total")}: ${t("unit.sdg")} ${inv.net.toFixed(2)}`;
    const phone = (inv.whatsappNumber || '').replace(/[^0-9+]/g, '');
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <Layout title={t("page.savedInvoicesSudan")}>
      <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#1e2a3a]">{t("page.savedInvoicesSudan")}</h1>
          <div className="flex gap-2">
            <SudanManifestDialog />
            <Button className="gap-2 bg-red-700 hover:bg-red-800" onClick={() => navigate("/sudan-ops/invoice/add")}>
              <Plus className="h-4 w-4" />{t("invoice.addNew")}
            </Button>
          </div>
        </div>
        <div className="relative">
          <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-3 h-4 w-4 text-gray-400`} />
          <Input placeholder={t("search.searchInvoices")} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={isRTL ? 'pr-10' : 'pl-10'} />
        </div>
        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow className="bg-red-700 hover:bg-red-700">
                  <TableHead className="text-white">{t("table.number")}</TableHead>
                  <TableHead className="text-white">{t("table.invoiceNumber")}</TableHead>
                  <TableHead className="text-white">{t("table.date")}</TableHead>
                  <TableHead className="text-white">{t("table.customer")}</TableHead>
                  <TableHead className="text-white">{t("table.packages")}</TableHead>
                  <TableHead className="text-white">{t("table.weight")}</TableHead>
                  <TableHead className="text-white">{t("table.net")} ({t("unit.sdg")})</TableHead>
                  <TableHead className="text-white">{t("table.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((inv, i) => (
                  <TableRow key={inv.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell className="font-medium">{inv.invoiceNumber}</TableCell>
                    <TableCell>{inv.invoiceDate}</TableCell>
                    <TableCell>{inv.customer}</TableCell>
                    <TableCell>{inv.totalPackages}</TableCell>
                    <TableCell>{inv.totalWeight} {t("unit.kg")}</TableCell>
                    <TableCell className="font-bold">{inv.net.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/sudan-ops/invoice/edit/${inv.id}`)}><Edit className="h-4 w-4 text-blue-600" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => handleWhatsApp(inv)}><MessageCircle className="h-4 w-4 text-green-600" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredInvoices.length === 0 && (
                  <TableRow><TableCell colSpan={8} className="text-center py-8 text-gray-500">{t("search.noSavedInvoices")}</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <WarehouseStoragePanel country="Sudan" />
      </div>
    </Layout>
  );
};

export default SudanOpsSavedInvoices;

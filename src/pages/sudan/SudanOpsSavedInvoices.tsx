import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, MessageCircle } from "lucide-react";
import { RegionalInvoiceService } from '@/services/RegionalInvoiceService';
import SudanManifestDialog from "./components/SudanManifestDialog";

const SudanOpsSavedInvoices = () => {
  const navigate = useNavigate();
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
    const msg = `📄 *INVOICE - SOQOTRA LOGISTICS*\nInvoice #: ${inv.invoiceNumber}\nCustomer: ${inv.customer}\nPackages: ${inv.totalPackages}\nWeight: ${inv.totalWeight} KG\nVolume: ${inv.totalVolume} CBM\nTotal: SDG ${inv.net.toFixed(2)}`;
    const phone = (inv.whatsappNumber || '').replace(/[^0-9+]/g, '');
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <Layout title="Saved Invoices - Sudan">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#1e2a3a]">Saved Invoices - Sudan</h1>
          <Button className="gap-2 bg-red-700 hover:bg-red-800" onClick={() => navigate("/sudan-ops/invoice/add")}>
            <Plus className="h-4 w-4" />Add New Invoice
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input placeholder="Search invoices..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
        </div>
        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow className="bg-red-700 hover:bg-red-700">
                  <TableHead className="text-white">#</TableHead>
                  <TableHead className="text-white">INVOICE #</TableHead>
                  <TableHead className="text-white">DATE</TableHead>
                  <TableHead className="text-white">CUSTOMER</TableHead>
                  <TableHead className="text-white">PKGS</TableHead>
                  <TableHead className="text-white">WEIGHT</TableHead>
                  <TableHead className="text-white">NET (SDG)</TableHead>
                  <TableHead className="text-white">ACTIONS</TableHead>
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
                    <TableCell>{inv.totalWeight} kg</TableCell>
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
                  <TableRow><TableCell colSpan={8} className="text-center py-8 text-gray-500">No saved invoices found.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SudanOpsSavedInvoices;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Eye, Trash2, FileText, Save, Briefcase } from "lucide-react";
import { toast } from "sonner";

const SaudiArabiaSavedInvoices = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('saudiArabiaInvoices') || '[]');
      setInvoices(stored);
    } catch (e) {
      console.error("Error loading invoices:", e);
    }
  }, []);

  const filteredInvoices = invoices.filter(inv => {
    const name = (inv.consigneeName || inv.customer || "").toLowerCase();
    const num = (inv.invoiceNumber || inv.id || "").toLowerCase();
    return name.includes(searchTerm.toLowerCase()) || num.includes(searchTerm.toLowerCase());
  });

  const handleDelete = (id: string) => {
    const updated = invoices.filter(inv => (inv.id || inv.invoiceNumber) !== id);
    setInvoices(updated);
    localStorage.setItem('saudiArabiaInvoices', JSON.stringify(updated));
    toast.success("Invoice deleted");
  };

  const totalNet = invoices.reduce((sum, inv) => sum + (inv.net || inv.netAmount || 0), 0);

  return (
    <Layout title="Saudi Arabia - Saved Invoices">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-gradient-to-r from-green-600 to-green-800 rounded flex items-center justify-center">
              <Save className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Saved Invoices - Saudi Arabia</h1>
          </div>
          <div className="flex gap-2">
            <Button className="gap-2 bg-[#006c35] hover:bg-[#005a2d]" onClick={() => navigate("/saudi-arabia/invoice/add")}>
              <Plus className="h-4 w-4" />
              New Invoice
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => navigate("/saudi-arabia")}>
              <Briefcase className="h-4 w-4" />
              New Job / Save
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Invoices</CardTitle>
              <FileText className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{invoices.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Value (SAR)</CardTitle>
              <FileText className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{totalNet.toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-muted-foreground">This Month</CardTitle>
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

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by invoice number or customer..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#006c35] hover:bg-[#006c35]">
                <TableHead className="text-white">#</TableHead>
                <TableHead className="text-white">INVOICE #</TableHead>
                <TableHead className="text-white">DATE</TableHead>
                <TableHead className="text-white">CUSTOMER</TableHead>
                <TableHead className="text-white">PACKAGES</TableHead>
                <TableHead className="text-white">WEIGHT (KG)</TableHead>
                <TableHead className="text-white">VOLUME (CBM)</TableHead>
                <TableHead className="text-white">NET (SAR)</TableHead>
                <TableHead className="text-white">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    {invoices.length === 0 ? "No saved invoices yet. Create your first invoice!" : "No matching invoices found"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredInvoices.map((inv, idx) => (
                  <TableRow key={inv.id || idx} className="hover:bg-gray-50">
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell className="font-medium text-[#006c35]">{inv.invoiceNumber || inv.id}</TableCell>
                    <TableCell>{inv.invoiceDate ? new Date(inv.invoiceDate).toLocaleDateString('en-GB') : "-"}</TableCell>
                    <TableCell className="font-medium">{inv.consigneeName || inv.customer || "-"}</TableCell>
                    <TableCell>{inv.totalPackages || 0}</TableCell>
                    <TableCell>{(inv.totalWeight || 0).toFixed(2)}</TableCell>
                    <TableCell>{(inv.totalVolume || 0).toFixed(2)}</TableCell>
                    <TableCell className="font-medium">{(inv.net || inv.netAmount || 0).toFixed(2)}</TableCell>
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

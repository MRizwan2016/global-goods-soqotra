import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Edit, Eye, Trash2, Ship, Package, FileText } from "lucide-react";
import { RegionalInvoiceService } from "@/services/RegionalInvoiceService";

const KenyaOpsDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("all");
  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const rows = await RegionalInvoiceService.getByCountry('Kenya');
        setInvoices(rows.map(r => ({
          id: r.id,
          invoiceNumber: r.invoice_number,
          invoiceDate: r.invoice_date || '',
          customer: r.consignee_name || r.shipper_name || 'N/A',
          sector: r.sector?.charAt(0) || "N",
          warehouse: r.port || "MOMBASA",
          doorToDoor: r.door_to_door || "No",
          volume: (r.total_volume || 0).toFixed(2),
          weight: (r.total_weight || 0).toFixed(2),
          packages: (r.total_packages || 0).toString(),
          gross: (r.gross || 0).toFixed(2),
          discount: (r.discount || 0).toFixed(2),
          net: (r.net || 0).toFixed(2),
          status: r.payment_status || 'UNPAID',
        })));
      } catch (e) {
        console.error("Error loading Kenya invoices:", e);
      }
    };
    load();
  }, []);

  const statsData = [
    { title: "Total Shipments", value: invoices.length.toString(), icon: Ship, color: "bg-green-600" },
    { title: "Active Packages", value: invoices.reduce((s, i) => s + parseInt(i.packages || '0'), 0).toString(), icon: Package, color: "bg-green-500" },
    { title: "Pending Invoices", value: invoices.filter(i => i.status === 'UNPAID').length.toString(), icon: FileText, color: "bg-yellow-500" },
    { title: "Completed", value: invoices.filter(i => i.status === 'PAID').length.toString(), icon: Eye, color: "bg-blue-500" }
  ];

  const filteredData = invoices.filter(item => {
    const matchesSearch = item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.invoiceNumber || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === "all" || item.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  const getStatusBadge = (status: string) => {
    if (status === 'PAID') return <Badge variant="secondary">Paid</Badge>;
    return <Badge variant="destructive">Unpaid</Badge>;
  };

  return (
    <Layout title="Dashboard - Kenya">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-gradient-to-r from-black via-red-600 to-green-700 rounded"></div>
            <h1 className="text-3xl font-bold text-[#1e2a3a]">Dashboard - Kenya</h1>
          </div>
          <Button className="gap-2 bg-green-700 hover:bg-green-800" onClick={() => navigate("/kenya-ops/invoice/add")}>
            <Plus className="h-4 w-4" />Add New
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.color}`}><stat.icon className="h-4 w-4 text-white" /></div>
              </CardHeader>
              <CardContent><div className="text-2xl font-bold text-[#1e2a3a]">{stat.value}</div></CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader><CardTitle>Shipment Management</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger><SelectValue placeholder="ALL SECTORS" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ALL SECTORS</SelectItem>
                  <SelectItem value="N">NAIROBI</SelectItem>
                  <SelectItem value="M">MOMBASA</SelectItem>
                  <SelectItem value="K">KISUMU</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative col-span-3">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-green-700 hover:bg-green-700">
                    <TableHead className="text-white font-medium">Num</TableHead>
                    <TableHead className="text-white font-medium">INV #</TableHead>
                    <TableHead className="text-white font-medium">DATE</TableHead>
                    <TableHead className="text-white font-medium">CUSTOMER</TableHead>
                    <TableHead className="text-white font-medium">VOL</TableHead>
                    <TableHead className="text-white font-medium">WGHT</TableHead>
                    <TableHead className="text-white font-medium">PKGS</TableHead>
                    <TableHead className="text-white font-medium">NET (KES)</TableHead>
                    <TableHead className="text-white font-medium">STATUS</TableHead>
                    <TableHead className="text-white font-medium">ACTIONS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell><Button variant="outline" size="sm" className="text-green-700">{item.invoiceNumber}</Button></TableCell>
                      <TableCell>{item.invoiceDate}</TableCell>
                      <TableCell className="font-medium">{item.customer}</TableCell>
                      <TableCell>{item.volume}</TableCell>
                      <TableCell>{item.weight}</TableCell>
                      <TableCell>{item.packages}</TableCell>
                      <TableCell className="font-medium">{item.net}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" className="text-green-600 p-1" onClick={() => navigate(`/kenya-ops/invoice/edit/${item.id}`)}><Edit className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="sm" className="text-red-600 p-1"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredData.length === 0 && (
                    <TableRow><TableCell colSpan={10} className="text-center py-8 text-gray-500">No invoices found. Click "Add New" to create one.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default KenyaOpsDashboard;

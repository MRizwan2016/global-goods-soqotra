
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Edit, Eye, Trash2, Ship, Package, FileText, RefreshCw } from "lucide-react";
import { updateInvoice010009 } from "@/scripts/updateInvoice010009";
import { toast } from "sonner";

const EritreaDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("all");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedWarehouse, setSelectedWarehouse] = useState("all");

  // Load saved invoices from localStorage
  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    const loadInvoices = () => {
      try {
        const storedInvoices = JSON.parse(localStorage.getItem('eritreaInvoices') || '[]');
        setInvoices(storedInvoices);
        console.log("📊 DASHBOARD - Loaded invoices:", storedInvoices);
      } catch (error) {
        console.error("Error loading invoices:", error);
      }
    };

    loadInvoices();
  }, []);

  // Real data will come from localStorage invoices only

  // Transform loaded invoices to display format - only show real data
  const shipmentData = invoices.map((invoice, index) => ({
    id: invoice.id || invoice.invoiceNumber,
    invoiceDate: new Date(invoice.invoiceDate || invoice.createdAt).toLocaleDateString('en-GB'),
    customer: `${invoice.consigneePrefix || ''} ${invoice.consigneeName || 'N/A'}`.trim(),
    sector: invoice.sector?.charAt(0) || "M",
    warehouse: invoice.port || "Massawa",
    d2d: invoice.doorToDoor || "No",
    nic: invoice.consigneeIdNumber || `ER${Date.now().toString().slice(-7)}`,
    volume: invoice.totalVolume?.toFixed(2) || "0.00",
    weight: invoice.totalWeight?.toFixed(2) || "0.00",
    packages: invoice.totalPackages?.toString() || "0",
    gross: invoice.gross?.toFixed(2) || "0.00",
    discount: invoice.discount?.toFixed(2) || "0.00",
    net: invoice.net?.toFixed(2) || "0.00",
    paid: invoice.paidAmount?.toFixed(2) || "0.00",
    status: invoice.cargoStatus || "pending"
  }));

  // Calculate real stats from actual invoice data
  const statsData = [
    { title: "Total Shipments", value: shipmentData.length.toString(), icon: Ship, color: "bg-blue-500" },
    { title: "Active Packages", value: shipmentData.reduce((total, item) => total + parseInt(item.packages || "0"), 0).toString(), icon: Package, color: "bg-green-500" },
    { title: "Pending Invoices", value: shipmentData.filter(item => item.status === "pending").length.toString(), icon: FileText, color: "bg-yellow-500" },
    { title: "Completed Today", value: shipmentData.filter(item => item.status === "completed" && item.invoiceDate === new Date().toLocaleDateString('en-GB')).length.toString(), icon: Eye, color: "bg-purple-500" }
  ];

  const filteredData = shipmentData.filter(item => {
    const matchesSearch = item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === "all" || item.sector === selectedSector;
    const matchesBranch = selectedBranch === "all" || item.warehouse === selectedBranch;
    
    return matchesSearch && matchesSector && matchesBranch;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: "destructive" as const, label: "PENDING", className: "text-red-600 bg-red-50" },
      loaded: { variant: "default" as const, label: "LOADED", className: "text-green-600 bg-green-50" },
      processing: { variant: "default" as const, label: "Processing", className: "text-blue-600 bg-blue-50" },
      completed: { variant: "secondary" as const, label: "Completed", className: "text-gray-600 bg-gray-50" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant} className={config.className}>{config.label}</Badge>;
  };

  return (
    <Layout title="Dashboard - Eritrea">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-gradient-to-r from-green-500 to-red-500 rounded"></div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard - Eritrea</h1>
          </div>
          <div className="flex gap-2">
            <Button 
              className="gap-2"
              onClick={() => navigate("/eritrea/invoice/add")}
            >
              <Plus className="h-4 w-4" />
              Add New
            </Button>
            <Button 
              variant="outline"
              className="gap-2"
              onClick={() => {
                try {
                  const success = updateInvoice010009();
                  if (success) {
                    // Refresh the invoices after update
                    const loadInvoices = () => {
                      try {
                        const storedInvoices = JSON.parse(localStorage.getItem('eritreaInvoices') || '[]');
                        setInvoices(storedInvoices);
                      } catch (error) {
                        console.error("Error loading invoices:", error);
                      }
                    };
                    loadInvoices();
                  }
                } catch (error) {
                  console.error("Update failed:", error);
                  toast.error("Failed to update invoice 010009");
                }
              }}
            >
              <RefreshCw className="h-4 w-4" />
              Fix Invoice 010009
            </Button>
          </div>
        </div>

        {/* Success Message */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800 font-medium">✓ View Invoice Record Listed.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Shipment Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger>
                  <SelectValue placeholder="MASSAWA · M" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ALL SECTORS</SelectItem>
                  <SelectItem value="M">MASSAWA · M</SelectItem>
                  <SelectItem value="A">ASSAB · A</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                <SelectTrigger>
                  <SelectValue placeholder="ALL BRANCHES" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ALL BRANCHES</SelectItem>
                  <SelectItem value="Massawa">Massawa</SelectItem>
                  <SelectItem value="Assab">Assab</SelectItem>
                  <SelectItem value="Asmara">Asmara</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedWarehouse} onValueChange={setSelectedWarehouse}>
                <SelectTrigger>
                  <SelectValue placeholder="ALL WAREHOUSES" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ALL WAREHOUSES</SelectItem>
                  <SelectItem value="Massawa">Massawa</SelectItem>
                  <SelectItem value="Assab">Assab</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Data Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-500 hover:bg-blue-500">
                    <TableHead className="text-white font-medium">Num</TableHead>
                    <TableHead className="text-white font-medium">MODIFY</TableHead>
                    <TableHead className="text-white font-medium">INV. DATE</TableHead>
                    <TableHead className="text-white font-medium">CUSTOMER</TableHead>
                    <TableHead className="text-white font-medium">S/A</TableHead>
                    <TableHead className="text-white font-medium">W/H</TableHead>
                    <TableHead className="text-white font-medium">D2D</TableHead>
                    <TableHead className="text-white font-medium">NIC</TableHead>
                    <TableHead className="text-white font-medium">VOL</TableHead>
                    <TableHead className="text-white font-medium">WGHT</TableHead>
                    <TableHead className="text-white font-medium">PKGS</TableHead>
                    <TableHead className="text-white font-medium">GROSS</TableHead>
                    <TableHead className="text-white font-medium">DISC</TableHead>
                    <TableHead className="text-white font-medium">NET</TableHead>
                    <TableHead className="text-white font-medium">PAID</TableHead>
                    <TableHead className="text-white font-medium">STATUS</TableHead>
                    <TableHead className="text-white font-medium">ACTIONS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((item, index) => (
                    <TableRow key={item.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                          onClick={() => navigate(`/eritrea/invoice/edit/${item.id}`)}
                        >
                          {item.id}
                        </Button>
                      </TableCell>
                      <TableCell>{item.invoiceDate}</TableCell>
                      <TableCell className="font-medium">{item.customer}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-gray-700 hover:text-blue-600 font-medium"
                          onClick={() => {
                            setSelectedSector(item.sector);
                            toast.success(`Filtered by sector: ${item.sector}`);
                          }}
                        >
                          {item.sector}
                        </Button>
                      </TableCell>
                      <TableCell>{item.warehouse}</TableCell>
                      <TableCell>{item.d2d}</TableCell>
                      <TableCell>{item.nic}</TableCell>
                      <TableCell>{item.volume}</TableCell>
                      <TableCell>{item.weight}</TableCell>
                      <TableCell>{item.packages}</TableCell>
                      <TableCell>{item.gross}</TableCell>
                      <TableCell>{item.discount}</TableCell>
                      <TableCell className="font-medium">{item.net}</TableCell>
                       <TableCell>
                         <Button 
                           variant="ghost" 
                           size="sm" 
                           className={`${parseFloat(item.paid) > 0 ? 'text-green-600 font-bold' : 'text-red-600 hover:text-red-700'} font-medium`}
                           onClick={() => {
                             // Store invoice for payment
                             sessionStorage.setItem('selectedInvoice', JSON.stringify({
                               id: item.id,
                               invoiceNumber: item.id,
                               customerName: item.customer,
                               net: parseFloat(item.net),
                               totalPaid: parseFloat(item.paid)
                             }));
                             navigate('/accounts/payment/add');
                           }}
                         >
                           {parseFloat(item.paid) > 0 ? `PAID ${item.paid}` : item.paid}
                         </Button>
                       </TableCell>
                       <TableCell>
                         <Button 
                           variant="ghost" 
                           size="sm"
                           onClick={() => {
                             // Toggle status between pending and loaded
                             const newStatus = item.status === "pending" ? "loaded" : "pending";
                             
                             // Update the invoice status in localStorage
                             const storedInvoices = JSON.parse(localStorage.getItem('eritreaInvoices') || '[]');
                             const updatedInvoices = storedInvoices.map((inv: any) => 
                               inv.id === item.id || inv.invoiceNumber === item.id 
                                 ? { ...inv, cargoStatus: newStatus }
                                 : inv
                             );
                             
                             localStorage.setItem('eritreaInvoices', JSON.stringify(updatedInvoices));
                             setInvoices(updatedInvoices);
                             
                             toast.success(`Status updated to: ${newStatus.toUpperCase()}`);
                           }}
                         >
                           {getStatusBadge(item.status)}
                         </Button>
                       </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-blue-600 p-1"
                            onClick={() => navigate(`/eritrea/invoice/edit/${item.id}`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-green-600 p-1"
                            onClick={() => navigate(`/eritrea/invoice/print/${item.id}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 p-1">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default EritreaDashboard;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Users, Package, TrendingUp, Eye, Edit, Printer, Trash2, Filter } from "lucide-react";
import { toast } from "sonner";

const SudanDashboard = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorFilter, setSectorFilter] = useState("all");
  const [branchFilter, setBranchFilter] = useState("all");
  const [warehouseFilter, setWarehouseFilter] = useState("all");

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = () => {
    const storedInvoices = localStorage.getItem('sudanInvoices');
    if (storedInvoices) {
      const parsedInvoices = JSON.parse(storedInvoices);
      setInvoices(parsedInvoices);
    }
  };

  // Sort invoices by invoice number
  const sortedInvoices = [...invoices].sort((a, b) => {
    const numA = parseInt(a.formData?.invoiceNumber || "0");
    const numB = parseInt(b.formData?.invoiceNumber || "0");
    return numB - numA;
  });

  // Transform data for display
  const shipmentData = sortedInvoices.map(invoice => {
    const totalWeight = invoice.packageDetails?.reduce((sum, pkg) => sum + parseFloat(pkg.weight || 0), 0).toFixed(2) || "0.00";
    const totalVolume = invoice.packageDetails?.reduce((sum, pkg) => sum + parseFloat(pkg.cubicMetre || 0), 0).toFixed(3) || "0.000";
    
    return {
      id: invoice.id,
      invoiceNumber: invoice.formData?.invoiceNumber || "N/A",
      shipper: invoice.shippingDetails?.shipper1 || "N/A",
      consignee: invoice.shippingDetails?.consignee1 || "N/A",
      sector: invoice.formData?.sector || "KASSALA",
      warehouse: "SUDAN",
      totalWeight,
      totalVolume,
      freight: parseFloat(invoice.costDetails?.freight || 0).toFixed(2),
      discount: parseFloat(invoice.costDetails?.discount || 0).toFixed(2),
      netAmount: parseFloat(invoice.costDetails?.net || 0).toFixed(2),
      paymentStatus: invoice.formData?.paymentStatus || "UNPAID",
      invoiceDate: invoice.formData?.invoiceDate || new Date().toISOString().split('T')[0],
      packages: invoice.packageDetails?.length || 0
    };
  });

  // Calculate statistics
  const statsData = {
    totalShipments: shipmentData.length,
    activePackages: shipmentData.reduce((sum, item) => sum + item.packages, 0),
    totalRevenue: shipmentData.reduce((sum, item) => sum + parseFloat(item.netAmount), 0).toFixed(2),
    pendingPayments: shipmentData.filter(item => item.paymentStatus === "UNPAID").length
  };

  // Filter data
  const filteredData = shipmentData.filter(item => {
    const matchesSearch = searchTerm === "" || 
      item.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.shipper.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.consignee.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSector = sectorFilter === "" || sectorFilter === "all" || item.sector === sectorFilter;
    const matchesWarehouse = warehouseFilter === "" || warehouseFilter === "all" || item.warehouse === warehouseFilter;
    
    return matchesSearch && matchesSector && matchesWarehouse;
  });

  const getStatusBadge = (status) => {
    const variant = status === "PAID" ? "default" : "destructive";
    return <Badge variant={variant}>{status}</Badge>;
  };

  const handleView = (id) => {
    navigate(`/sudan/invoice/print/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/sudan/invoice/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      const updatedInvoices = invoices.filter(inv => inv.id !== id);
      localStorage.setItem('sudanInvoices', JSON.stringify(updatedInvoices));
      setInvoices(updatedInvoices);
      toast.success("Invoice deleted successfully");
    }
  };

  const handleStatusUpdate = (id, newStatus) => {
    const updatedInvoices = invoices.map(inv => 
      inv.id === id 
        ? { ...inv, formData: { ...inv.formData, paymentStatus: newStatus } }
        : inv
    );
    localStorage.setItem('sudanInvoices', JSON.stringify(updatedInvoices));
    setInvoices(updatedInvoices);
    toast.success(`Payment status updated to ${newStatus}`);
  };

  return (
    <Layout title="Sudan Dashboard">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-10 bg-gradient-to-r from-red-500 via-white to-black rounded shadow-md"></div>
            <h1 className="text-3xl font-bold text-gray-900">Sudan Logistics Management</h1>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate('/sudan/invoice/add')} className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Invoice
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statsData.totalShipments}</div>
              <p className="text-xs text-muted-foreground">
                Active shipments in system
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Packages</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statsData.activePackages}</div>
              <p className="text-xs text-muted-foreground">
                Total packages being shipped
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statsData.totalRevenue} QAR</div>
              <p className="text-xs text-muted-foreground">
                Total revenue from shipments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statsData.pendingPayments}</div>
              <p className="text-xs text-muted-foreground">
                Invoices awaiting payment
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Shipments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Input
                  placeholder="Search by invoice, shipper, or consignee..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={sectorFilter} onValueChange={setSectorFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sectors</SelectItem>
                  <SelectItem value="KASSALA">KASSALA</SelectItem>
                  <SelectItem value="KHARTOUM">KHARTOUM</SelectItem>
                  <SelectItem value="PORT_SUDAN">PORT SUDAN</SelectItem>
                  <SelectItem value="GEDAREF">GEDAREF</SelectItem>
                </SelectContent>
              </Select>

              <Select value={warehouseFilter} onValueChange={setWarehouseFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Warehouse" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Warehouses</SelectItem>
                  <SelectItem value="SUDAN">SUDAN</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setSectorFilter("all");
                  setWarehouseFilter("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Shipments Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Shipments ({filteredData.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Shipper</TableHead>
                    <TableHead>Consignee</TableHead>
                    <TableHead>Sector</TableHead>
                    <TableHead>Packages</TableHead>
                    <TableHead>Weight (kg)</TableHead>
                    <TableHead>Volume (m³)</TableHead>
                    <TableHead>Freight (QAR)</TableHead>
                    <TableHead>Net Amount (QAR)</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((shipment) => (
                    <TableRow key={shipment.id}>
                      <TableCell className="font-medium">{shipment.invoiceNumber}</TableCell>
                      <TableCell>{shipment.invoiceDate}</TableCell>
                      <TableCell>{shipment.shipper}</TableCell>
                      <TableCell>{shipment.consignee}</TableCell>
                      <TableCell>{shipment.sector}</TableCell>
                      <TableCell>{shipment.packages}</TableCell>
                      <TableCell>{shipment.totalWeight}</TableCell>
                      <TableCell>{shipment.totalVolume}</TableCell>
                      <TableCell>{shipment.freight}</TableCell>
                      <TableCell className="font-semibold">{shipment.netAmount}</TableCell>
                      <TableCell>
                        <Select 
                          value={shipment.paymentStatus} 
                          onValueChange={(value) => handleStatusUpdate(shipment.id, value)}
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PAID">PAID</SelectItem>
                            <SelectItem value="UNPAID">UNPAID</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleView(shipment.id)}
                            title="View Invoice"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(shipment.id)}
                            title="Edit Invoice"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(shipment.id)}
                            title="Delete Invoice"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredData.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  {searchTerm || (sectorFilter !== "all") || (warehouseFilter !== "all")
                    ? "No shipments match your filter criteria" 
                    : "No shipments found. Create your first invoice to get started."}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SudanDashboard;
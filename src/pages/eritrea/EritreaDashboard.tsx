
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Edit, Eye, Trash2, Ship, Package, FileText } from "lucide-react";

const EritreaDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("all");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedWarehouse, setSelectedWarehouse] = useState("all");

  // Mock data for Eritrea operations
  const shipmentData = [
    {
      id: "ER001001",
      invoiceDate: "20/01/2025",
      customer: "AHMED HASSAN M",
      sector: "M",
      warehouse: "Massawa",
      d2d: "No",
      nic: "ER8840923",
      volume: "2.85",
      weight: "420.50",
      packages: "2",
      gross: "850.00",
      discount: "0.00",
      net: "850.00",
      paid: "0.00",
      status: "pending"
    },
    {
      id: "ER001002", 
      invoiceDate: "20/01/2025",
      customer: "SARA MOHAMED K",
      sector: "M",
      warehouse: "Assab",
      d2d: "Yes",
      nic: "ER7730154",
      volume: "1.20",
      weight: "180.75",
      packages: "1",
      gross: "425.00",
      discount: "0.00", 
      net: "425.00",
      paid: "425.00",
      status: "completed"
    },
    {
      id: "ER001003",
      invoiceDate: "21/01/2025", 
      customer: "IBRAHIM ALI S",
      sector: "M",
      warehouse: "Massawa",
      d2d: "No",
      nic: "ER9205123",
      volume: "3.50",
      weight: "525.20",
      packages: "3",
      gross: "1,200.00",
      discount: "50.00",
      net: "1,150.00", 
      paid: "0.00",
      status: "processing"
    }
  ];

  const statsData = [
    { title: "Total Shipments", value: "156", icon: Ship, color: "bg-blue-500" },
    { title: "Active Packages", value: "89", icon: Package, color: "bg-green-500" },
    { title: "Pending Invoices", value: "23", icon: FileText, color: "bg-yellow-500" },
    { title: "Completed Today", value: "12", icon: Eye, color: "bg-purple-500" }
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
      pending: { variant: "destructive" as const, label: "Pending" },
      processing: { variant: "default" as const, label: "Processing" },
      completed: { variant: "secondary" as const, label: "Completed" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
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
          <Button 
            className="gap-2"
            onClick={() => navigate("/eritrea/invoice/add")}
          >
            <Plus className="h-4 w-4" />
            Add New
          </Button>
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
                        <Button variant="outline" size="sm" className="text-blue-600">
                          {item.id}
                        </Button>
                      </TableCell>
                      <TableCell>{item.invoiceDate}</TableCell>
                      <TableCell className="font-medium">{item.customer}</TableCell>
                      <TableCell>{item.sector}</TableCell>
                      <TableCell>{item.warehouse}</TableCell>
                      <TableCell>{item.d2d}</TableCell>
                      <TableCell>{item.nic}</TableCell>
                      <TableCell>{item.volume}</TableCell>
                      <TableCell>{item.weight}</TableCell>
                      <TableCell>{item.packages}</TableCell>
                      <TableCell>{item.gross}</TableCell>
                      <TableCell>{item.discount}</TableCell>
                      <TableCell className="font-medium">{item.net}</TableCell>
                      <TableCell>{item.paid}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" className="text-blue-600 p-1">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-green-600 p-1">
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

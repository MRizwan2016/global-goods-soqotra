import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/ui/back-button";
import { Package, FileText, Ship, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock clearance data
const mockClearances = [
  {
    id: "CL-UG-001",
    invoiceNumber: "INV-2024-001",
    consignee: "Kampala Trading Co.",
    vessel: "MV Ocean Express",
    arrivalDate: "2024-01-15",
    clearanceStatus: "customs_pending",
    documentsStatus: "submitted",
    paymentStatus: "paid",
    estimatedRelease: "2024-01-18",
    cargoValue: "USD 45,000",
    origin: "Mombasa Port",
    destination: "Kampala Terminal"
  },
  {
    id: "CL-UG-002", 
    invoiceNumber: "INV-2024-002",
    consignee: "Uganda Import Ltd",
    vessel: "MV Cargo Star",
    arrivalDate: "2024-01-14",
    clearanceStatus: "released",
    documentsStatus: "approved",
    paymentStatus: "paid",
    estimatedRelease: "2024-01-17",
    cargoValue: "USD 28,500",
    origin: "Mombasa Port",
    destination: "Kampala Terminal"
  }
];

const UgandaClearanceTracking = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusBadge = (status: string) => {
    const styles = {
      customs_pending: "bg-yellow-100 text-yellow-800",
      released: "bg-green-100 text-green-800",
      on_hold: "bg-red-100 text-red-800",
      in_transit: "bg-blue-100 text-blue-800"
    };
    return styles[status as keyof typeof styles] || "bg-gray-100 text-gray-800";
  };

  const filteredClearances = mockClearances.filter((clearance) => {
    const searchMatch = 
      clearance.invoiceNumber.toLowerCase().includes(searchText.toLowerCase()) ||
      clearance.consignee.toLowerCase().includes(searchText.toLowerCase()) ||
      clearance.vessel.toLowerCase().includes(searchText.toLowerCase());
    
    const statusMatch = statusFilter === "all" || clearance.clearanceStatus === statusFilter;
    
    return searchMatch && statusMatch;
  });

  return (
    <Layout title="Uganda Clearance Tracking">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 bg-purple-50 border-b border-purple-100 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <BackButton to="/uganda" />
            <h3 className="text-lg font-medium text-purple-800">Uganda Customs Clearance Management</h3>
          </div>
          <div className="flex gap-2">
            <Link to="/uganda/vehicles">
              <Button variant="outline" className="flex items-center gap-1">
                <Truck size={14} />
                Transport Fleet
              </Button>
            </Link>
            <Link to="/uganda/clearance/new">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <FileText size={14} className="mr-1" />
                New Clearance
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Clearance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Ship className="h-5 w-5 text-yellow-600" />
                <span className="text-2xl font-bold">3</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Cleared Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-green-600" />
                <span className="text-2xl font-bold">8</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">In Transit to Kampala</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-blue-600" />
                <span className="text-2xl font-bold">12</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-600" />
                <span className="text-2xl font-bold">$2.1M</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="p-4 flex flex-col gap-4">
          {/* Filter Bar */}
          <div className="flex gap-4 items-center">
            <Input
              placeholder="Search by invoice, consignee, or vessel..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="max-w-sm"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="customs_pending">Customs Pending</SelectItem>
                <SelectItem value="released">Released</SelectItem>
                <SelectItem value="on_hold">On Hold</SelectItem>
                <SelectItem value="in_transit">In Transit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Clearance Table */}
          <div className="overflow-x-auto border border-gray-200 rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Clearance ID</TableHead>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Consignee</TableHead>
                  <TableHead>Vessel</TableHead>
                  <TableHead>Arrival Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Est. Release</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClearances.map((clearance) => (
                  <TableRow key={clearance.id}>
                    <TableCell className="font-medium">{clearance.id}</TableCell>
                    <TableCell>{clearance.invoiceNumber}</TableCell>
                    <TableCell>{clearance.consignee}</TableCell>
                    <TableCell>{clearance.vessel}</TableCell>
                    <TableCell>{clearance.arrivalDate}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(clearance.clearanceStatus)}>
                        {clearance.clearanceStatus.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>{clearance.estimatedRelease}</TableCell>
                    <TableCell>{clearance.cargoValue}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/uganda/clearance/${clearance.id}`)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UgandaClearanceTracking;
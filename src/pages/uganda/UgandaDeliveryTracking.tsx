import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/ui/back-button";
import { Package, MapPin, Clock, CheckCircle } from "lucide-react";
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

// Mock delivery data for Uganda operations
const mockDeliveries = [
  {
    id: "UG-DEL-001",
    clearanceId: "CL-UG-001",
    consignee: "Kampala Trading Co.",
    receiver: {
      name: "John Mukasa",
      phone: "+256-700-123456",
      address: "Plot 15, Industrial Area, Kampala"
    },
    status: "customs_released",
    estimatedDelivery: "2024-01-19",
    vehicle: "UAG 001A",
    driver: "Samuel Mukasa",
    cargoDescription: "Electronics & Machinery",
    origin: "Kampala Terminal",
    paymentStatus: "paid"
  },
  {
    id: "UG-DEL-002",
    clearanceId: "CL-UG-002", 
    consignee: "Uganda Import Ltd",
    receiver: {
      name: "Grace Nalwanga",
      phone: "+256-701-234567",
      address: "Ntinda Complex, Kampala"
    },
    status: "delivered",
    estimatedDelivery: "2024-01-17",
    vehicle: "UAG 002B",
    driver: "Grace Nambi",
    cargoDescription: "Textiles & Fabrics",
    origin: "Kampala Terminal",
    paymentStatus: "paid"
  },
  {
    id: "UG-DEL-003",
    clearanceId: "CL-UG-003",
    consignee: "Central Uganda Supplies",
    receiver: {
      name: "Peter Ssemakula",
      phone: "+256-702-345678", 
      address: "Mukono Industrial Park"
    },
    status: "in_transit",
    estimatedDelivery: "2024-01-20",
    vehicle: "UAG 003C",
    driver: "Joseph Kato",
    cargoDescription: "Construction Materials",
    origin: "Kampala Terminal",
    paymentStatus: "pending"
  }
];

const UgandaDeliveryTracking = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  const getStatusBadge = (status: string) => {
    const styles = {
      customs_released: "bg-blue-100 text-blue-800",
      in_transit: "bg-yellow-100 text-yellow-800",
      delivered: "bg-green-100 text-green-800",
      delayed: "bg-red-100 text-red-800"
    };
    return styles[status as keyof typeof styles] || "bg-gray-100 text-gray-800";
  };

  const filteredDeliveries = mockDeliveries.filter((delivery) => {
    const searchMatch = 
      delivery.id.toLowerCase().includes(searchText.toLowerCase()) ||
      delivery.consignee.toLowerCase().includes(searchText.toLowerCase()) ||
      delivery.receiver.name.toLowerCase().includes(searchText.toLowerCase()) ||
      delivery.vehicle.toLowerCase().includes(searchText.toLowerCase());
    
    const statusMatch = statusFilter === "all" || delivery.status === statusFilter;
    
    return searchMatch && statusMatch;
  });

  const totalPages = Math.ceil(filteredDeliveries.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredDeliveries.slice(indexOfFirstEntry, indexOfLastEntry);

  return (
    <Layout title="Uganda Delivery Tracking">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 bg-purple-50 border-b border-purple-100 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <BackButton to="/uganda" />
            <h3 className="text-lg font-medium text-purple-800">Uganda Delivery Management</h3>
          </div>
          <div className="flex gap-2">
            <Link to="/uganda/vehicles">
              <Button variant="outline" className="flex items-center gap-1">
                Manage Fleet
              </Button>
            </Link>
            <Link to="/uganda/delivery/new">
              <Button className="bg-purple-600 hover:bg-purple-700">
                New Delivery
              </Button>
            </Link>
          </div>
        </div>

        {/* Delivery Stats */}
        <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Ready for Delivery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-600" />
                <span className="text-2xl font-bold">8</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">In Transit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-yellow-600" />
                <span className="text-2xl font-bold">5</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Delivered Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-2xl font-bold">12</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-red-600" />
                <span className="text-2xl font-bold">3</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="p-4 flex flex-col gap-4">
          {/* Filter Bar */}
          <div className="flex gap-4 items-center">
            <Input
              placeholder="Search by delivery ID, consignee, or vehicle..."
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
                <SelectItem value="customs_released">Customs Released</SelectItem>
                <SelectItem value="in_transit">In Transit</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="delayed">Delayed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Delivery Table */}
          <div className="overflow-x-auto border border-gray-200 rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Delivery ID</TableHead>
                  <TableHead>Clearance ID</TableHead>
                  <TableHead>Consignee</TableHead>
                  <TableHead>Receiver</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Est. Delivery</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentEntries.map((delivery) => (
                  <TableRow key={delivery.id}>
                    <TableCell className="font-medium">{delivery.id}</TableCell>
                    <TableCell>{delivery.clearanceId}</TableCell>
                    <TableCell>{delivery.consignee}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{delivery.receiver.name}</div>
                        <div className="text-sm text-gray-500">{delivery.receiver.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(delivery.status)}>
                        {delivery.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>{delivery.vehicle}</TableCell>
                    <TableCell>{delivery.driver}</TableCell>
                    <TableCell>{delivery.estimatedDelivery}</TableCell>
                    <TableCell>
                      <Badge className={delivery.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {delivery.paymentStatus.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/uganda/delivery/${delivery.id}`)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, filteredDeliveries.length)} of {filteredDeliveries.length} entries
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UgandaDeliveryTracking;
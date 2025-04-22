
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { mockDeliveries } from "./data/mockDeliveryData";
import { 
  Table, 
  TableBody, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { 
  Search, 
  Truck, 
  MapPin, 
  Package, 
  User, 
  PhoneCall,
  Clock,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Filter,
  CarFront,
  UserRoundCog
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CargoDelivery } from "./types/deliveryTracking";
import { getStatusBadge, getPaymentBadge } from "./utils/statusUtils";
import BackButton from "@/components/ui/back-button";

const KenyaDeliveryTracking = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [warehouseFilter, setWarehouseFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const entriesPerPage = 10;

  const filteredDeliveries = mockDeliveries.filter((delivery) => {
    const searchMatch = 
      delivery.invoiceNumber.toLowerCase().includes(searchText.toLowerCase()) ||
      delivery.receiver.name.toLowerCase().includes(searchText.toLowerCase()) ||
      delivery.sender.name.toLowerCase().includes(searchText.toLowerCase()) ||
      delivery.receiver.contactNumber.includes(searchText) ||
      delivery.deliveryLocation.county.toLowerCase().includes(searchText.toLowerCase());

    const latestStatus = delivery.deliveryStatuses[delivery.deliveryStatuses.length - 1]?.status || "";
    const statusMatch = statusFilter === "all" || latestStatus === statusFilter;

    const warehouseMatch = 
      warehouseFilter === "all" || 
      delivery.destinationWarehouse.includes(warehouseFilter === "mombasa" ? "Mombasa" : "Nairobi");

    const paymentMatch = paymentFilter === "all" || delivery.paymentStatus === paymentFilter;

    return searchMatch && statusMatch && warehouseMatch && paymentMatch;
  });

  const totalPages = Math.ceil(filteredDeliveries.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredDeliveries.slice(indexOfFirstEntry, indexOfLastEntry);

  const handleViewDelivery = (deliveryId: string) => {
    navigate(`/kenya/delivery/${deliveryId}`);
  };

  return (
    <Layout title="Kenya Cargo Delivery Tracking">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 bg-green-50 border-b border-green-100 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <BackButton to="/kenya" />
            <h3 className="text-lg font-medium text-green-800">Kenya Cargo Collection & Delivery Management</h3>
          </div>
          <div className="flex gap-2">
            <Link to="/kenya/vehicles">
              <Button variant="outline" className="flex items-center gap-1">
                <CarFront size={14} />
                Manage Vehicles
              </Button>
            </Link>
            <Link to="/kenya/drivers">
              <Button variant="outline" className="flex items-center gap-1">
                <UserRoundCog size={14} />
                Manage Drivers
              </Button>
            </Link>
            <Link to="/kenya/delivery/new">
              <Button className="bg-green-600 hover:bg-green-700">Add New Delivery</Button>
            </Link>
          </div>
        </div>
        
        <div className="p-4 flex flex-col gap-4">
          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex items-center gap-1">
              <Filter size={14} className="text-gray-500" />
              <span className="text-sm text-gray-500">Filters:</span>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-8 w-40">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="in-transit">In Transit</SelectItem>
                <SelectItem value="at-warehouse">At Warehouse</SelectItem>
                <SelectItem value="out-for-delivery">Out for Delivery</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={warehouseFilter} onValueChange={setWarehouseFilter}>
              <SelectTrigger className="h-8 w-40">
                <SelectValue placeholder="Filter by Warehouse" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Warehouses</SelectItem>
                <SelectItem value="mombasa">Mombasa CFS</SelectItem>
                <SelectItem value="nairobi">Nairobi CFS</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger className="h-8 w-40">
                <SelectValue placeholder="Filter by Payment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="completed">Paid</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="pending">Unpaid</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="relative ml-auto">
              <Input
                type="text"
                placeholder="Search deliveries..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="pl-9 pr-3 py-1 h-8 border border-gray-300 rounded text-sm w-60"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
            </div>
          </div>
          
          <div className="overflow-x-auto border border-gray-200 rounded-md">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100 hover:bg-gray-100">
                  <TableHead className="w-24">Invoice #</TableHead>
                  <TableHead>Receiver</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="w-28">Collection Date</TableHead>
                  <TableHead className="w-28">Delivery Date</TableHead>
                  <TableHead className="w-28">Status</TableHead>
                  <TableHead className="w-24">Payment</TableHead>
                  <TableHead className="w-24">D2D</TableHead>
                  <TableHead className="w-24">Packages</TableHead>
                  <TableHead className="w-20 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentEntries.length > 0 ? (
                  currentEntries.map((delivery) => {
                    const latestStatus = delivery.deliveryStatuses[delivery.deliveryStatuses.length - 1];
                    return (
                      <TableRow key={delivery.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{delivery.invoiceNumber}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <User size={14} className="mr-1 text-gray-500" />
                            {delivery.receiver.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <PhoneCall size={14} className="mr-1 text-gray-500" />
                            {delivery.receiver.contactNumber}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MapPin size={14} className="mr-1 text-gray-500" />
                            {delivery.deliveryLocation.county}, {delivery.deliveryLocation.district}
                          </div>
                        </TableCell>
                        <TableCell>{delivery.collectionDate}</TableCell>
                        <TableCell>{delivery.estimatedDeliveryDate}</TableCell>
                        <TableCell>{getStatusBadge(latestStatus?.status || 'pending')}</TableCell>
                        <TableCell>{getPaymentBadge(delivery.paymentStatus)}</TableCell>
                        <TableCell>{delivery.isDoorToDoor ? "Yes" : "No"}</TableCell>
                        <TableCell className="text-center">{delivery.cargoDetails.packages}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-7 px-2 text-xs"
                            onClick={() => handleViewDelivery(delivery.id)}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={11} className="text-center py-6 text-gray-500">
                      No delivery records found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-between items-center mt-2">
            <div className="text-sm text-gray-500">
              Showing {filteredDeliveries.length > 0 ? indexOfFirstEntry + 1 : 0} to {Math.min(indexOfLastEntry, filteredDeliveries.length)} of {filteredDeliveries.length} entries
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline" 
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft size={16} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="h-8 w-8 p-0"
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default KenyaDeliveryTracking;

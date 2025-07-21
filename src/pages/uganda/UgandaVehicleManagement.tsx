import { useState } from "react";
import Layout from "@/components/layout/Layout";
import BackButton from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Truck, MapPin, Calendar, User } from "lucide-react";
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

// Mock vehicle data for Uganda operations
const mockVehicles = [
  {
    id: "UG-V-001",
    plateNumber: "UAG 001A",
    type: "Heavy Truck",
    capacity: "20 tons",
    driver: "Samuel Mukasa",
    status: "available",
    currentLocation: "Kampala Terminal",
    lastService: "2024-01-10",
    nextService: "2024-04-10",
    route: "Mombasa-Kampala"
  },
  {
    id: "UG-V-002",
    plateNumber: "UAG 002B",
    type: "Trailer",
    capacity: "30 tons",
    driver: "Grace Nambi",
    status: "in_transit",
    currentLocation: "Malaba Border",
    lastService: "2024-01-05",
    nextService: "2024-04-05",
    route: "Mombasa-Kampala"
  },
  {
    id: "UG-V-003",
    plateNumber: "UAG 003C",
    type: "Medium Truck",
    capacity: "15 tons",
    driver: "Joseph Kato",
    status: "maintenance",
    currentLocation: "Kampala Garage",
    lastService: "2024-01-15",
    nextService: "2024-02-15",
    route: "Local Delivery"
  }
];

const UgandaVehicleManagement = () => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const getStatusBadge = (status: string) => {
    const styles = {
      available: "bg-green-100 text-green-800",
      in_transit: "bg-blue-100 text-blue-800",
      maintenance: "bg-yellow-100 text-yellow-800",
      out_of_service: "bg-red-100 text-red-800"
    };
    return styles[status as keyof typeof styles] || "bg-gray-100 text-gray-800";
  };

  const filteredVehicles = mockVehicles.filter((vehicle) => {
    const searchMatch = 
      vehicle.plateNumber.toLowerCase().includes(searchText.toLowerCase()) ||
      vehicle.driver.toLowerCase().includes(searchText.toLowerCase()) ||
      vehicle.type.toLowerCase().includes(searchText.toLowerCase());
    
    const statusMatch = statusFilter === "all" || vehicle.status === statusFilter;
    const typeMatch = typeFilter === "all" || vehicle.type.toLowerCase().includes(typeFilter.toLowerCase());
    
    return searchMatch && statusMatch && typeMatch;
  });

  return (
    <Layout title="Uganda Vehicle Management">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 bg-purple-50 border-b border-purple-100 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <BackButton to="/uganda" />
            <h3 className="text-lg font-medium text-purple-800">Uganda Transport Fleet Management</h3>
          </div>
          <div className="flex gap-2">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus size={14} className="mr-1" />
              Add Vehicle
            </Button>
          </div>
        </div>

        {/* Fleet Stats */}
        <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Fleet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-purple-600" />
                <span className="text-2xl font-bold">25</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Available</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-600" />
                <span className="text-2xl font-bold">18</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">In Transit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                <span className="text-2xl font-bold">5</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Maintenance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-yellow-600" />
                <span className="text-2xl font-bold">2</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="p-4 flex flex-col gap-4">
          {/* Filter Bar */}
          <div className="flex gap-4 items-center flex-wrap">
            <Input
              placeholder="Search by plate number, driver, or type..."
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
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="in_transit">In Transit</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="out_of_service">Out of Service</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="heavy">Heavy Truck</SelectItem>
                <SelectItem value="trailer">Trailer</SelectItem>
                <SelectItem value="medium">Medium Truck</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Vehicle Table */}
          <div className="overflow-x-auto border border-gray-200 rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle ID</TableHead>
                  <TableHead>Plate Number</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Current Location</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Next Service</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="font-medium">{vehicle.id}</TableCell>
                    <TableCell>{vehicle.plateNumber}</TableCell>
                    <TableCell>{vehicle.type}</TableCell>
                    <TableCell>{vehicle.capacity}</TableCell>
                    <TableCell>{vehicle.driver}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(vehicle.status)}>
                        {vehicle.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>{vehicle.currentLocation}</TableCell>
                    <TableCell>{vehicle.route}</TableCell>
                    <TableCell>{vehicle.nextService}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Track
                        </Button>
                      </div>
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

export default UgandaVehicleManagement;
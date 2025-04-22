
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import BackButton from "@/components/ui/back-button";
import { mockVehicles } from "./data/mockDeliveryData";
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
  Plus, 
  Edit, 
  Trash2,
  Filter,
  CarFront
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Vehicle } from "./types/deliveryTracking";

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredVehicles = vehicles.filter((vehicle) => {
    const searchMatch = 
      vehicle.registrationNumber.toLowerCase().includes(searchText.toLowerCase()) ||
      vehicle.type.toLowerCase().includes(searchText.toLowerCase()) ||
      vehicle.capacity.toLowerCase().includes(searchText.toLowerCase());

    const statusMatch = statusFilter === "all" || vehicle.status === statusFilter;

    return searchMatch && statusMatch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-500">Available</Badge>;
      case "on-delivery":
        return <Badge className="bg-blue-500">On Delivery</Badge>;
      case "maintenance":
        return <Badge className="bg-yellow-500">Maintenance</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  return (
    <Layout title="Vehicle Management">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 bg-green-50 border-b border-green-100 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <BackButton to="/kenya/deliveries" />
            <h3 className="text-lg font-medium text-green-800">Kenya Fleet Management</h3>
          </div>
          <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-1">
            <Plus size={16} />
            Add New Vehicle
          </Button>
        </div>

        <div className="p-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-xl font-bold">Vehicle Inventory</h1>
              <p className="text-gray-500 text-sm">Manage your fleet of delivery vehicles</p>
            </div>

            <div className="flex flex-wrap gap-2 items-center mt-3 md:mt-0">
              <div className="flex items-center gap-2">
                <Button 
                  variant={statusFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("all")}
                  className="h-8 text-xs"
                >
                  All
                </Button>
                <Button 
                  variant={statusFilter === "available" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("available")}
                  className="h-8 text-xs bg-green-500 hover:bg-green-600 border-green-500"
                >
                  Available
                </Button>
                <Button 
                  variant={statusFilter === "on-delivery" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("on-delivery")}
                  className="h-8 text-xs bg-blue-500 hover:bg-blue-600 border-blue-500"
                >
                  On Delivery
                </Button>
                <Button 
                  variant={statusFilter === "maintenance" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("maintenance")}
                  className="h-8 text-xs bg-yellow-500 hover:bg-yellow-600 border-yellow-500"
                >
                  Maintenance
                </Button>
              </div>

              <div className="relative ml-auto">
                <Input
                  type="text"
                  placeholder="Search vehicles..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="pl-9 pr-3 py-1 h-8 border border-gray-300 rounded text-sm w-60"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100 hover:bg-gray-100">
                  <TableHead>Registration</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.length > 0 ? (
                  filteredVehicles.map((vehicle) => (
                    <TableRow key={vehicle.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <CarFront size={16} className="mr-2 text-gray-500" />
                          {vehicle.registrationNumber}
                        </div>
                      </TableCell>
                      <TableCell className="capitalize">{vehicle.type}</TableCell>
                      <TableCell>{vehicle.capacity}</TableCell>
                      <TableCell>{getStatusBadge(vehicle.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 w-8 p-0"
                          >
                            <Edit size={14} />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-600 border-red-200 hover:border-red-300"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                      No vehicles found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 text-sm text-gray-500">
            {filteredVehicles.length} {filteredVehicles.length === 1 ? 'vehicle' : 'vehicles'} found
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VehicleManagement;

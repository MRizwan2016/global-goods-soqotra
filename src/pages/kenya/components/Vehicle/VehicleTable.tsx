
import React from "react";
import { Table, TableBody, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { CarFront, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Vehicle } from "../../types/deliveryTracking";

interface VehicleTableProps {
  vehicles: Vehicle[];
}

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

const VehicleTable: React.FC<VehicleTableProps> = ({ vehicles }) => (
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
        {vehicles.length > 0 ? (
          vehicles.map((vehicle) => (
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
);

export default VehicleTable;

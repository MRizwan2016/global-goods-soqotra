
import React, { useState } from "react";
import { mockVehicles } from "../../data/mockVehicles";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, MapPin, CheckCircle, AlertCircle, WrenchIcon } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getCitiesForVehicle } from "../../data/cityVehicleMapping";

const VehicleList = () => {
  const [viewCities, setViewCities] = useState<string[]>([]);
  const [showCitiesModal, setShowCitiesModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  
  const handleViewCities = (vehicleNumber: string) => {
    const cities = getCitiesForVehicle(vehicleNumber);
    setViewCities(cities);
    setSelectedVehicle(vehicleNumber);
    setShowCitiesModal(true);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "RUN":
        return <Badge className="bg-green-500">Running</Badge>;
      case "MAINTENANCE":
        return <Badge className="bg-amber-500">Maintenance</Badge>;
      case "GARAGE":
        return <Badge className="bg-red-500">In Garage</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "RUN":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "MAINTENANCE":
        return <WrenchIcon className="h-4 w-4 text-amber-500" />;
      case "GARAGE":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Vehicle No.</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Make/Model</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Locations</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockVehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell className="font-medium">{vehicle.number}</TableCell>
                <TableCell>{vehicle.type}</TableCell>
                <TableCell>{vehicle.description.split(' ')[0] || 'N/A'}</TableCell>
                <TableCell>{vehicle.description}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(vehicle.status)}
                    {getStatusBadge(vehicle.status)}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleViewCities(vehicle.number)}
                    className="px-2"
                  >
                    <MapPin size={16} className="text-blue-600" />
                  </Button>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={showCitiesModal} onOpenChange={setShowCitiesModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Assigned Locations for Vehicle {selectedVehicle}</DialogTitle>
          </DialogHeader>
          <div className="max-h-[300px] overflow-y-auto">
            {viewCities.length > 0 ? (
              <div className="space-y-1 p-2">
                {viewCities.map((city) => (
                  <Badge key={city} className="bg-blue-100 text-blue-700 mr-2 mb-2">
                    {city}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No cities assigned to this vehicle.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VehicleList;

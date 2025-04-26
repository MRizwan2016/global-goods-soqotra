
import React, { useState, useEffect } from "react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Edit2, Trash2, AlertTriangle, Printer, FileText } from "lucide-react";
import { toast } from "sonner";
import { mockVehicles } from "../../data/mockVehicles";
import { QatarVehicle } from "../../types/vehicleTypes";
import VehicleForm from "./VehicleForm";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { getCitiesForVehicle } from "../../data/cityVehicleMapping";

const VehicleList: React.FC = () => {
  // Load vehicles from localStorage if available, otherwise use mockVehicles
  const loadVehicles = () => {
    try {
      const storedVehicles = localStorage.getItem('qatarVehicles');
      if (storedVehicles) {
        return JSON.parse(storedVehicles);
      }
    } catch (error) {
      console.error("Error loading vehicles from localStorage:", error);
    }
    // If localStorage fails or is empty, use mockVehicles
    return mockVehicles;
  };

  const [vehicles, setVehicles] = useState<QatarVehicle[]>(loadVehicles());
  const [searchTerm, setSearchTerm] = useState("");
  const [editingVehicle, setEditingVehicle] = useState<QatarVehicle | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<QatarVehicle | null>(null);

  useEffect(() => {
    // Update localStorage when vehicles change
    try {
      localStorage.setItem('qatarVehicles', JSON.stringify(vehicles));
    } catch (error) {
      console.error("Error saving vehicles to localStorage:", error);
    }
  }, [vehicles]);

  const handleDeleteClick = (vehicle: QatarVehicle) => {
    setVehicleToDelete(vehicle);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (vehicleToDelete) {
      setVehicles(vehicles.filter(v => v.id !== vehicleToDelete.id));
      toast.success("Vehicle deleted successfully");
      setIsDeleteDialogOpen(false);
      setVehicleToDelete(null);
    }
  };

  const filteredVehicles = vehicles.filter(vehicle => 
    vehicle.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="mb-4 flex flex-wrap gap-2 items-center justify-between">
        <div className="w-full md:w-64">
          <Input
            placeholder="Search vehicles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-blue-600">
            <Printer size={16} className="mr-1" /> Print List
          </Button>
          <Button variant="outline" size="sm" className="text-green-600">
            <FileText size={16} className="mr-1" /> Export to Excel
          </Button>
        </div>
      </div>

      <div className="border border-gray-200 rounded-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-50">
              <TableHead className="font-bold text-blue-800">NUMBER</TableHead>
              <TableHead className="font-bold text-blue-800">TYPE</TableHead>
              <TableHead className="font-bold text-blue-800">DESCRIPTION</TableHead>
              <TableHead className="font-bold text-blue-800">STATUS</TableHead>
              <TableHead className="font-bold text-blue-800">LICENSE EXPIRE</TableHead>
              <TableHead className="font-bold text-blue-800">INSURANCE EXPIRE</TableHead>
              <TableHead className="font-bold text-blue-800">MILEAGE</TableHead>
              <TableHead className="font-bold text-blue-800">ASSIGNED AREAS</TableHead>
              <TableHead className="font-bold text-blue-800 text-center">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle, index) => {
                const assignedCities = getCitiesForVehicle(vehicle.number);
                
                return (
                  <TableRow key={vehicle.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <TableCell className="font-medium">{vehicle.number}</TableCell>
                    <TableCell>{vehicle.type}</TableCell>
                    <TableCell>{vehicle.description}</TableCell>
                    <TableCell>
                      <Badge className={
                        vehicle.status === "RUN" ? "bg-green-100 text-green-800 hover:bg-green-200" :
                        vehicle.status === "MAINTENANCE" ? "bg-amber-100 text-amber-800 hover:bg-amber-200" :
                        "bg-red-100 text-red-800 hover:bg-red-200"
                      }>
                        {vehicle.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{vehicle.licenseExpiry}</TableCell>
                    <TableCell>{vehicle.insuranceExpiry}</TableCell>
                    <TableCell>{vehicle.mileage}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {assignedCities.length > 0 ? (
                          assignedCities.slice(0, 3).map((city, i) => (
                            <Badge key={i} variant="outline" className="bg-blue-50 text-xs">
                              {city}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-gray-500 text-xs">No areas assigned</span>
                        )}
                        {assignedCities.length > 3 && (
                          <Badge variant="outline" className="bg-gray-100 text-xs">
                            +{assignedCities.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-blue-600 h-8 w-8 p-0"
                          onClick={() => setEditingVehicle(vehicle)}
                        >
                          <Edit2 size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-600 h-8 w-8 p-0"
                          onClick={() => handleDeleteClick(vehicle)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-4 text-gray-500">
                  No vehicles found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        <div className="p-3 bg-white border-t border-gray-200 flex justify-between items-center">
          <div>Showing {filteredVehicles.length} of {vehicles.length} vehicles</div>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled className="text-sm">Previous</Button>
            <Button variant="default" size="sm" className="bg-blue-600 text-white text-sm">1</Button>
            <Button variant="outline" size="sm" disabled className="text-sm">Next</Button>
          </div>
        </div>
      </div>

      {/* Edit Vehicle Dialog */}
      {editingVehicle && (
        <Dialog open={!!editingVehicle} onOpenChange={(open) => !open && setEditingVehicle(null)}>
          <DialogContent className="max-w-3xl">
            <DialogTitle>Edit Vehicle</DialogTitle>
            <VehicleForm 
              vehicleToEdit={editingVehicle} 
              onCancel={() => setEditingVehicle(null)} 
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Confirm Deletion
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete vehicle #{vehicleToDelete?.number}? This action cannot be undone.
          </DialogDescription>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete Vehicle
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VehicleList;

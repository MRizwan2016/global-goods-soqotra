
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
import { Edit2, UserCheck, Save, X } from "lucide-react";
import { mockDrivers } from "../../data/mockVehicles";
import { mockVehicles } from "../../data/mockVehicles";
import { QatarDriver, QatarVehicle } from "../../types/vehicleTypes";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl 
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface DriverEditForm {
  licenseNumber: string;
  assignedVehicleId: string;
}

const DriverList: React.FC = () => {
  // Add employment status to each driver
  const [drivers, setDrivers] = useState<QatarDriver[]>(
    mockDrivers.map((driver, index) => ({
      ...driver,
      // Add employment status - first 5 drivers active, others on different statuses
      employmentStatus: index < 5 ? "ACTIVE" : (index === 5 ? "ON_LEAVE" : "INACTIVE"),
      // Add assigned vehicle for some drivers
      assignedVehicleId: index < 3 ? mockVehicles[index].id : undefined,
      assignedVehicleNumber: index < 3 ? mockVehicles[index].number : undefined,
    }))
  );

  const [vehicles] = useState<QatarVehicle[]>(mockVehicles);
  const [editDriverId, setEditDriverId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentDriver, setCurrentDriver] = useState<QatarDriver | null>(null);

  const form = useForm<DriverEditForm>();

  const handleEditClick = (driver: QatarDriver) => {
    setCurrentDriver(driver);
    form.reset({
      licenseNumber: driver.licenseNumber,
      assignedVehicleId: driver.assignedVehicleId || "",
    });
    setIsDialogOpen(true);
  };

  const handleSaveChanges = (data: DriverEditForm) => {
    if (!currentDriver) return;

    const selectedVehicle = vehicles.find(v => v.id === data.assignedVehicleId);
    
    setDrivers(prev => prev.map(driver => {
      if (driver.id === currentDriver.id) {
        return {
          ...driver,
          licenseNumber: data.licenseNumber,
          assignedVehicleId: data.assignedVehicleId || undefined,
          assignedVehicleNumber: selectedVehicle?.number || undefined,
        };
      }
      return driver;
    }));

    setIsDialogOpen(false);
    setCurrentDriver(null);
  };
  
  return (
    <>
      <div className="border border-gray-200 rounded-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-50">
              <TableHead className="font-bold text-blue-800 text-center">NUM</TableHead>
              <TableHead className="font-bold text-blue-800">CODE</TableHead>
              <TableHead className="font-bold text-blue-800">NAME</TableHead>
              <TableHead className="font-bold text-blue-800">MOBILE NUMBER</TableHead>
              <TableHead className="font-bold text-blue-800">LICENSE NUMBER</TableHead>
              <TableHead className="font-bold text-blue-800">LICENSE EXPIRY</TableHead>
              <TableHead className="font-bold text-blue-800">ASSIGNED VEHICLE</TableHead>
              <TableHead className="font-bold text-blue-800">STATUS</TableHead>
              <TableHead className="font-bold text-blue-800 text-center">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {drivers.map((driver, index) => (
              <TableRow key={driver.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell>{driver.code}</TableCell>
                <TableCell className="font-medium">{driver.name}</TableCell>
                <TableCell>{driver.mobileNumber}</TableCell>
                <TableCell>{driver.licenseNumber}</TableCell>
                <TableCell>{driver.licenseExpiry}</TableCell>
                <TableCell>
                  {driver.assignedVehicleNumber ? 
                    <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {driver.assignedVehicleNumber}
                    </span> : 
                    <span className="text-gray-400">Not Assigned</span>
                  }
                </TableCell>
                <TableCell>
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    driver.employmentStatus === "ACTIVE" 
                      ? "bg-green-100 text-green-800" 
                      : driver.employmentStatus === "ON_LEAVE"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {driver.employmentStatus === "ACTIVE" 
                      ? "Active" 
                      : driver.employmentStatus === "ON_LEAVE"
                      ? "On Leave"
                      : "Inactive"}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-blue-600"
                      onClick={() => handleEditClick(driver)}
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-green-600">
                      <UserCheck size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="p-3 bg-white border-t border-gray-200 flex justify-between items-center">
          <div>Showing 1 to {drivers.length} of {drivers.length} entries</div>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled className="text-sm">Previous</Button>
            <Button variant="default" size="sm" className="bg-blue-600 text-white text-sm">1</Button>
            <Button variant="outline" size="sm" disabled className="text-sm">Next</Button>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Driver Details</DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSaveChanges)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="licenseNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>License Number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="assignedVehicleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assigned Vehicle</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium"
                        {...field}
                      >
                        <option value="">-- No Vehicle Assigned --</option>
                        {vehicles.map(vehicle => (
                          <option key={vehicle.id} value={vehicle.id}>
                            {vehicle.number} - {vehicle.type} {vehicle.description}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DriverList;

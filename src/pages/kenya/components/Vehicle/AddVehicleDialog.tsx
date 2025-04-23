
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Vehicle } from "../../types/deliveryTracking";
import { toast } from "sonner";

interface AddVehicleDialogProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  newVehicle: {
    registrationNumber: string;
    type: "truck" | "van" | "motorcycle";
    capacity: string;
    status: "available" | "on-delivery" | "maintenance";
  };
  setNewVehicle: React.Dispatch<React.SetStateAction<{
    registrationNumber: string;
    type: "truck" | "van" | "motorcycle";
    capacity: string;
    status: "available" | "on-delivery" | "maintenance";
  }>>;
  onAddVehicle: () => void;
}

const AddVehicleDialog: React.FC<AddVehicleDialogProps> = ({
  open,
  setOpen,
  newVehicle,
  setNewVehicle,
  onAddVehicle
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewVehicle(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Vehicle</DialogTitle>
          <DialogDescription>
            Enter the details for the new vehicle to add to your fleet
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="registrationNumber" className="text-right font-medium">
              Registration Number*
            </label>
            <Input
              id="registrationNumber"
              name="registrationNumber"
              value={newVehicle.registrationNumber}
              onChange={handleInputChange}
              className="col-span-3"
              placeholder="KBC 123A"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="type" className="text-right font-medium">
              Vehicle Type*
            </label>
            <select
              id="type"
              name="type"
              value={newVehicle.type}
              onChange={handleInputChange}
              className="col-span-3 border border-input h-10 rounded-md px-3 py-2 text-sm"
            >
              <option value="truck">Truck</option>
              <option value="van">Van</option>
              <option value="motorcycle">Motorcycle</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="capacity" className="text-right font-medium">
              Capacity*
            </label>
            <Input
              id="capacity"
              name="capacity"
              value={newVehicle.capacity}
              onChange={handleInputChange}
              className="col-span-3"
              placeholder="2 tons"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="status" className="text-right font-medium">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={newVehicle.status}
              onChange={handleInputChange}
              className="col-span-3 border border-input h-10 rounded-md px-3 py-2 text-sm"
            >
              <option value="available">Available</option>
              <option value="maintenance">Maintenance</option>
              <option value="on-delivery">On Delivery</option>
            </select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={onAddVehicle}>Add Vehicle</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddVehicleDialog;

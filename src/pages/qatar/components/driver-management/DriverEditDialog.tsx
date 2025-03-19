
import React from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QatarDriver, QatarVehicle } from "../../types/vehicleTypes";
import { useForm } from "react-hook-form";

interface DriverEditForm {
  licenseNumber: string;
  assignedVehicleId: string;
}

interface DriverEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentDriver: QatarDriver | null;
  vehicles: QatarVehicle[];
  onSave: (data: DriverEditForm) => void;
}

const DriverEditDialog: React.FC<DriverEditDialogProps> = ({ 
  open, 
  onOpenChange, 
  currentDriver, 
  vehicles, 
  onSave 
}) => {
  const form = useForm<DriverEditForm>({
    defaultValues: {
      licenseNumber: currentDriver?.licenseNumber || "",
      assignedVehicleId: currentDriver?.assignedVehicleId || "",
    }
  });

  // Reset form when current driver changes
  React.useEffect(() => {
    if (currentDriver) {
      form.reset({
        licenseNumber: currentDriver.licenseNumber,
        assignedVehicleId: currentDriver.assignedVehicleId || "",
      });
    }
  }, [currentDriver, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Driver Details</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSave)} className="space-y-4 py-4">
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
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DriverEditDialog;

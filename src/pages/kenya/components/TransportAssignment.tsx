
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Truck } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Driver, Vehicle } from "../types/deliveryTracking";

interface TransportAssignmentProps {
  driverId: string;
  vehicleId: string;
  drivers: Driver[];
  vehicles: Vehicle[];
  onSelectChange: (name: string, value: string) => void;
}

const TransportAssignment = ({
  driverId,
  vehicleId,
  drivers,
  vehicles,
  onSelectChange
}: TransportAssignmentProps) => {
  // Ensure we have valid values
  const safeDriverId = driverId || "no-driver";
  const safeVehicleId = vehicleId || "no-vehicle";

  // For debugging
  console.log("TransportAssignment rendered with driverId:", driverId, "vehicleId:", vehicleId);
  console.log("Available drivers:", drivers);
  console.log("Available vehicles:", vehicles);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Truck size={18} />
          Transport Assignment (Optional)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="driverId">Assign Driver</Label>
          <Select
            value={safeDriverId} 
            onValueChange={(value) => onSelectChange("driverId", value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select driver" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no-driver">-- No Driver Selected --</SelectItem>
              {drivers
                .filter(driver => driver.status === 'available' && driver.id)
                .map(driver => (
                  <SelectItem key={driver.id} value={driver.id}>
                    {driver.name} - {driver.licenseNumber}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="vehicleId">Assign Vehicle</Label>
          <Select
            value={safeVehicleId} 
            onValueChange={(value) => onSelectChange("vehicleId", value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select vehicle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no-vehicle">-- No Vehicle Selected --</SelectItem>
              {vehicles
                .filter(vehicle => vehicle.status === 'available' && vehicle.id)
                .map(vehicle => (
                  <SelectItem key={vehicle.id} value={vehicle.id}>
                    {vehicle.registrationNumber} - {vehicle.type} ({vehicle.capacity})
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransportAssignment;

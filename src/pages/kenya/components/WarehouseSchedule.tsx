
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Truck } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WarehouseScheduleProps {
  originWarehouse: string;
  destinationWarehouse: string;
  collectionDate: string;
  estimatedDeliveryDate: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

const WarehouseSchedule = ({
  originWarehouse,
  destinationWarehouse,
  collectionDate,
  estimatedDeliveryDate,
  onInputChange,
  onSelectChange
}: WarehouseScheduleProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Truck size={18} />
          Warehouse & Schedule
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="originWarehouse">Origin Warehouse</Label>
          <Select
            value={originWarehouse} 
            onValueChange={(value) => onSelectChange("originWarehouse", value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select origin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Mombasa CFS">Mombasa CFS</SelectItem>
              <SelectItem value="Nairobi CFS">Nairobi CFS</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="destinationWarehouse">Destination Warehouse</Label>
          <Select
            value={destinationWarehouse} 
            onValueChange={(value) => onSelectChange("destinationWarehouse", value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select destination" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Mombasa CFS">Mombasa CFS</SelectItem>
              <SelectItem value="Nairobi CFS">Nairobi CFS</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="collectionDate">Collection Date</Label>
          <Input
            id="collectionDate"
            name="collectionDate"
            value={collectionDate}
            onChange={onInputChange}
            type="date"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="estimatedDeliveryDate">Estimated Delivery Date</Label>
          <Input
            id="estimatedDeliveryDate"
            name="estimatedDeliveryDate"
            value={estimatedDeliveryDate}
            onChange={onInputChange}
            type="date"
            className="mt-1"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default WarehouseSchedule;

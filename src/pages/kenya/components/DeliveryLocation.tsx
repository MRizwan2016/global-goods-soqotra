
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DeliveryLocationProps {
  county: string;
  district: string;
  isDoorToDoor: boolean;
  counties: string[];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  onCheckboxChange: (checked: boolean) => void;
}

const DeliveryLocation = ({
  county,
  district,
  isDoorToDoor,
  counties,
  onInputChange,
  onSelectChange,
  onCheckboxChange
}: DeliveryLocationProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <MapPin size={18} />
          Delivery Location
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="county">County</Label>
          <Select
            value={county}
            onValueChange={(value) => onSelectChange("county", value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select county" />
            </SelectTrigger>
            <SelectContent>
              {counties.map(county => (
                <SelectItem key={county} value={county}>{county}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="district">District/Area</Label>
          <Input
            id="district"
            name="district"
            value={district}
            onChange={onInputChange}
            placeholder="Enter district or area"
            className="mt-1"
          />
        </div>
        
        <div className="flex items-center gap-2 pt-2">
          <Checkbox 
            id="isDoorToDoor" 
            checked={isDoorToDoor}
            onCheckedChange={onCheckboxChange}
          />
          <Label htmlFor="isDoorToDoor" className="font-normal cursor-pointer">
            Door to Door Delivery
          </Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryLocation;

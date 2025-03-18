
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StaffFieldsProps {
  formState: any;
  handleSelectChange: (name: string, value: string) => void;
}

const DRIVERS = [
  "Mr. Abdullah",
  "Mr. Johny Venakdy",
  "Mr. Salih",
  "Mr. Kanaya",
  "Mr. Ashoka",
  "Mr. Idris Karar"
];

const SALES_REPS = [
  "Mr. Lahiru Chathuranga",
  "Mr. Ali Hussain",
  "Mr. Paolo Fernando",
  "Mr. Evans",
  "Mr. Paul Onchano",
  "Mr. Edwin Mbugua",
  "Mr. Zacharia",
  "Mr. Jun Jun Santos",
  "Mr. Raymond"
];

const StaffFields: React.FC<StaffFieldsProps> = ({
  formState,
  handleSelectChange,
}) => {
  return (
    <>
      <div className="space-y-2">
        <Label>Sales Rep</Label>
        <Select 
          onValueChange={(value) => handleSelectChange("salesRep", value)}
          value={formState.salesRep || ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Sales Rep" />
          </SelectTrigger>
          <SelectContent>
            {SALES_REPS.map((rep) => (
              <SelectItem key={rep} value={rep}>{rep}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Driver</Label>
        <Select 
          onValueChange={(value) => handleSelectChange("driver", value)}
          value={formState.driver || ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Driver" />
          </SelectTrigger>
          <SelectContent>
            {DRIVERS.map((driver) => (
              <SelectItem key={driver} value={driver}>{driver}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default StaffFields;

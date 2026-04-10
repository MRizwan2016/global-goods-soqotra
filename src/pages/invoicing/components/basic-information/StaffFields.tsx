
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSalesReps } from "@/hooks/useSalesReps";

interface StaffFieldsProps {
  formState: any;
  handleSelectChange: (name: string, value: string) => void;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const DRIVERS = [
  "Mr. Abdullah",
  "Mr. Johny Venakdy",
  "Mr. Salih",
  "Mr. Kanaya",
  "Mr. Ashoka",
  "Mr. Idris Karar"
];

const StaffFields: React.FC<StaffFieldsProps> = ({
  formState,
  handleSelectChange,
}) => {
  const { salesReps: dbSalesReps } = useSalesReps();

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
            {dbSalesReps.map((rep) => (
              <SelectItem key={rep.value} value={rep.value}>{rep.label}</SelectItem>
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


import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { warehouseOptions } from "../../constants/locationData";

interface LocationFieldsProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  countrySectorMap: { [key: string]: string };
}

const LocationFields: React.FC<LocationFieldsProps> = ({
  formState,
  handleInputChange,
  handleSelectChange,
  countrySectorMap,
}) => {
  // Get warehouse options based on selected country
  const countryWarehouses = formState.country ? warehouseOptions[formState.country] || [] : [];

  return (
    <>
      <div className="space-y-2">
        <Label>Sector</Label>
        <Input
          name="sector"
          value={formState.sector}
          onChange={handleInputChange}
          className="w-full"
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label>Branch</Label>
        <Input
          name="branch"
          value={formState.branch}
          onChange={handleInputChange}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label>Warehouse</Label>
        <Select 
          onValueChange={(value) => handleSelectChange("warehouse", value)}
          value={formState.warehouse || ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Warehouse" />
          </SelectTrigger>
          <SelectContent>
            {countryWarehouses.map((warehouse) => (
              <SelectItem key={warehouse} value={warehouse}>{warehouse}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>District</Label>
        <Input
          name="district"
          value={formState.district}
          onChange={handleInputChange}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label>Country</Label>
        <Select 
          onValueChange={(value) => handleSelectChange("country", value)}
          value={formState.country || ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(countrySectorMap).map((country) => (
              <SelectItem key={country} value={country}>{country}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default LocationFields;

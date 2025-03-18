
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AdditionalFieldsProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const AdditionalFields: React.FC<AdditionalFieldsProps> = ({
  formState,
  handleInputChange,
  handleSelectChange,
}) => {
  return (
    <>
      <div className="space-y-2">
        <Label>Door to Door</Label>
        <Select 
          onValueChange={(value) => handleSelectChange("doorToDoor", value)}
          value={formState.doorToDoor || ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="YES">YES</SelectItem>
            <SelectItem value="NO">NO</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Volume</Label>
        <Input
          name="volume"
          value={formState.volume}
          onChange={handleInputChange}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label>Cat Zone</Label>
        <Input
          name="catZone"
          value={formState.catZone}
          onChange={handleInputChange}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label>Weight</Label>
        <Input
          name="weight"
          value={formState.weight}
          onChange={handleInputChange}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label>Freight By</Label>
        <Select 
          onValueChange={(value) => handleSelectChange("freightBy", value)}
          value={formState.freightBy || ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="SEA">SEA</SelectItem>
            <SelectItem value="AIR">AIR</SelectItem>
            <SelectItem value="LAND">LAND</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Packages</Label>
        <Input
          name="packages"
          value={formState.packages}
          onChange={handleInputChange}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label>Remarks</Label>
        <Input
          name="remarks"
          value={formState.remarks}
          onChange={handleInputChange}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label>Invoice Date</Label>
        <Input
          name="invoiceDate"
          type="date"
          value={formState.invoiceDate}
          onChange={handleInputChange}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label>Gift Cargo</Label>
        <Select 
          onValueChange={(value) => handleSelectChange("giftCargo", value)}
          value={formState.giftCargo || ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="YES">YES</SelectItem>
            <SelectItem value="NO">NO</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Pre Paid</Label>
        <Select 
          onValueChange={(value) => handleSelectChange("prePaid", value)}
          value={formState.prePaid || ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="YES">YES</SelectItem>
            <SelectItem value="NO">NO</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default AdditionalFields;

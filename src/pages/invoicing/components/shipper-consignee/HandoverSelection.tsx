
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HandoverSelectionProps {
  formState: any;
  handleSelectChange: (name: string, value: string) => void;
  salesReps: string[];
  drivers: string[];
}

const HandoverSelection: React.FC<HandoverSelectionProps> = ({
  formState,
  handleSelectChange,
  salesReps,
  drivers,
}) => {
  return (
    <div>
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Handover By:</label>
        <Select 
          onValueChange={(value) => handleSelectChange("handOverBy", value)}
          value={formState.handOverBy || ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Sales Rep" />
          </SelectTrigger>
          <SelectContent>
            {[...salesReps, ...drivers].map((person) => (
              <SelectItem key={person} value={person}>{person}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default HandoverSelection;

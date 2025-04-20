
import React, { useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

interface BranchSelectorProps {
  sector: string;
  branch: string;
  onBranchChange: (value: string) => void;
}

const BranchSelector: React.FC<BranchSelectorProps> = ({ 
  sector, 
  branch, 
  onBranchChange 
}) => {
  const branchesBySector = useMemo(() => ({
    north: [
      { value: "al_khor", label: "Al Khor" },
      { value: "lusail", label: "Lusail" },
      { value: "umm_salal", label: "Umm Salal" },
    ],
    south: [
      { value: "wakra", label: "Wakra" },
      { value: "mesaieed", label: "Mesaieed" },
    ],
    east: [
      { value: "airport", label: "Airport Area" },
      { value: "doha_east", label: "Doha East" },
    ],
    west: [
      { value: "industrial", label: "Industrial Area" },
      { value: "rayyan", label: "Al Rayyan" },
      { value: "shahaniya", label: "Al Shahaniya" },
    ],
    central: [
      { value: "west_bay", label: "West Bay" },
      { value: "old_doha", label: "Old Doha" },
      { value: "katara", label: "Katara" },
    ],
  }), []);

  const availableBranches = useMemo(() => {
    if (!sector) return [];
    return branchesBySector[sector as keyof typeof branchesBySector] || [];
  }, [sector, branchesBySector]);

  return (
    <div className="form-group">
      <Label htmlFor="branch" className="font-medium">Branch</Label>
      <Select
        id="branch"
        value={branch}
        onValueChange={onBranchChange}
        placeholder="Select Branch"
        disabled={!sector}
        className="w-full mt-1"
      >
        <option value="">Select Branch</option>
        {availableBranches.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default BranchSelector;

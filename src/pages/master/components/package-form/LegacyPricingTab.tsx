
import React from "react";
import { Input } from "@/components/ui/input";

interface LegacyPricingTabProps {
  formState: {
    price: string;
    documentsFee: string;
  };
  total: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LegacyPricingTab: React.FC<LegacyPricingTabProps> = ({ formState, total, onChange }) => {
  return (
    <div className="p-4 border rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Price (Legacy):</label>
          <Input 
            name="price"
            value={formState.price}
            onChange={onChange}
            type="number"
            step="0.01"
            className="border border-gray-300"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Documents Fee (Legacy):</label>
          <Input 
            name="documentsFee"
            value={formState.documentsFee}
            onChange={onChange}
            type="number"
            step="0.01"
            className="border border-gray-300"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Total (Legacy):</label>
          <Input 
            value={total}
            readOnly
            className="border border-gray-300 bg-gray-50 font-bold"
          />
        </div>
      </div>
    </div>
  );
};

export default LegacyPricingTab;

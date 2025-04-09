
import React from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface VolumeBasedPricingTabProps {
  formState: {
    sriLankaPrice: string;
    sriLankaDocFee: string;
    philippinesPrice: string;
    philippinesDocFee: string;
  };
  totals: {
    sriLanka: string;
    philippines: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const VolumeBasedPricingTab: React.FC<VolumeBasedPricingTabProps> = ({ formState, totals, onChange }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4">
          <h4 className="font-medium text-blue-700 mb-2">
            Volume-Based Pricing (per cubic meter)
          </h4>
          <p className="text-sm text-gray-500">
            These countries use volume-based pricing for shipments.
          </p>
        </div>
        
        {/* Sri Lanka Pricing */}
        <div className="border-t border-gray-200 pt-4 mb-6">
          <h5 className="font-medium mb-2">Sri Lanka</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Price:</label>
              <Input 
                name="sriLankaPrice"
                value={formState.sriLankaPrice}
                onChange={onChange}
                type="number"
                step="0.01"
                className="border border-gray-300"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Documents Fee:</label>
              <Input 
                name="sriLankaDocFee"
                value={formState.sriLankaDocFee}
                onChange={onChange}
                type="number"
                step="0.01"
                className="border border-gray-300"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Total:</label>
              <Input 
                value={totals.sriLanka}
                readOnly
                className="border border-gray-300 bg-gray-50 font-bold"
              />
            </div>
          </div>
        </div>
        
        {/* Philippines Pricing */}
        <div className="border-t border-gray-200 pt-4">
          <h5 className="font-medium mb-2">Philippines</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Price:</label>
              <Input 
                name="philippinesPrice"
                value={formState.philippinesPrice}
                onChange={onChange}
                type="number"
                step="0.01"
                className="border border-gray-300"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Documents Fee:</label>
              <Input 
                name="philippinesDocFee"
                value={formState.philippinesDocFee}
                onChange={onChange}
                type="number"
                step="0.01"
                className="border border-gray-300"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Total:</label>
              <Input 
                value={totals.philippines}
                readOnly
                className="border border-gray-300 bg-gray-50 font-bold"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VolumeBasedPricingTab;
